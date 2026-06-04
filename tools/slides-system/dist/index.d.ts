interface Bounds {
    x: number;
    y: number;
    w: number;
    h: number;
}
interface DrawOptions extends Partial<Bounds> {
    [key: string]: unknown;
}
interface TextRunOptions {
    [key: string]: unknown;
}
interface TextRun {
    text: string;
    options?: TextRunOptions;
}
type SlideText = string | number | boolean | TextRun[];
interface SlideLike {
    background?: Record<string, unknown>;
    addShape(shapeType: unknown, options: DrawOptions): unknown;
    addText(text: SlideText, options?: DrawOptions): unknown;
    addImage?(options: Record<string, unknown>): unknown;
}
interface PptxLike {
    layout?: string;
    author?: string;
    company?: string;
    subject?: string;
    title?: string;
    lang?: string;
    theme?: Record<string, unknown>;
    _slides?: unknown[];
    [key: string]: unknown;
}
type ShapeCatalog = Record<string, unknown>;

interface ThemeTokens {
    paper: string;
    white: string;
    navy: string;
    red: string;
    ink: string;
    slate: string;
    guide: string;
    border: string;
    softBlue: string;
    softNeutral: string;
    paleRed: string;
    sand: string;
    gold: string;
    warm: string;
    mist: string;
    titleFill: string;
    editorBg: string;
    terminalBg: string;
    terminalPrompt: string;
    terminalOutput: string;
    terminalMuted: string;
    success: string;
    successSoft: string;
    warning: string;
    warningSoft: string;
    shadow: string;
}
interface TypographyScale {
    display: string;
    body: string;
    mono: string;
    lang: string;
}
interface ThemeMeta {
    layout?: string;
    author?: string;
    company?: string;
    subject?: string;
    title?: string;
}

