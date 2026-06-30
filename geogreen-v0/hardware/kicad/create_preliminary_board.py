import pcbnew

MM = 1_000_000
FP_ROOT = r"C:\Program Files\KiCad\10.0\share\kicad\footprints"
LIBS = {
    "Connector_PinSocket_2.54mm": FP_ROOT + r"\Connector_PinSocket_2.54mm.pretty",
    "MountingHole": FP_ROOT + r"\MountingHole.pretty",
    "Resistor_THT": FP_ROOT + r"\Resistor_THT.pretty",
    "TestPoint": FP_ROOT + r"\TestPoint.pretty",
}


def mm(v):
    return int(round(v * MM))


def pt(x, y):
    return pcbnew.VECTOR2I(mm(x), mm(y))


def text(board, s, x, y, size=1.0):
    t = pcbnew.PCB_TEXT(board)
    t.SetText(s)
    t.SetPosition(pt(x, y))
    t.SetLayer(pcbnew.F_SilkS)
    t.SetTextSize(pcbnew.VECTOR2I(mm(size), mm(size)))
    t.SetTextThickness(mm(size * 0.14))
    t.SetHorizJustify(pcbnew.GR_TEXT_H_ALIGN_CENTER)
    t.SetVertJustify(pcbnew.GR_TEXT_V_ALIGN_CENTER)
    board.Add(t)


def line(board, x1, y1, x2, y2, layer, width=0.1):
    item = pcbnew.PCB_SHAPE(board)
    item.SetShape(pcbnew.SHAPE_T_SEGMENT)
    item.SetStart(pt(x1, y1))
    item.SetEnd(pt(x2, y2))
    item.SetLayer(layer)
    item.SetWidth(mm(width))
    board.Add(item)


def rect(board, x1, y1, x2, y2, layer, width=0.12):
    line(board, x1, y1, x2, y1, layer, width)
    line(board, x2, y1, x2, y2, layer, width)
    line(board, x2, y2, x1, y2, layer, width)
    line(board, x1, y2, x1, y1, layer, width)


def fp(board, lib, name, ref, value, x, y):
    item = pcbnew.FootprintLoad(LIBS[lib], name)
    if item is None:
        raise RuntimeError(f"missing footprint {lib}:{name}")
    item.SetReference(ref)
    item.SetValue(value)
    item.SetPosition(pt(x, y))
    board.Add(item)
    return item


def net(board, name):
    n = pcbnew.NETINFO_ITEM(board, name)
    board.Add(n)
    return n


def pad_net(item, pad, n):
    p = item.FindPadByNumber(str(pad))
    if p is None:
        raise RuntimeError(f"missing pad {pad} on {item.GetReference()}")
    p.SetNet(n)


def track(board, x1, y1, x2, y2, n, layer=pcbnew.F_Cu, width=0.35):
    tr = pcbnew.PCB_TRACK(board)
    tr.SetStart(pt(x1, y1))
    tr.SetEnd(pt(x2, y2))
    tr.SetWidth(mm(width))
    tr.SetLayer(layer)
    tr.SetNet(n)
    board.Add(tr)


board = pcbnew.BOARD()
board.SetCopperLayerCount(2)

gnd = net(board, "GND")
v3 = net(board, "3V3")
uart = net(board, "UART_RX_GPIO16")
pull = net(board, "SENSOR_RX_PULLUP")

rect(board, 5, 5, 80, 60, pcbnew.Edge_Cuts, 0.1)
rect(board, 20, 8, 52, 54, pcbnew.F_SilkS)
rect(board, 20, 8.5, 52, 16.5, pcbnew.F_SilkS)

j1 = fp(board, "Connector_PinSocket_2.54mm", "PinSocket_1x15_P2.54mm_Vertical", "J1", "ESP32_LEFT_PROVISIONAL", 22.86, 10)
j2 = fp(board, "Connector_PinSocket_2.54mm", "PinSocket_1x15_P2.54mm_Vertical", "J2", "ESP32_RIGHT_PROVISIONAL", 48.26, 10)
pad_net(j2, 1, v3)
pad_net(j2, 2, gnd)
pad_net(j2, 6, uart)

j3 = fp(board, "Connector_PinSocket_2.54mm", "PinSocket_1x04_P2.54mm_Vertical", "J3", "A02YYUW_SENSOR", 69, 20)
pad_net(j3, 1, v3)
pad_net(j3, 2, gnd)
pad_net(j3, 3, uart)
pad_net(j3, 4, pull)

r1 = fp(board, "Resistor_THT", "R_Axial_DIN0207_L6.3mm_D2.5mm_P7.62mm_Horizontal", "R1", "10k", 60.5, 35)
pad_net(r1, 1, v3)
pad_net(r1, 2, pull)

for ref, value, x, y, n in [
    ("TP1", "UART_RX", 74, 25.08, uart),
    ("TP2", "GND", 74, 22.54, gnd),
    ("TP3", "3V3", 57.5, 35, v3),
]:
    t = fp(board, "TestPoint", "TestPoint_THTPad_D1.5mm_Drill0.7mm", ref, value, x, y)
    pad_net(t, 1, n)

for ref, x, y in [("H1", 10, 10), ("H2", 75, 10), ("H3", 10, 55), ("H4", 75, 55)]:
    fp(board, "MountingHole", "MountingHole_2.2mm_M2", ref, "M2", x, y)

text(board, "ANTENNA KEEP-OUT\nVERIFY REAL BOARD", 36, 12.5)
text(board, "GeoGreen V0.1", 42.5, 57, 1.6)
text(board, "PRELIMINARY - VERIFY ESP32 FOOTPRINT", 42.5, 6.4, 0.8)
text(board, "SENSOR\nVCC GND TX RX", 69, 15)
text(board, "TP: 3V3 / GND / RX", 66, 42)
text(board, "USB ->", 36, 52.5)

track(board, 48.26, 10, 69, 20, v3)
track(board, 48.26, 12.54, 69, 22.54, gnd)
track(board, 48.26, 22.7, 69, 25.08, uart)
track(board, 69, 27.62, 68.12, 35, pull, width=0.3)
track(board, 60.5, 35, 69, 20, v3, pcbnew.B_Cu, 0.3)
track(board, 69, 25.08, 74, 25.08, uart, width=0.25)
track(board, 69, 22.54, 74, 22.54, gnd, width=0.25)
track(board, 57.5, 35, 60.5, 35, v3, width=0.25)

pcbnew.SaveBoard("geogreen-v0.kicad_pcb", board)
