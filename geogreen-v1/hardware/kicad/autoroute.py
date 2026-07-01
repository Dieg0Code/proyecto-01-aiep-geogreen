import os
import shutil
import subprocess
import sys
from pathlib import Path

import pcbnew


HERE = Path(__file__).resolve().parent
BOARD = HERE / "geogreen-v1.kicad_pcb"
EXPORTS = HERE / "exports"
DSN = EXPORTS / "geogreen-v1.dsn"
SES = EXPORTS / "geogreen-v1.ses"

JAVA = Path(
    os.environ.get(
        "GEOGREEN_JAVA",
        Path.home() / "scoop" / "apps" / "temurin-lts-jdk" / "current" / "bin" / "java.exe",
    )
)
FREEROUTING = Path(
    os.environ.get("GEOGREEN_FREEROUTING_JAR", Path.home() / ".local" / "lib" / "freerouting.jar")
)
MM = 1_000_000


def require(path: Path, label: str) -> None:
    if not path.exists():
        raise SystemExit(f"{label} not found: {path}")


def run(cmd: list[str], cwd: Path) -> None:
    print("+", " ".join(cmd))
    subprocess.run(cmd, cwd=cwd, check=True)


def mm(value: float) -> int:
    return int(round(value * MM))


def pt(x: float, y: float) -> pcbnew.VECTOR2I:
    return pcbnew.VECTOR2I(mm(x), mm(y))


def net(board: pcbnew.BOARD, name: str) -> pcbnew.NETINFO_ITEM:
    for item in board.GetNetInfo().NetsByName().values():
        if item.GetNetname() == name:
            return item
    raise RuntimeError(f"net not found: {name}")


def track(
    board: pcbnew.BOARD,
    x1: float,
    y1: float,
    x2: float,
    y2: float,
    net_name: str,
    width: float = 0.35,
) -> None:
    segment = pcbnew.PCB_TRACK(board)
    segment.SetStart(pt(x1, y1))
    segment.SetEnd(pt(x2, y2))
    segment.SetLayer(pcbnew.F_Cu)
    segment.SetWidth(mm(width))
    segment.SetNet(net(board, net_name))
    board.Add(segment)


def finish_known_gaps(board: pcbnew.BOARD) -> None:
    # Freerouting consistently leaves the short BOOT_IO0 test-pad link unrouted.
    # Close it deterministically with 45-degree/orthogonal copper.
    track(board, 55.2000, 40.9000, 55.2000, 44.5000, "BOOT_IO0", width=0.25)
    track(board, 55.2000, 44.5000, 57.7000, 47.0000, "BOOT_IO0", width=0.25)
    track(board, 57.7000, 47.0000, 70.0000, 47.0000, "BOOT_IO0", width=0.25)


def main() -> None:
    if len(sys.argv) == 2 and sys.argv[1] == "--finish":
        board = pcbnew.LoadBoard(str(BOARD))
        finish_known_gaps(board)
        pcbnew.SaveBoard(str(BOARD), board)
        return

    require(BOARD, "KiCad board")
    require(JAVA, "Java runtime")
    require(FREEROUTING, "Freerouting jar")
    EXPORTS.mkdir(exist_ok=True)

    if DSN.exists():
        DSN.unlink()
    if SES.exists():
        SES.unlink()

    board = pcbnew.LoadBoard(str(BOARD))
    # Export a no-zone DSN so Freerouting routes GND as real tracks. The saved
    # KiCad board keeps its GND zones as unfilled plane intent; they are not
    # filled in Python because KiCad 10 can crash with the ESP32 antenna hole.
    for zone in list(board.Zones()):
        board.Remove(zone)
    ok = pcbnew.ExportSpecctraDSN(board, str(DSN))
    if not ok or not DSN.exists():
        raise SystemExit("ExportSpecctraDSN failed")

    run(
        [
            str(JAVA),
            "-jar",
            str(FREEROUTING),
            "-de",
            DSN.name,
            "-do",
            SES.name,
            "-mp",
            "10",
        ],
        cwd=EXPORTS,
    )
    require(SES, "Freerouting SES output")

    backup = BOARD.with_suffix(".kicad_pcb.before-autoroute")
    shutil.copy2(BOARD, backup)

    board = pcbnew.LoadBoard(str(BOARD))
    ok = pcbnew.ImportSpecctraSES(board, str(SES))
    if not ok:
        raise SystemExit("ImportSpecctraSES failed")
    pcbnew.SaveBoard(str(BOARD), board)
    run([sys.executable, str(Path(__file__).resolve()), "--finish"], cwd=HERE)
    print(f"saved routed board: {BOARD}")
    print(f"backup before autoroute: {backup}")


if __name__ == "__main__":
    try:
        main()
    except subprocess.CalledProcessError as exc:
        sys.exit(exc.returncode)