interface PositionedBox extends Bounds {
    [key: string]: unknown;
}
interface ChipOptions extends Partial<PositionedBox> {
    fill?: string;
    color?: string;
    fontSize?: number;
    rectRadius?: number;
}
interface PillOptions extends Partial<PositionedBox> {
    fill?: string;
    line?: string;
    color?: string;
    fontSize?: number;
    rectRadius?: number;
}
interface CardOptions extends PositionedBox {
    title?: string;
    body?: string;
    fill?: string;
    line?: string;
    accent?: string;
    accentW?: number;
    titleFontSize?: number;
    titleColor?: string;
    bodyFontSize?: number;
    bodyColor?: string;
    bodyAlign?: string;
    bodyYOffset?: number;
    rectRadius?: number;
}
interface MiniCardOptions extends PositionedBox {
    title?: string;
    body?: string;
    fill?: string;
    line?: string;
    accent?: string;
    titleFontSize?: number;
    bodyFontSize?: number;
    rectRadius?: number;
}
interface CenterStatementOptions extends PositionedBox {
    fill?: string;
    color?: string;
    fontSize?: number;
    rectRadius?: number;
    fontFace?: string;
}
interface ServerCycleOptions extends PositionedBox {
    [key: string]: unknown;
}
interface RestResourceOptions extends PositionedBox {
    verb: "GET" | "POST" | "PUT" | "DELETE";
    url: string;
    json?: string;
}
interface LayerStackOptions extends PositionedBox {
    [key: string]: unknown;
}
interface SlideNumberOptions extends Partial<PositionedBox> {
    fontSize?: number;
    color?: string;
}
interface MarkBoxOptions extends Partial<PositionedBox> {
    fill?: string;
    imageX?: number;
    imageY?: number;
    imageW?: number;
    imageH?: number;
}
interface HeaderOptions {
    background?: string;
    ruleColor?: string;
    number?: SlideNumberOptions;
    classLabel?: string;
    chipW?: number;
    logoMarkPath?: string;
    mark?: MarkBoxOptions;
    titleX?: number;
    titleY?: number;
    titleW?: number;
    titleH?: number;
    titleFontSize?: number;
    subtitleX?: number;
    subtitleY?: number;
    subtitleW?: number;
    subtitleH?: number;
    subtitleFontSize?: number;
}
interface CodePanelOptions extends PositionedBox {
    title?: string;
    code?: string;
    lang?: string;
    rectRadius?: number;
    fill?: string;
    titleFill?: string;
    fontSize?: number;
    annotations?: Omit<CodeAnnotationOptions, "codeX" | "codeY" | "codeW" | "codeH" | "textOffsetX" | "textOffsetY" | "textAreaH" | "fontSize">[];
}
interface AnnotationTarget extends PositionedBox {
    anchorY?: number;
    side?: "left" | "right";
}
interface CodeAnnotationOptions {
    codeX: number;
    codeY: number;
    codeW: number;
    codeH: number;
    totalLines?: number;
    lineNumber?: number;
    color?: string;
    connectorColor?: string;
    textOffsetX?: number;
    textOffsetY?: number;
    textAreaH?: number;
    fontSize?: number;
    linePitch?: number;
    lineHeight?: number;
    lineDigits?: number;
    charW?: number;
    side?: "left" | "right";
    stroke?: number;
    gutterMarkerW?: number;
    gutterMarkerH?: number;
    column?: number;
    length?: number;
    markerH?: number;
    laneX?: number;
    targetMarkerW?: number;
    targetMarkerH?: number;
    target?: AnnotationTarget;
    toX?: number;
    toY?: number;
    routeY?: number;
    badgeText?: string | number;
    badgeSize?: number;
    badgeFontSize?: number;
    sourceBadgeStyle?: "circle" | "port" | "none";
    targetBadgeStyle?: "circle" | "tab" | "none";
    showTargetBadgeLabel?: boolean;
    targetBadgeW?: number;
    targetBadgeH?: number;
    targetBadgeFontSize?: number;
    sourcePortW?: number;
    sourcePortH?: number;
    showBadge?: boolean;
    showHighlight?: boolean;
    highlightFill?: string;
    highlightH?: number;
    showUnderline?: boolean;
}
interface TerminalLine {
    prompt?: string;
    text?: string;
    kind?: string;
}
interface TerminalPanelOptions extends PositionedBox {
    title?: string;
    lines?: TerminalLine[];
    fill?: string;
    fontSize?: number;
}
interface BrowserMockOptions extends PositionedBox {
    url?: string;
    title?: string;
}
interface ViewportCardDescriptor {
    label?: string;
    sizeLabel?: string;
    notes?: string[];
}
interface FormField {
    label: string;
    multiline?: boolean;
    [key: string]: unknown;
}
interface FormMockOptions extends PositionedBox {
    title?: string;
    fields?: FormField[];
    buttonLabel?: string;
    buttonW?: number;
}
interface ResponsiveViewportCompareOptions extends PositionedBox {
    title?: string;
    leftW?: number;
    rightW?: number;
    gap?: number;
    left?: ViewportCardDescriptor;
    right?: ViewportCardDescriptor;
}
interface ResponsiveReflowStage {
    label?: string;
    sizeLabel?: string;
    behavior?: string;
    layout?: "desktop" | "tablet" | "mobile";
    tone?: string;
    toneFill?: string;
    behaviorFill?: string;
}
interface ResponsiveReflowPanelOptions extends PositionedBox {
    title?: string;
    stages?: ResponsiveReflowStage[];
    footer?: string;
}
interface BreakpointDecisionStage {
    label?: string;
    sizeLabel?: string;
    note?: string;
    accent?: string;
    fill?: string;
    active?: boolean;
}
interface BreakpointDecisionPanelOptions extends PositionedBox {
    title?: string;
    stages?: BreakpointDecisionStage[];
    signalTitle?: string;
    signalBody?: string;
    breakpointTitle?: string;
    breakpointBody?: string;
    focusSizeLabel?: string;
    decisionTitle?: string;
    decisionBody?: string;
    footer?: string;
}
interface ComponentVariant {
    label?: string;
    role?: string;
    description?: string;
    accent?: string;
    fill?: string;
    preview?: "card" | "button" | "nav" | "stack";
    ctaLabel?: string;
}
interface ComponentVariantBoardOptions extends PositionedBox {
    title?: string;
    variants?: ComponentVariant[];
    footer?: string;
}
interface ComponentConsistencyPanelOptions extends PositionedBox {
    title?: string;
    leftTitle?: string;
    leftSubtitle?: string;
    leftBody?: string;
    leftFill?: string;
    leftAccent?: string;
    rightTitle?: string;
    rightSubtitle?: string;
    rightBody?: string;
    rightFill?: string;
    rightAccent?: string;
    footer?: string;
}
interface QualityDimension {
    title?: string;
    body?: string;
    accent?: string;
    fill?: string;
}
interface QualityDimensionsPanelOptions extends PositionedBox {
    title?: string;
    centerLabel?: string;
    dimensions?: QualityDimension[];
    footer?: string;
}
interface AuditEvidenceItem {
    title?: string;
    body?: string;
    accent?: string;
    fill?: string;
}
interface AuditEvidenceBoardOptions extends PositionedBox {
    title?: string;
    items?: AuditEvidenceItem[];
    insightTitle?: string;
    insightBody?: string;
    steps?: string[];
    footer?: string;
}
interface SeoSnippetPreviewOptions extends PositionedBox {
    title?: string;
    url?: string;
    description?: string;
    breadcrumb?: string;
    titleColor?: string;
    urlColor?: string;
    descriptionColor?: string;
    borderColor?: string;
    fill?: string;
}
interface CssRuleEntry {
    selector?: string;
    declaration?: string;
    specificity?: string;
    active?: boolean;
}
interface CssRuleStackOptions extends PositionedBox {
    title?: string;
    rules?: CssRuleEntry[];
    footer?: string;
}
interface CascadeInspectorRule {
    selector?: string;
    declaration?: string;
    specificity?: string;
    reason?: string;
    active?: boolean;
}
interface CascadeInspectorOptions extends PositionedBox {
    title?: string;
    elementLabel?: string;
    propertyLabel?: string;
    propertyValue?: string;
    resultLabel?: string;
    resolvedValue?: string;
    resultNote?: string;
    rules?: CascadeInspectorRule[];
    elementW?: number;
    resultW?: number;
    gap?: number;
}
interface SpecificityScaleEntry {
    label?: string;
    value?: string;
    weightLabel?: string;
    active?: boolean;
    scale?: number;
}
interface SpecificityScaleOptions extends PositionedBox {
    title?: string;
    subtitle?: string;
    entries?: SpecificityScaleEntry[];
    footer?: string;
}
interface TokenBoardItem {
    label?: string;
    value?: string;
    swatch?: string;
}
interface TokenBoardGroup {
    title?: string;
    tone?: string;
    fill?: string;
    items?: TokenBoardItem[];
}
interface TokenBoardOptions extends PositionedBox {
    title?: string;
    groups?: TokenBoardGroup[];
    footer?: string;
}
interface FrameworkDecisionRow {
    label?: string;
    helps?: string;
    risk?: string;
    decision?: string;
    accent?: string;
}
interface FrameworkDecisionMatrixOptions extends PositionedBox {
    title?: string;
    rows?: FrameworkDecisionRow[];
    footer?: string;
}
interface UrlBreakdownSegment {
    label?: string;
    value?: string;
    note?: string;
    accent?: string;
    fill?: string;
    ratio?: number;
    mono?: boolean;
    valueFontSize?: number;
    noteFontSize?: number;
}
interface UrlBreakdownOptions extends PositionedBox {
    title?: string;
    url?: string;
    urlFill?: string;
    urlFontSize?: number;
    headerFill?: string;
    fill?: string;
    line?: string;
    segments?: UrlBreakdownSegment[];
    footer?: string;
}
interface MythRealityEntry {
    badge?: string;
    myth?: string;
    reality?: string;
    accent?: string;
    fill?: string;
    badgeFill?: string;
    mythFontSize?: number;
    realityFontSize?: number;
}
interface MythRealityGridOptions extends PositionedBox {
    title?: string;
    entries?: MythRealityEntry[];
    columns?: number;
    fill?: string;
    line?: string;
    headerFill?: string;
    footer?: string;
}
interface ActorLaneEntry {
    label?: string;
    body?: string;
    accent?: string;
    fill?: string;
    titleFontSize?: number;
    bodyFontSize?: number;
}
interface ActorLaneOptions extends PositionedBox {
    title?: string;
    entries?: ActorLaneEntry[];
    fill?: string;
    line?: string;
    headerFill?: string;
    railYOffset?: number;
    cardW?: number;
    cardH?: number;
    footer?: string;
}
interface StageChainStage {
    step?: string;
    title?: string;
    body?: string;
    accent?: string;
    fill?: string;
    tone?: "light" | "dark";
}
interface StageChainNote {
    title?: string;
    body?: string;
    accent?: string;
    fill?: string;
}
interface StageChainOptions extends PositionedBox {
    title?: string;
    stages?: StageChainStage[];
    notes?: StageChainNote[];
    fill?: string;
    line?: string;
    headerFill?: string;
    chevronColor?: string;
    compact?: boolean;
    footer?: string;
}
interface IntelTimelineItem {
    date?: string;
    title?: string;
    body?: string;
    accent?: string;
    fill?: string;
}
interface IntelTimelinePanelOptions extends PositionedBox {
    title?: string;
    items?: IntelTimelineItem[];
    fill?: string;
    line?: string;
    headerFill?: string;
    chevronColor?: string;
    footer?: string;
}
interface DecisionPipelineStage {
    label?: string;
    title?: string;
    body?: string;
    accent?: string;
    fill?: string;
}
interface DecisionPipelinePanelOptions extends PositionedBox {
    title?: string;
    stages?: DecisionPipelineStage[];
    fill?: string;
    line?: string;
    headerFill?: string;
    chevronColor?: string;
    footer?: string;
}
interface PowerNetworkCenter {
    title?: string;
    body?: string;
    accent?: string;
}
interface PowerNetworkNode {
    title?: string;
    body?: string;
    accent?: string;
    position?: "lt" | "lb" | "rt" | "rb" | "bc";
}
interface PowerNetworkMapOptions extends PositionedBox {
    title?: string;
    center?: PowerNetworkCenter;
    nodes?: PowerNetworkNode[];
    fill?: string;
    line?: string;
    headerFill?: string;
}
interface ExposureColumn {
    label?: string;
    title?: string;
    body?: string;
    accent?: string;
    fill?: string;
    bodyFontSize?: number;
}
interface ExposureCompareOptions extends PositionedBox {
    title?: string;
    fill?: string;
    line?: string;
    headerFill?: string;
    leftW?: number;
    bridgeW?: number;
    gap?: number;
    bridgeLabel?: string;
    bridgeAccent?: string;
    left?: ExposureColumn;
    right?: ExposureColumn;
    footer?: string;
}
interface ChecklistGridEntry {
    badge?: string;
    title?: string;
    body?: string;
    accent?: string;
    fill?: string;
    badgeFill?: string;
    titleFontSize?: number;
    bodyFontSize?: number;
}
interface ChecklistGridOptions extends PositionedBox {
    title?: string;
    entries?: ChecklistGridEntry[];
    columns?: number;
    fill?: string;
    line?: string;
    headerFill?: string;
    footer?: string;
}
interface AuthFlowStep {
    step?: string;
    title?: string;
    body?: string;
    accent?: string;
    fill?: string;
}
interface AuthFlowOptions extends PositionedBox {
    title?: string;
    steps?: AuthFlowStep[];
    fill?: string;
    line?: string;
    headerFill?: string;
    chevronColor?: string;
    example?: string;
    footer?: string;
}
interface AgenticFlowStep {
    step?: string;
    title?: string;
    body?: string;
    accent?: string;
    fill?: string;
    tone?: "light" | "dark";
}
interface AgenticFlowOptions extends PositionedBox {
    title?: string;
    steps?: AgenticFlowStep[];
    fill?: string;
    line?: string;
    headerFill?: string;
    chevronColor?: string;
    compact?: boolean;
    footer?: string;
}
interface SpecWorkflowPhase {
    step?: string;
    title?: string;
    question?: string;
    artifact?: string;
    control?: string;
    accent?: string;
    fill?: string;
}
interface SpecWorkflowOptions extends PositionedBox {
    title?: string;
    phases?: SpecWorkflowPhase[];
    fill?: string;
    line?: string;
    headerFill?: string;
    compact?: boolean;
    footer?: string;
}
interface DelegationColumn {
    title?: string;
    subtitle?: string;
    items?: string[];
    accent?: string;
    fill?: string;
    dark?: boolean;
}
interface DelegationSplitOptions extends PositionedBox {
    title?: string;
    left?: DelegationColumn;
    right?: DelegationColumn;
    fill?: string;
    line?: string;
    headerFill?: string;
    bridgeW?: number;
    bridgeFill?: string;
    bridgeAccent?: string;
    bridgeLabel?: string;
    bridgeBody?: string;
    footer?: string;
}
interface BoxModelDiagramOptions extends PositionedBox {
    title?: string;
    margin?: string;
    border?: string;
    padding?: string;
    content?: string;
}
interface FlexGridLayoutOptions extends PositionedBox {
    title?: string;
    mode?: "flex" | "grid";
    itemCount?: number;
    columns?: number;
}
interface LighthouseScore {
    label: string;
    score: number;
}
interface LighthouseAuditCardOptions extends PositionedBox {
    title?: string;
    scores?: LighthouseScore[];
    summary?: string;
}
interface PerformanceMetricItem {
    label?: string;
    value?: string;
    note?: string;
    accent?: string;
    fill?: string;
}
interface PerformanceMetricsBoardOptions extends PositionedBox {
    title?: string;
    metrics?: PerformanceMetricItem[];
    footer?: string;
}
interface NetworkResourceItem {
    label?: string;
    kind?: string;
    sizeLabel?: string;
    durationLabel?: string;
    weight?: number;
    accent?: string;
    fill?: string;
}
interface NetworkLoadBoardOptions extends PositionedBox {
    title?: string;
    resources?: NetworkResourceItem[];
    summaryTitle?: string;
    summaryBody?: string;
    footer?: string;
}
interface AuditScoreItem {
    label?: string;
    score?: number;
    note?: string;
}
interface AuditScorePanelOptions extends PositionedBox {
    title?: string;
    items?: AuditScoreItem[];
    footer?: string;
}
interface AccessibilityChecklistItem {
    label?: string;
    note?: string;
    status?: "ok" | "warn" | "critical";
}
interface AccessibilityChecklistPanelOptions extends PositionedBox {
    title?: string;
    items?: AccessibilityChecklistItem[];
    footer?: string;
}
interface IssuePriorityItem {
    label?: string;
    impact?: "low" | "high";
    urgency?: "low" | "high";
    accent?: string;
    fill?: string;
}
interface IssuePriorityMatrixOptions extends PositionedBox {
    title?: string;
    xAxisLabel?: string;
    yAxisLabel?: string;
    items?: IssuePriorityItem[];
    footer?: string;
}
interface EvaluationRubricRow {
    label?: string;
    weight?: number;
    weightLabel?: string;
    note?: string;
    accent?: string;
    fill?: string;
}
interface EvaluationRubricPanelOptions extends PositionedBox {
    title?: string;
    rows?: EvaluationRubricRow[];
    totalLabel?: string;
    footer?: string;
}
interface ScoreBoostItem {
    title?: string;
    body?: string;
    accent?: string;
    fill?: string;
}
interface ScoreBoostsAndPenaltiesOptions extends PositionedBox {
    title?: string;
    boostsTitle?: string;
    boostsSubtitle?: string;
    boosts?: ScoreBoostItem[];
    penaltiesTitle?: string;
    penaltiesSubtitle?: string;
    penalties?: ScoreBoostItem[];
    footer?: string;
}
interface ProjectWorkflowStage {
    step?: string;
    title?: string;
    artifact?: string;
    body?: string;
    accent?: string;
    fill?: string;
}
interface ProjectWorkflowPanelOptions extends PositionedBox {
    title?: string;
    stages?: ProjectWorkflowStage[];
    footer?: string;
}
interface PromptQualityCompareOptions extends PositionedBox {
    title?: string;
    badTitle?: string;
    badSubtitle?: string;
    badPrompt?: string;
    badNotes?: string[];
    goodTitle?: string;
    goodSubtitle?: string;
    goodPrompt?: string;
    goodNotes?: string[];
    footer?: string;
}
interface StaticVsInteractiveCompareOptions extends PositionedBox {
    title?: string;
    leftTitle?: string;
    leftSubtitle?: string;
    leftCta?: string;
    leftNote?: string;
    leftSideLabel?: string;
    rightTitle?: string;
    rightSubtitle?: string;
    rightCta?: string;
    rightNote?: string;
    rightSideLabel?: string;
    footer?: string;
}
interface DataTypesBoardCard {
    label?: string;
    sample?: string;
    note?: string;
    accent?: string;
    fill?: string;
}
interface DataTypesBoardOptions extends PositionedBox {
    title?: string;
    cards?: DataTypesBoardCard[];
    footer?: string;
}
interface ControlFlowPanelOptions extends PositionedBox {
    title?: string;
    inputTitle?: string;
    inputCode?: string;
    inputBody?: string;
    conditionTitle?: string;
    conditionLabel?: string;
    conditionBody?: string;
    outputTitle?: string;
    trueTitle?: string;
    trueBody?: string;
    falseTitle?: string;
    falseBody?: string;
    footer?: string;
}
interface EventReactionStage {
    title?: string;
    body?: string;
    accent?: string;
    fill?: string;
}
interface EventReactionPanelOptions extends PositionedBox {
    title?: string;
    stages?: EventReactionStage[];
    browserLabel?: string;
    triggerLabel?: string;
    responseLabel?: string;
    browserNote?: string;
    footer?: string;
}
interface DomMutationFlowOptions extends PositionedBox {
    title?: string;
    selectorTitle?: string;
    selectorBody?: string;
    mutationTitle?: string;
    mutationBody?: string;
    resultTitle?: string;
    resultBadge?: string;
    resultBody?: string;
    footer?: string;
}
interface DebugEvidenceCard {
    title?: string;
    body?: string;
    question?: string;
    accent?: string;
    fill?: string;
    icon?: string;
}
interface DebugEvidenceBoardOptions extends PositionedBox {
    title?: string;
    cards?: DebugEvidenceCard[];
    footer?: string;
}
interface SpreadsheetProblemHighlight {
    row?: number;
    col?: number;
    accent?: string;
    fill?: string;
}
interface SpreadsheetProblemCallout {
    title?: string;
    body?: string;
    accent?: string;
    fill?: string;
}
interface SpreadsheetProblemPanelOptions extends PositionedBox {
    title?: string;
    columns?: string[];
    rows?: string[][];
    highlights?: SpreadsheetProblemHighlight[];
    callouts?: SpreadsheetProblemCallout[];
    footer?: string;
}
interface BlueprintEntity {
    title?: string;
    icon?: string;
    fields?: string[];
    accent?: string;
    fill?: string;
}
interface BlueprintRelation {
    from?: number;
    to?: number;
    label?: string;
    accent?: string;
}
interface EntityRelationshipBlueprintOptions extends PositionedBox {
    title?: string;
    entities?: BlueprintEntity[];
    relations?: BlueprintRelation[];
    footer?: string;
}
interface NormalizationStage {
    badge?: string;
    title?: string;
    focus?: string;
    note?: string;
    accent?: string;
    fill?: string;
    sample?: string[];
}
interface NormalizationStepperOptions extends PositionedBox {
    title?: string;
    stages?: NormalizationStage[];
    footer?: string;
}
interface SqlBridgeTableChip {
    title?: string;
    meta?: string;
    accent?: string;
    fill?: string;
}
interface SqlBridgePanelOptions extends PositionedBox {
    title?: string;
    tables?: SqlBridgeTableChip[];
    codeTitle?: string;
    codeLines?: string[];
    footer?: string;
}
interface JsonPanelOptions extends PositionedBox {
    title?: string;
    code?: string;
    fill?: string;
    titleFill?: string;
    fontSize?: number;
}
interface RequestResponseFlowOptions extends PositionedBox {
    title?: string;
    clientLabel?: string;
    serverLabel?: string;
    requestLabel?: string;
    requestMeta?: string;
    responseLabel?: string;
    responseMeta?: string;
}
interface ComponentTreeNode {
    label?: string;
    depth?: number;
    meta?: string;
}
interface ComponentTreeOptions extends PositionedBox {
    title?: string;
    nodes?: ComponentTreeNode[];
}
type DomTreeTone = "red" | "blue" | "gold" | "neutral";
interface DomTreeNode {
    tag: string;
    depth?: number;
    tone?: DomTreeTone;
    detail?: string;
    width?: number;
}
interface DomTreePanelOptions extends PositionedBox {
    title?: string;
    subtitle?: string;
    nodes?: DomTreeNode[];
    rowH?: number;
    rowGap?: number;
    indent?: number;
}
interface EventLoopDiagramOptions extends PositionedBox {
    stackFrames?: string[];
    apiItems?: string[];
    queueItems?: string[];
    highlightPhase?: "stack" | "apis" | "queue" | "loop";
    fill?: string;
    caption?: string;
    fontSize?: number;
}
interface SyntaxCompareOptions extends PositionedBox {
    beforeLabel?: string;
    afterLabel?: string;
    beforeCode: string;
    afterCode: string;
    language?: string;
    caption?: string;
    fontSize?: number;
}
interface TableSchemaColumn {
    name: string;
    type: string;
    key?: "PK" | "FK" | "";
}
interface TableSchemaOptions extends PositionedBox {
    title?: string;
    columns?: TableSchemaColumn[];
}
type JoinSetDiagramType = "inner" | "left" | "right" | "full" | "leftOnly" | "rightOnly";
interface JoinSetDiagramOptions extends PositionedBox {
    type?: JoinSetDiagramType;
    title?: string | false;
    leftLabel?: string;
    rightLabel?: string;
    badge?: string;
    result?: string;
    caption?: string | false;
    fill?: string;
    line?: string;
    headerFill?: string;
    badgeFill?: string;
    leftColor?: string;
    rightColor?: string;
    highlightColor?: string;
    diagramFill?: string;
    pad?: number;
    titleFontSize?: number;
    badgeFontSize?: number;
    captionFontSize?: number;
}
interface SupabaseProjectSetupPanelOptions extends PositionedBox {
    title?: string;
    leftW?: number;
    organizationName?: string;
    projectName?: string;
    databasePassword?: string;
    regionName?: string;
    planLabel?: string;
    statusItems?: string[];
    tabs?: string[];
    footer?: string;
}
interface SupabaseTableEditorColumn {
    name: string;
    type: string;
    key?: "PK" | "FK" | "";
}
interface SupabaseTableEditorPanelOptions extends PositionedBox {
    title?: string;
    leftW?: number;
    tableName?: string;
    columns?: SupabaseTableEditorColumn[];
    relationshipTitle?: string;
    relationshipBody?: string;
    sampleRowTitle?: string;
    sampleValues?: string[];
    footer?: string;
}
interface ErRelationshipOptions extends PositionedBox {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    type?: "1:1" | "1:N" | "N:M";
    label?: string;
    color?: string;
}
interface AgentOrchestrationDiagramOptions extends PositionedBox {
    title?: string;
}
interface McpBridgePanelOptions extends PositionedBox {
    title?: string;
}
interface ToolExecutionConsoleOptions extends PositionedBox {
    command?: string;
    params?: Record<string, unknown>;
    result?: string;
}
interface ValidationLayer {
    name: string;
    status: "OK" | "WARN" | "FAIL";
    desc: string;
    color?: string;
}
interface ValidationLayerRadarOptions extends PositionedBox {
    title?: string;
    layers?: ValidationLayer[];
}
interface AgentReasoningLoopOptions extends PositionedBox {
    title?: string;
}
interface GameAiPanelOptions extends PositionedBox {
    title?: string;
    subtitle?: string;
    [key: string]: unknown;
}
type AtaxxBoardStateOptions = GameAiPanelOptions;
type MoveAnatomyPanelOptions = GameAiPanelOptions;
type MctsSearchPanelOptions = GameAiPanelOptions;
type PolicyValueArchitectureOptions = GameAiPanelOptions;
type SelfPlayLoopPanelOptions = GameAiPanelOptions;
type ModelGenerationTableOptions = GameAiPanelOptions;
type TournamentRulesPanelOptions = GameAiPanelOptions;

