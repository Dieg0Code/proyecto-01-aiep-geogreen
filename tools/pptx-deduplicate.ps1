param(
    [Parameter(Mandatory = $true)]
    [string]$InputPath,

    [Parameter(Mandatory = $true)]
    [string]$OutputPath
)

$ErrorActionPreference = "Stop"

Add-Type -AssemblyName System.IO.Compression.FileSystem

$inputFile = (Resolve-Path -LiteralPath $InputPath).Path
$outputFile = [System.IO.Path]::GetFullPath($OutputPath)
$outputDirectory = Split-Path -Parent $outputFile

if (-not (Test-Path -LiteralPath $outputDirectory -PathType Container)) {
    throw "El directorio de salida no existe: $outputDirectory"
}

$workDirectory = Join-Path $outputDirectory ".pptx-deduplicate-$([guid]::NewGuid().ToString('N'))"
New-Item -ItemType Directory -Path $workDirectory | Out-Null

try {
    [System.IO.Compression.ZipFile]::ExtractToDirectory($inputFile, $workDirectory)

    $mediaDirectory = Join-Path $workDirectory "ppt/media"
    $mediaFiles = Get-ChildItem -LiteralPath $mediaDirectory -File | Sort-Object Name
    $hashGroups = $mediaFiles |
        ForEach-Object {
            [pscustomobject]@{
                File = $_
                Hash = (Get-FileHash -LiteralPath $_.FullName -Algorithm SHA256).Hash
            }
        } |
        Group-Object Hash |
        Where-Object Count -gt 1

    $duplicateMap = @{}
    foreach ($group in $hashGroups) {
        $canonical = $group.Group[0].File
        foreach ($duplicate in ($group.Group | Select-Object -Skip 1)) {
            $duplicateMap[$duplicate.File.Name] = $canonical.Name
        }
    }

    $relationshipFiles = Get-ChildItem -LiteralPath (Join-Path $workDirectory "ppt") -Recurse -File -Filter "*.rels"
    foreach ($relationshipFile in $relationshipFiles) {
        $xml = [System.IO.File]::ReadAllText($relationshipFile.FullName)
        $changed = $false

        foreach ($duplicateName in $duplicateMap.Keys) {
            if ($xml.Contains($duplicateName)) {
                $xml = $xml.Replace($duplicateName, $duplicateMap[$duplicateName])
                $changed = $true
            }
        }

        if ($changed) {
            [System.IO.File]::WriteAllText(
                $relationshipFile.FullName,
                $xml,
                [System.Text.UTF8Encoding]::new($false)
            )
        }
    }

    foreach ($duplicateName in $duplicateMap.Keys) {
        Remove-Item -LiteralPath (Join-Path $mediaDirectory $duplicateName) -Force
    }

    if (Test-Path -LiteralPath $outputFile) {
        Remove-Item -LiteralPath $outputFile -Force
    }

    [System.IO.Compression.ZipFile]::CreateFromDirectory(
        $workDirectory,
        $outputFile,
        [System.IO.Compression.CompressionLevel]::Optimal,
        $false
    )

    $before = (Get-Item -LiteralPath $inputFile).Length
    $after = (Get-Item -LiteralPath $outputFile).Length

    [pscustomobject]@{
        DuplicateMediaRemoved = $duplicateMap.Count
        BeforeMB = [math]::Round($before / 1MB, 2)
        AfterMB = [math]::Round($after / 1MB, 2)
        SavedMB = [math]::Round(($before - $after) / 1MB, 2)
        Output = $outputFile
    }
}
finally {
    if (Test-Path -LiteralPath $workDirectory) {
        Remove-Item -LiteralPath $workDirectory -Recurse -Force
    }
}