declare const TOKENS: ThemeTokens;
declare const TYPOGRAPHY: TypographyScale;
declare function applyAiepTheme(pptx: PptxLike, meta?: ThemeMeta): PptxLike;

declare const index$2_TOKENS: typeof TOKENS;
declare const index$2_TYPOGRAPHY: typeof TYPOGRAPHY;
declare const index$2_applyAiepTheme: typeof applyAiepTheme;
declare namespace index$2 {
  export { index$2_TOKENS as TOKENS, index$2_TYPOGRAPHY as TYPOGRAPHY, index$2_applyAiepTheme as applyAiepTheme };
}

declare const setBackground: (slide: SlideLike, color?: string) => void;
declare const addTopRule: (slide: SlideLike, SH: ShapeCatalog, color?: string) => void;
declare const addSlideNumber: (slide: SlideLike, pptx: PptxLike, opts?: SlideNumberOptions) => void;
declare const addMarkBox: (slide: SlideLike, SH: ShapeCatalog, logoMarkPath?: string, opts?: MarkBoxOptions) => void;
declare const addChip: (slide: SlideLike, SH: ShapeCatalog, text: string, opts?: ChipOptions) => void;
declare const addPill: (slide: SlideLike, SH: ShapeCatalog, text: string, opts?: PillOptions) => void;
declare const addCard: (slide: SlideLike, SH: ShapeCatalog, opts: CardOptions) => void;
declare const addMiniCard: (slide: SlideLike, SH: ShapeCatalog, opts: MiniCardOptions) => void;
declare const addCenterStatement: (slide: SlideLike, SH: ShapeCatalog, text: string, opts: CenterStatementOptions) => void;
declare const addHeader: (slide: SlideLike, SH: ShapeCatalog, pptx: PptxLike, title: string, subtitle?: string, blockLabel?: string, opts?: HeaderOptions) => void;
declare const addCodePanel: (slide: SlideLike, SH: ShapeCatalog, opts: CodePanelOptions) => void;
declare const addCodeAnnotation: (slide: SlideLike, SH: ShapeCatalog, opts: CodeAnnotationOptions) => void;
declare const addTerminalPanel: (slide: SlideLike, SH: ShapeCatalog, opts: TerminalPanelOptions) => void;
declare const addBrowserMock: (slide: SlideLike, SH: ShapeCatalog, opts: BrowserMockOptions) => void;
declare const addFormMock: (slide: SlideLike, SH: ShapeCatalog, opts: FormMockOptions) => void;
declare const addDomTreePanel: (slide: SlideLike, SH: ShapeCatalog, opts: DomTreePanelOptions) => void;
declare const addResponsiveViewportCompare: (slide: SlideLike, SH: ShapeCatalog, opts: ResponsiveViewportCompareOptions) => void;
declare const addResponsiveReflowPanel: (slide: SlideLike, SH: ShapeCatalog, opts: ResponsiveReflowPanelOptions) => void;
declare const addBreakpointDecisionPanel: (slide: SlideLike, SH: ShapeCatalog, opts: BreakpointDecisionPanelOptions) => void;
declare const addComponentVariantBoard: (slide: SlideLike, SH: ShapeCatalog, opts: ComponentVariantBoardOptions) => void;
declare const addQualityDimensionsPanel: (slide: SlideLike, SH: ShapeCatalog, opts: QualityDimensionsPanelOptions) => void;
declare const addAuditEvidenceBoard: (slide: SlideLike, SH: ShapeCatalog, opts: AuditEvidenceBoardOptions) => void;
declare const addSeoSnippetPreview: (slide: SlideLike, SH: ShapeCatalog, opts: SeoSnippetPreviewOptions) => void;
declare const addComponentConsistencyPanel: (slide: SlideLike, SH: ShapeCatalog, opts: ComponentConsistencyPanelOptions) => void;
declare const addCssRuleStack: (slide: SlideLike, SH: ShapeCatalog, opts: CssRuleStackOptions) => void;
declare const addCascadeInspector: (slide: SlideLike, SH: ShapeCatalog, opts: CascadeInspectorOptions) => void;
declare const addSpecificityScale: (slide: SlideLike, SH: ShapeCatalog, opts: SpecificityScaleOptions) => void;
declare const addTokenBoard: (slide: SlideLike, SH: ShapeCatalog, opts: TokenBoardOptions) => void;
declare const addFrameworkDecisionMatrix: (slide: SlideLike, SH: ShapeCatalog, opts: FrameworkDecisionMatrixOptions) => void;
declare const addBoxModelDiagram: (slide: SlideLike, SH: ShapeCatalog, opts: BoxModelDiagramOptions) => void;
declare const addFlexGridLayout: (slide: SlideLike, SH: ShapeCatalog, opts: FlexGridLayoutOptions) => void;
declare const addLighthouseAuditCard: (slide: SlideLike, SH: ShapeCatalog, opts: LighthouseAuditCardOptions) => void;
declare const addPerformanceMetricsBoard: (slide: SlideLike, SH: ShapeCatalog, opts: PerformanceMetricsBoardOptions) => void;
declare const addNetworkLoadBoard: (slide: SlideLike, SH: ShapeCatalog, opts: NetworkLoadBoardOptions) => void;
declare const addAuditScorePanel: (slide: SlideLike, SH: ShapeCatalog, opts: AuditScorePanelOptions) => void;
declare const addAccessibilityChecklistPanel: (slide: SlideLike, SH: ShapeCatalog, opts: AccessibilityChecklistPanelOptions) => void;
declare const addIssuePriorityMatrix: (slide: SlideLike, SH: ShapeCatalog, opts: IssuePriorityMatrixOptions) => void;
declare const addEvaluationRubricPanel: (slide: SlideLike, SH: ShapeCatalog, opts: EvaluationRubricPanelOptions) => void;
declare const addScoreBoostsAndPenalties: (slide: SlideLike, SH: ShapeCatalog, opts: ScoreBoostsAndPenaltiesOptions) => void;
declare const addProjectWorkflowPanel: (slide: SlideLike, SH: ShapeCatalog, opts: ProjectWorkflowPanelOptions) => void;
declare const addPromptQualityCompare: (slide: SlideLike, SH: ShapeCatalog, opts: PromptQualityCompareOptions) => void;
declare const addSpreadsheetProblemPanel: (slide: SlideLike, SH: ShapeCatalog, opts: SpreadsheetProblemPanelOptions) => void;
declare const addEntityRelationshipBlueprint: (slide: SlideLike, SH: ShapeCatalog, opts: EntityRelationshipBlueprintOptions) => void;
declare const addNormalizationStepper: (slide: SlideLike, SH: ShapeCatalog, opts: NormalizationStepperOptions) => void;
declare const addSqlBridgePanel: (slide: SlideLike, SH: ShapeCatalog, opts: SqlBridgePanelOptions) => void;
declare const addStaticVsInteractiveCompare: (slide: SlideLike, SH: ShapeCatalog, opts: StaticVsInteractiveCompareOptions) => void;
declare const addDataTypesBoard: (slide: SlideLike, SH: ShapeCatalog, opts: DataTypesBoardOptions) => void;
declare const addControlFlowPanel: (slide: SlideLike, SH: ShapeCatalog, opts: ControlFlowPanelOptions) => void;
declare const addEventReactionPanel: (slide: SlideLike, SH: ShapeCatalog, opts: EventReactionPanelOptions) => void;
declare const addDomMutationFlow: (slide: SlideLike, SH: ShapeCatalog, opts: DomMutationFlowOptions) => void;
declare const addDebugEvidenceBoard: (slide: SlideLike, SH: ShapeCatalog, opts: DebugEvidenceBoardOptions) => void;
declare const addUrlBreakdown: (slide: SlideLike, SH: ShapeCatalog, opts: UrlBreakdownOptions) => void;
declare const addMythRealityGrid: (slide: SlideLike, SH: ShapeCatalog, opts: MythRealityGridOptions) => void;
declare const addActorLane: (slide: SlideLike, SH: ShapeCatalog, opts: ActorLaneOptions) => void;
declare const addStageChain: (slide: SlideLike, SH: ShapeCatalog, opts: StageChainOptions) => void;
declare const addIntelTimelinePanel: (slide: SlideLike, SH: ShapeCatalog, opts: IntelTimelinePanelOptions) => void;
declare const addDecisionPipelinePanel: (slide: SlideLike, SH: ShapeCatalog, opts: DecisionPipelinePanelOptions) => void;
declare const addPowerNetworkMap: (slide: SlideLike, SH: ShapeCatalog, opts: PowerNetworkMapOptions) => void;
declare const addExposureCompare: (slide: SlideLike, SH: ShapeCatalog, opts: ExposureCompareOptions) => void;
declare const addChecklistGrid: (slide: SlideLike, SH: ShapeCatalog, opts: ChecklistGridOptions) => void;
declare const addAuthFlow: (slide: SlideLike, SH: ShapeCatalog, opts: AuthFlowOptions) => void;
declare const addJsonPanel: (slide: SlideLike, SH: ShapeCatalog, opts: JsonPanelOptions) => void;
declare const addRequestResponseFlow: (slide: SlideLike, SH: ShapeCatalog, opts: RequestResponseFlowOptions) => void;
declare const addComponentTree: (slide: SlideLike, SH: ShapeCatalog, opts: ComponentTreeOptions) => void;
declare const addAgenticFlow: (slide: SlideLike, SH: ShapeCatalog, opts: AgenticFlowOptions) => void;
declare const addSpecWorkflow: (slide: SlideLike, SH: ShapeCatalog, opts: SpecWorkflowOptions) => void;
declare const addDelegationSplit: (slide: SlideLike, SH: ShapeCatalog, opts: DelegationSplitOptions) => void;
declare const addAgentOrchestrationDiagram: (slide: SlideLike, SH: ShapeCatalog, opts: AgentOrchestrationDiagramOptions) => void;
declare const addMcpBridgePanel: (slide: SlideLike, SH: ShapeCatalog, opts: McpBridgePanelOptions) => void;
declare const addToolExecutionConsole: (slide: SlideLike, SH: ShapeCatalog, opts: ToolExecutionConsoleOptions) => void;
declare const addValidationLayerRadar: (slide: SlideLike, SH: ShapeCatalog, opts: ValidationLayerRadarOptions) => void;
declare const addAgentReasoningLoop: (slide: SlideLike, SH: ShapeCatalog, opts: AgentReasoningLoopOptions) => void;
declare const addEventLoopDiagram: (slide: SlideLike, SH: ShapeCatalog, opts: EventLoopDiagramOptions) => void;
declare const addSyntaxCompare: (slide: SlideLike, SH: ShapeCatalog, opts: SyntaxCompareOptions) => void;
declare const addServerCycle: (slide: SlideLike, SH: ShapeCatalog, opts: ServerCycleOptions) => void;
declare const addRestResource: (slide: SlideLike, SH: ShapeCatalog, opts: RestResourceOptions) => void;
declare const addLayerStack: (slide: SlideLike, SH: ShapeCatalog, opts: LayerStackOptions) => void;
declare const addTableSchema: (slide: SlideLike, SH: ShapeCatalog, opts: TableSchemaOptions) => void;
declare const addJoinSetDiagram: (slide: SlideLike, SH: ShapeCatalog, opts: JoinSetDiagramOptions) => void;
declare const addErRelationship: (slide: SlideLike, SH: ShapeCatalog, opts: ErRelationshipOptions) => void;
declare const addSupabaseProjectSetupPanel: (slide: SlideLike, SH: ShapeCatalog, opts: SupabaseProjectSetupPanelOptions) => void;
declare const addSupabaseTableEditorPanel: (slide: SlideLike, SH: ShapeCatalog, opts: SupabaseTableEditorPanelOptions) => void;
declare const addAtaxxBoardState: (slide: SlideLike, SH: ShapeCatalog, opts: AtaxxBoardStateOptions) => void;
declare const addMoveAnatomyPanel: (slide: SlideLike, SH: ShapeCatalog, opts: MoveAnatomyPanelOptions) => void;
declare const addMctsSearchPanel: (slide: SlideLike, SH: ShapeCatalog, opts: MctsSearchPanelOptions) => void;
declare const addPolicyValueArchitecture: (slide: SlideLike, SH: ShapeCatalog, opts: PolicyValueArchitectureOptions) => void;
declare const addSelfPlayLoopPanel: (slide: SlideLike, SH: ShapeCatalog, opts: SelfPlayLoopPanelOptions) => void;
declare const addModelGenerationTable: (slide: SlideLike, SH: ShapeCatalog, opts: ModelGenerationTableOptions) => void;
declare const addTournamentRulesPanel: (slide: SlideLike, SH: ShapeCatalog, opts: TournamentRulesPanelOptions) => void;

declare const index$1_addAccessibilityChecklistPanel: typeof addAccessibilityChecklistPanel;
declare const index$1_addActorLane: typeof addActorLane;
declare const index$1_addAgentOrchestrationDiagram: typeof addAgentOrchestrationDiagram;
declare const index$1_addAgentReasoningLoop: typeof addAgentReasoningLoop;
declare const index$1_addAgenticFlow: typeof addAgenticFlow;
declare const index$1_addAtaxxBoardState: typeof addAtaxxBoardState;
declare const index$1_addAuditEvidenceBoard: typeof addAuditEvidenceBoard;
declare const index$1_addAuditScorePanel: typeof addAuditScorePanel;
declare const index$1_addAuthFlow: typeof addAuthFlow;
declare const index$1_addBoxModelDiagram: typeof addBoxModelDiagram;
declare const index$1_addBreakpointDecisionPanel: typeof addBreakpointDecisionPanel;
declare const index$1_addBrowserMock: typeof addBrowserMock;
declare const index$1_addCard: typeof addCard;
declare const index$1_addCascadeInspector: typeof addCascadeInspector;
declare const index$1_addCenterStatement: typeof addCenterStatement;
declare const index$1_addChecklistGrid: typeof addChecklistGrid;
declare const index$1_addChip: typeof addChip;
declare const index$1_addCodeAnnotation: typeof addCodeAnnotation;
declare const index$1_addCodePanel: typeof addCodePanel;
declare const index$1_addComponentConsistencyPanel: typeof addComponentConsistencyPanel;
declare const index$1_addComponentTree: typeof addComponentTree;
declare const index$1_addComponentVariantBoard: typeof addComponentVariantBoard;
declare const index$1_addControlFlowPanel: typeof addControlFlowPanel;
declare const index$1_addCssRuleStack: typeof addCssRuleStack;
declare const index$1_addDataTypesBoard: typeof addDataTypesBoard;
declare const index$1_addDebugEvidenceBoard: typeof addDebugEvidenceBoard;
declare const index$1_addDecisionPipelinePanel: typeof addDecisionPipelinePanel;
declare const index$1_addDelegationSplit: typeof addDelegationSplit;
declare const index$1_addDomMutationFlow: typeof addDomMutationFlow;
declare const index$1_addDomTreePanel: typeof addDomTreePanel;
declare const index$1_addEntityRelationshipBlueprint: typeof addEntityRelationshipBlueprint;
declare const index$1_addErRelationship: typeof addErRelationship;
declare const index$1_addEvaluationRubricPanel: typeof addEvaluationRubricPanel;
declare const index$1_addEventLoopDiagram: typeof addEventLoopDiagram;
declare const index$1_addEventReactionPanel: typeof addEventReactionPanel;
declare const index$1_addExposureCompare: typeof addExposureCompare;
declare const index$1_addFlexGridLayout: typeof addFlexGridLayout;
declare const index$1_addFormMock: typeof addFormMock;
declare const index$1_addFrameworkDecisionMatrix: typeof addFrameworkDecisionMatrix;
declare const index$1_addHeader: typeof addHeader;
declare const index$1_addIntelTimelinePanel: typeof addIntelTimelinePanel;
declare const index$1_addIssuePriorityMatrix: typeof addIssuePriorityMatrix;
declare const index$1_addJoinSetDiagram: typeof addJoinSetDiagram;
declare const index$1_addJsonPanel: typeof addJsonPanel;
declare const index$1_addLayerStack: typeof addLayerStack;
declare const index$1_addLighthouseAuditCard: typeof addLighthouseAuditCard;
declare const index$1_addMarkBox: typeof addMarkBox;
declare const index$1_addMcpBridgePanel: typeof addMcpBridgePanel;
declare const index$1_addMctsSearchPanel: typeof addMctsSearchPanel;
declare const index$1_addMiniCard: typeof addMiniCard;
declare const index$1_addModelGenerationTable: typeof addModelGenerationTable;
declare const index$1_addMoveAnatomyPanel: typeof addMoveAnatomyPanel;
declare const index$1_addMythRealityGrid: typeof addMythRealityGrid;
declare const index$1_addNetworkLoadBoard: typeof addNetworkLoadBoard;
declare const index$1_addNormalizationStepper: typeof addNormalizationStepper;
declare const index$1_addPerformanceMetricsBoard: typeof addPerformanceMetricsBoard;
declare const index$1_addPill: typeof addPill;
declare const index$1_addPolicyValueArchitecture: typeof addPolicyValueArchitecture;
declare const index$1_addPowerNetworkMap: typeof addPowerNetworkMap;
declare const index$1_addProjectWorkflowPanel: typeof addProjectWorkflowPanel;
declare const index$1_addPromptQualityCompare: typeof addPromptQualityCompare;
declare const index$1_addQualityDimensionsPanel: typeof addQualityDimensionsPanel;
declare const index$1_addRequestResponseFlow: typeof addRequestResponseFlow;
declare const index$1_addResponsiveReflowPanel: typeof addResponsiveReflowPanel;
declare const index$1_addResponsiveViewportCompare: typeof addResponsiveViewportCompare;
declare const index$1_addRestResource: typeof addRestResource;
declare const index$1_addScoreBoostsAndPenalties: typeof addScoreBoostsAndPenalties;
declare const index$1_addSelfPlayLoopPanel: typeof addSelfPlayLoopPanel;
declare const index$1_addSeoSnippetPreview: typeof addSeoSnippetPreview;
declare const index$1_addServerCycle: typeof addServerCycle;
declare const index$1_addSlideNumber: typeof addSlideNumber;
declare const index$1_addSpecWorkflow: typeof addSpecWorkflow;
declare const index$1_addSpecificityScale: typeof addSpecificityScale;
declare const index$1_addSpreadsheetProblemPanel: typeof addSpreadsheetProblemPanel;
declare const index$1_addSqlBridgePanel: typeof addSqlBridgePanel;
declare const index$1_addStageChain: typeof addStageChain;
declare const index$1_addStaticVsInteractiveCompare: typeof addStaticVsInteractiveCompare;
declare const index$1_addSupabaseProjectSetupPanel: typeof addSupabaseProjectSetupPanel;
declare const index$1_addSupabaseTableEditorPanel: typeof addSupabaseTableEditorPanel;
declare const index$1_addSyntaxCompare: typeof addSyntaxCompare;
declare const index$1_addTableSchema: typeof addTableSchema;
declare const index$1_addTerminalPanel: typeof addTerminalPanel;
declare const index$1_addTokenBoard: typeof addTokenBoard;
declare const index$1_addToolExecutionConsole: typeof addToolExecutionConsole;
declare const index$1_addTopRule: typeof addTopRule;
declare const index$1_addTournamentRulesPanel: typeof addTournamentRulesPanel;
declare const index$1_addUrlBreakdown: typeof addUrlBreakdown;
declare const index$1_addValidationLayerRadar: typeof addValidationLayerRadar;
declare const index$1_setBackground: typeof setBackground;
declare namespace index$1 {
  export { index$1_addAccessibilityChecklistPanel as addAccessibilityChecklistPanel, index$1_addActorLane as addActorLane, index$1_addAgentOrchestrationDiagram as addAgentOrchestrationDiagram, index$1_addAgentReasoningLoop as addAgentReasoningLoop, index$1_addAgenticFlow as addAgenticFlow, index$1_addAtaxxBoardState as addAtaxxBoardState, index$1_addAuditEvidenceBoard as addAuditEvidenceBoard, index$1_addAuditScorePanel as addAuditScorePanel, index$1_addAuthFlow as addAuthFlow, index$1_addBoxModelDiagram as addBoxModelDiagram, index$1_addBreakpointDecisionPanel as addBreakpointDecisionPanel, index$1_addBrowserMock as addBrowserMock, index$1_addCard as addCard, index$1_addCascadeInspector as addCascadeInspector, index$1_addCenterStatement as addCenterStatement, index$1_addChecklistGrid as addChecklistGrid, index$1_addChip as addChip, index$1_addCodeAnnotation as addCodeAnnotation, index$1_addCodePanel as addCodePanel, index$1_addComponentConsistencyPanel as addComponentConsistencyPanel, index$1_addComponentTree as addComponentTree, index$1_addComponentVariantBoard as addComponentVariantBoard, index$1_addControlFlowPanel as addControlFlowPanel, index$1_addCssRuleStack as addCssRuleStack, index$1_addDataTypesBoard as addDataTypesBoard, index$1_addDebugEvidenceBoard as addDebugEvidenceBoard, index$1_addDecisionPipelinePanel as addDecisionPipelinePanel, index$1_addDelegationSplit as addDelegationSplit, index$1_addDomMutationFlow as addDomMutationFlow, index$1_addDomTreePanel as addDomTreePanel, index$1_addEntityRelationshipBlueprint as addEntityRelationshipBlueprint, index$1_addErRelationship as addErRelationship, index$1_addEvaluationRubricPanel as addEvaluationRubricPanel, index$1_addEventLoopDiagram as addEventLoopDiagram, index$1_addEventReactionPanel as addEventReactionPanel, index$1_addExposureCompare as addExposureCompare, index$1_addFlexGridLayout as addFlexGridLayout, index$1_addFormMock as addFormMock, index$1_addFrameworkDecisionMatrix as addFrameworkDecisionMatrix, index$1_addHeader as addHeader, index$1_addIntelTimelinePanel as addIntelTimelinePanel, index$1_addIssuePriorityMatrix as addIssuePriorityMatrix, index$1_addJoinSetDiagram as addJoinSetDiagram, index$1_addJsonPanel as addJsonPanel, index$1_addLayerStack as addLayerStack, index$1_addLighthouseAuditCard as addLighthouseAuditCard, index$1_addMarkBox as addMarkBox, index$1_addMcpBridgePanel as addMcpBridgePanel, index$1_addMctsSearchPanel as addMctsSearchPanel, index$1_addMiniCard as addMiniCard, index$1_addModelGenerationTable as addModelGenerationTable, index$1_addMoveAnatomyPanel as addMoveAnatomyPanel, index$1_addMythRealityGrid as addMythRealityGrid, index$1_addNetworkLoadBoard as addNetworkLoadBoard, index$1_addNormalizationStepper as addNormalizationStepper, index$1_addPerformanceMetricsBoard as addPerformanceMetricsBoard, index$1_addPill as addPill, index$1_addPolicyValueArchitecture as addPolicyValueArchitecture, index$1_addPowerNetworkMap as addPowerNetworkMap, index$1_addProjectWorkflowPanel as addProjectWorkflowPanel, index$1_addPromptQualityCompare as addPromptQualityCompare, index$1_addQualityDimensionsPanel as addQualityDimensionsPanel, index$1_addRequestResponseFlow as addRequestResponseFlow, index$1_addResponsiveReflowPanel as addResponsiveReflowPanel, index$1_addResponsiveViewportCompare as addResponsiveViewportCompare, index$1_addRestResource as addRestResource, index$1_addScoreBoostsAndPenalties as addScoreBoostsAndPenalties, index$1_addSelfPlayLoopPanel as addSelfPlayLoopPanel, index$1_addSeoSnippetPreview as addSeoSnippetPreview, index$1_addServerCycle as addServerCycle, index$1_addSlideNumber as addSlideNumber, index$1_addSpecWorkflow as addSpecWorkflow, index$1_addSpecificityScale as addSpecificityScale, index$1_addSpreadsheetProblemPanel as addSpreadsheetProblemPanel, index$1_addSqlBridgePanel as addSqlBridgePanel, index$1_addStageChain as addStageChain, index$1_addStaticVsInteractiveCompare as addStaticVsInteractiveCompare, index$1_addSupabaseProjectSetupPanel as addSupabaseProjectSetupPanel, index$1_addSupabaseTableEditorPanel as addSupabaseTableEditorPanel, index$1_addSyntaxCompare as addSyntaxCompare, index$1_addTableSchema as addTableSchema, index$1_addTerminalPanel as addTerminalPanel, index$1_addTokenBoard as addTokenBoard, index$1_addToolExecutionConsole as addToolExecutionConsole, index$1_addTopRule as addTopRule, index$1_addTournamentRulesPanel as addTournamentRulesPanel, index$1_addUrlBreakdown as addUrlBreakdown, index$1_addValidationLayerRadar as addValidationLayerRadar, index$1_setBackground as setBackground };
}

declare const suspiciousMojibakePatterns: string[];
declare function findMojibakeMatches(input: string): string[];
declare function containsMojibake(input: string): boolean;

declare const SPACING: Record<string, number>;
declare const validateSlide: (slide: SlideLike, pptx: PptxLike) => void;
declare const makeCodeRuns: (code: string, lang?: string, fontSize?: number) => TextRun[];
declare const makeCodeText: (code: string) => {
    lineNumbers: string;
    codeText: string;
    totalLines: number;
    lineDigits: number;
};
declare const makeCodeLines: (code: string, lang?: string) => Array<{
    segments: Array<{
        text: string;
        color: string;
    }>;
}>;
declare const makeCodeLineRuns: (code: string, lang?: string, fontSize?: number) => TextRun[][];
declare const makeCodeSvgData: (code: string, lang?: string, opts?: {
    width?: number;
    height?: number;
    fontSize?: number;
    linePitch?: number;
    charW?: number;
    lineDigits?: number;
    pxPerIn?: number;
    topOffset?: number;
}) => string;
declare const buildThemeMap: (themeCssModule?: string) => Record<string, string>;

declare const index_SPACING: typeof SPACING;
declare const index_buildThemeMap: typeof buildThemeMap;
declare const index_containsMojibake: typeof containsMojibake;
declare const index_findMojibakeMatches: typeof findMojibakeMatches;
declare const index_makeCodeLineRuns: typeof makeCodeLineRuns;
declare const index_makeCodeLines: typeof makeCodeLines;
declare const index_makeCodeRuns: typeof makeCodeRuns;
declare const index_makeCodeSvgData: typeof makeCodeSvgData;
declare const index_makeCodeText: typeof makeCodeText;
declare const index_suspiciousMojibakePatterns: typeof suspiciousMojibakePatterns;
declare const index_validateSlide: typeof validateSlide;
declare namespace index {
  export { index_SPACING as SPACING, index_buildThemeMap as buildThemeMap, index_containsMojibake as containsMojibake, index_findMojibakeMatches as findMojibakeMatches, index_makeCodeLineRuns as makeCodeLineRuns, index_makeCodeLines as makeCodeLines, index_makeCodeRuns as makeCodeRuns, index_makeCodeSvgData as makeCodeSvgData, index_makeCodeText as makeCodeText, index_suspiciousMojibakePatterns as suspiciousMojibakePatterns, index_validateSlide as validateSlide };
}

interface RecordedShape {
    kind: "shape";
    shapeType: unknown;
    options: DrawOptions;
}
interface RecordedText {
    kind: "text";
    text: SlideText;
    options: DrawOptions;
}
interface RecordedImage {
    kind: "image";
    options: Record<string, unknown>;
}
type RecordedEntry = RecordedShape | RecordedText | RecordedImage;
declare class RecordingSlide implements SlideLike {
    background?: Record<string, unknown>;
    readonly shapes: RecordedShape[];
    readonly texts: RecordedText[];
    readonly images: RecordedImage[];
    addShape(shapeType: unknown, options: DrawOptions): RecordedShape;
    addText(text: SlideText, options?: DrawOptions): RecordedText;
    addImage(options: Record<string, unknown>): RecordedImage;
    getEntries(): RecordedEntry[];
}
declare function getEntryBounds(entry: {
    options: Record<string, unknown>;
}): Bounds;
declare function isBoxWithin(inner: Bounds, outer: Bounds, tolerance?: number): boolean;
declare function boxesIntersect(a: Bounds, b: Bounds, tolerance?: number): boolean;

export { type AccessibilityChecklistItem, type AccessibilityChecklistPanelOptions, type ActorLaneEntry, type ActorLaneOptions, type AgentOrchestrationDiagramOptions, type AgentReasoningLoopOptions, type AgenticFlowOptions, type AgenticFlowStep, type AnnotationTarget, type AtaxxBoardStateOptions, type AuditEvidenceBoardOptions, type AuditEvidenceItem, type AuditScoreItem, type AuditScorePanelOptions, type AuthFlowOptions, type AuthFlowStep, type BlueprintEntity, type BlueprintRelation, type Bounds, type BoxModelDiagramOptions, type BreakpointDecisionPanelOptions, type BreakpointDecisionStage, type BrowserMockOptions, type CardOptions, type CascadeInspectorOptions, type CascadeInspectorRule, type CenterStatementOptions, type ChecklistGridEntry, type ChecklistGridOptions, type ChipOptions, type CodeAnnotationOptions, type CodePanelOptions, type ComponentConsistencyPanelOptions, type ComponentTreeNode, type ComponentTreeOptions, type ComponentVariant, type ComponentVariantBoardOptions, type ControlFlowPanelOptions, type CssRuleEntry, type CssRuleStackOptions, type DataTypesBoardCard, type DataTypesBoardOptions, type DebugEvidenceBoardOptions, type DebugEvidenceCard, type DecisionPipelinePanelOptions, type DecisionPipelineStage, type DelegationColumn, type DelegationSplitOptions, type DomMutationFlowOptions, type DomTreeNode, type DomTreePanelOptions, type DomTreeTone, type DrawOptions, type EntityRelationshipBlueprintOptions, type ErRelationshipOptions, type EvaluationRubricPanelOptions, type EvaluationRubricRow, type EventLoopDiagramOptions, type EventReactionPanelOptions, type EventReactionStage, type ExposureColumn, type ExposureCompareOptions, type FlexGridLayoutOptions, type FormField, type FormMockOptions, type FrameworkDecisionMatrixOptions, type FrameworkDecisionRow, type GameAiPanelOptions, type HeaderOptions, type IntelTimelineItem, type IntelTimelinePanelOptions, type IssuePriorityItem, type IssuePriorityMatrixOptions, type JoinSetDiagramOptions, type JoinSetDiagramType, type JsonPanelOptions, type LayerStackOptions, type LighthouseAuditCardOptions, type LighthouseScore, type MarkBoxOptions, type McpBridgePanelOptions, type MctsSearchPanelOptions, type MiniCardOptions, type ModelGenerationTableOptions, type MoveAnatomyPanelOptions, type MythRealityEntry, type MythRealityGridOptions, type NetworkLoadBoardOptions, type NetworkResourceItem, type NormalizationStage, type NormalizationStepperOptions, type PerformanceMetricItem, type PerformanceMetricsBoardOptions, type PillOptions, type PolicyValueArchitectureOptions, type PositionedBox, type PowerNetworkCenter, type PowerNetworkMapOptions, type PowerNetworkNode, type PptxLike, type ProjectWorkflowPanelOptions, type ProjectWorkflowStage, type PromptQualityCompareOptions, type QualityDimension, type QualityDimensionsPanelOptions, type RecordedEntry, type RecordedImage, type RecordedShape, type RecordedText, RecordingSlide, type RequestResponseFlowOptions, type ResponsiveReflowPanelOptions, type ResponsiveReflowStage, type ResponsiveViewportCompareOptions, type RestResourceOptions, SPACING, type ScoreBoostItem, type ScoreBoostsAndPenaltiesOptions, type SelfPlayLoopPanelOptions, type SeoSnippetPreviewOptions, type ServerCycleOptions, type ShapeCatalog, type SlideLike, type SlideNumberOptions, type SlideText, type SpecWorkflowOptions, type SpecWorkflowPhase, type SpecificityScaleEntry, type SpecificityScaleOptions, type SpreadsheetProblemCallout, type SpreadsheetProblemHighlight, type SpreadsheetProblemPanelOptions, type SqlBridgePanelOptions, type SqlBridgeTableChip, type StageChainNote, type StageChainOptions, type StageChainStage, type StaticVsInteractiveCompareOptions, type SupabaseProjectSetupPanelOptions, type SupabaseTableEditorColumn, type SupabaseTableEditorPanelOptions, type SyntaxCompareOptions, TOKENS, TYPOGRAPHY, type TableSchemaColumn, type TableSchemaOptions, type TerminalLine, type TerminalPanelOptions, type TextRun, type TextRunOptions, type ThemeMeta, type ThemeTokens, type TokenBoardGroup, type TokenBoardItem, type TokenBoardOptions, type ToolExecutionConsoleOptions, type TournamentRulesPanelOptions, type TypographyScale, type UrlBreakdownOptions, type UrlBreakdownSegment, type ValidationLayer, type ValidationLayerRadarOptions, type ViewportCardDescriptor, addAccessibilityChecklistPanel, addActorLane, addAgentOrchestrationDiagram, addAgentReasoningLoop, addAgenticFlow, addAtaxxBoardState, addAuditEvidenceBoard, addAuditScorePanel, addAuthFlow, addBoxModelDiagram, addBreakpointDecisionPanel, addBrowserMock, addCard, addCascadeInspector, addCenterStatement, addChecklistGrid, addChip, addCodeAnnotation, addCodePanel, addComponentConsistencyPanel, addComponentTree, addComponentVariantBoard, addControlFlowPanel, addCssRuleStack, addDataTypesBoard, addDebugEvidenceBoard, addDecisionPipelinePanel, addDelegationSplit, addDomMutationFlow, addDomTreePanel, addEntityRelationshipBlueprint, addErRelationship, addEvaluationRubricPanel, addEventLoopDiagram, addEventReactionPanel, addExposureCompare, addFlexGridLayout, addFormMock, addFrameworkDecisionMatrix, addHeader, addIntelTimelinePanel, addIssuePriorityMatrix, addJoinSetDiagram, addJsonPanel, addLayerStack, addLighthouseAuditCard, addMarkBox, addMcpBridgePanel, addMctsSearchPanel, addMiniCard, addModelGenerationTable, addMoveAnatomyPanel, addMythRealityGrid, addNetworkLoadBoard, addNormalizationStepper, addPerformanceMetricsBoard, addPill, addPolicyValueArchitecture, addPowerNetworkMap, addProjectWorkflowPanel, addPromptQualityCompare, addQualityDimensionsPanel, addRequestResponseFlow, addResponsiveReflowPanel, addResponsiveViewportCompare, addRestResource, addScoreBoostsAndPenalties, addSelfPlayLoopPanel, addSeoSnippetPreview, addServerCycle, addSlideNumber, addSpecWorkflow, addSpecificityScale, addSpreadsheetProblemPanel, addSqlBridgePanel, addStageChain, addStaticVsInteractiveCompare, addSupabaseProjectSetupPanel, addSupabaseTableEditorPanel, addSyntaxCompare, addTableSchema, addTerminalPanel, addTokenBoard, addToolExecutionConsole, addTopRule, addTournamentRulesPanel, addUrlBreakdown, addValidationLayerRadar, applyAiepTheme, boxesIntersect, buildThemeMap, index$1 as components, containsMojibake, findMojibakeMatches, getEntryBounds, isBoxWithin, makeCodeLineRuns, makeCodeLines, makeCodeRuns, makeCodeSvgData, makeCodeText, setBackground, suspiciousMojibakePatterns, index$2 as theme, index as utils, validateSlide };
