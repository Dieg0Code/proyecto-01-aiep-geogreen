import pcbnew

MM = 1_000_000
FP_ROOT = r"C:\Program Files\KiCad\10.0\share\kicad\footprints"
LIBS = {
    "RF_Module": FP_ROOT + r"\RF_Module.pretty",
    "Connector_USB": FP_ROOT + r"\Connector_USB.pretty",
    "Connector_Amphenol": FP_ROOT + r"\Connector_Amphenol.pretty",
    "Connector_JST": FP_ROOT + r"\Connector_JST.pretty",
    "Buzzer_Beeper": FP_ROOT + r"\Buzzer_Beeper.pretty",
    "Package_TO_SOT_SMD": FP_ROOT + r"\Package_TO_SOT_SMD.pretty",
    "Fuse": FP_ROOT + r"\Fuse.pretty",
    "Diode_SMD": FP_ROOT + r"\Diode_SMD.pretty",
    "Capacitor_SMD": FP_ROOT + r"\Capacitor_SMD.pretty",
    "Resistor_SMD": FP_ROOT + r"\Resistor_SMD.pretty",
    "LED_SMD": FP_ROOT + r"\LED_SMD.pretty",
    "TestPoint": FP_ROOT + r"\TestPoint.pretty",
    "MountingHole": FP_ROOT + r"\MountingHole.pretty",
}


def mm(v):
    return int(round(v * MM))


def pt(x, y):
    return pcbnew.VECTOR2I(mm(x), mm(y))


def net(board, name):
    n = pcbnew.NETINFO_ITEM(board, name)
    board.Add(n)
    return n


def fp(board, lib, name, ref, value, x, y, rot=0):
    item = pcbnew.FootprintLoad(LIBS[lib], name)
    if item is None:
        raise RuntimeError(f"missing footprint {lib}:{name}")
    item.SetReference(ref)
    item.SetValue(value)
    item.SetPosition(pt(x, y))
    item.SetOrientationDegrees(rot)
    board.Add(item)
    return item


def add_model(item, filename, scale=(1, 1, 1), offset=(0, 0, 0), rotation=(0, 0, 0)):
    model = pcbnew.FP_3DMODEL()
    model.m_Filename = filename
    model.m_Scale = pcbnew.VECTOR3D(*scale)
    model.m_Offset = pcbnew.VECTOR3D(*offset)
    model.m_Rotation = pcbnew.VECTOR3D(*rotation)
    item.Add3DModel(model)


def m8_4pin_footprint(board, ref, value):
    item = pcbnew.FOOTPRINT(board)
    item.SetReference(ref)
    item.SetValue(value)
    item.SetAttributes(pcbnew.FP_THROUGH_HOLE)
    for number, x, y in [("1", -2, -2), ("2", -2, 2), ("3", 2, -2), ("4", 2, 2)]:
        pad = pcbnew.PAD(item)
        pad.SetNumber(number)
        pad.SetAttribute(pcbnew.PAD_ATTRIB_PTH)
        pad.SetShape(pcbnew.PAD_SHAPE_CIRCLE)
        pad.SetPosition(pt(x, y))
        pad.SetSize(pcbnew.VECTOR2I(mm(1.7), mm(1.7)))
        pad.SetDrillSize(pcbnew.VECTOR2I(mm(0.9), mm(0.9)))
        pad.SetLayerSet(pcbnew.LSET.AllCuMask())
        item.Add(pad)
    for number, x, y in [("M1", -6, 0), ("M2", 6, 0)]:
        pad = pcbnew.PAD(item)
        pad.SetNumber(number)
        pad.SetAttribute(pcbnew.PAD_ATTRIB_NPTH)
        pad.SetShape(pcbnew.PAD_SHAPE_CIRCLE)
        pad.SetPosition(pt(x, y))
        pad.SetSize(pcbnew.VECTOR2I(mm(3.2), mm(3.2)))
        pad.SetDrillSize(pcbnew.VECTOR2I(mm(3.2), mm(3.2)))
        pad.SetLayerSet(pcbnew.LSET.AllCuMask())
        item.Add(pad)
    add_model(item, "models/M8-4pin-IP67-simple.step")
    return item


def pad_net(item, pad, n):
    p = item.FindPadByNumber(str(pad))
    if p is not None:
        p.SetNet(n)


def line(board, x1, y1, x2, y2, layer, width=0.12):
    s = pcbnew.PCB_SHAPE(board)
    s.SetShape(pcbnew.SHAPE_T_SEGMENT)
    s.SetStart(pt(x1, y1))
    s.SetEnd(pt(x2, y2))
    s.SetLayer(layer)
    s.SetWidth(mm(width))
    board.Add(s)


def rect(board, x1, y1, x2, y2, layer, width=0.12):
    line(board, x1, y1, x2, y1, layer, width)
    line(board, x2, y1, x2, y2, layer, width)
    line(board, x2, y2, x1, y2, layer, width)
    line(board, x1, y2, x1, y1, layer, width)


def text(board, s, x, y, size=1.0, rot=0, layer=pcbnew.F_SilkS):
    t = pcbnew.PCB_TEXT(board)
    t.SetText(s)
    t.SetPosition(pt(x, y))
    t.SetLayer(layer)
    t.SetTextSize(pcbnew.VECTOR2I(mm(size), mm(size)))
    t.SetTextThickness(mm(size * 0.14))
    t.SetTextAngleDegrees(rot)
    t.SetHorizJustify(pcbnew.GR_TEXT_H_ALIGN_CENTER)
    t.SetVertJustify(pcbnew.GR_TEXT_V_ALIGN_CENTER)
    board.Add(t)


def track(board, x1, y1, x2, y2, n, layer=pcbnew.F_Cu, width=0.25):
    tr = pcbnew.PCB_TRACK(board)
    tr.SetStart(pt(x1, y1))
    tr.SetEnd(pt(x2, y2))
    tr.SetLayer(layer)
    tr.SetWidth(mm(width))
    tr.SetNet(n)
    board.Add(tr)


board = pcbnew.BOARD()
board.SetCopperLayerCount(2)

gnd = net(board, "GND")
vbus = net(board, "VBUS_USB")
v5 = net(board, "5V_PROTECTED")
v3 = net(board, "3V3")
usb_dp = net(board, "USB_D+")
usb_dm = net(board, "USB_D-")
uart_rx = net(board, "SENSOR_UART_RX")
sensor_rx = net(board, "SENSOR_RX_PULLUP")
led_r = net(board, "LED_R")
led_g = net(board, "LED_G")
led_b = net(board, "LED_B")
buzz = net(board, "BUZZER_OUT")

# Product-like compact board, intended for a sealed lid module.
rect(board, 5, 5, 90, 62, pcbnew.Edge_Cuts, 0.1)
rect(board, 10, 10, 38, 26, pcbnew.F_SilkS, 0.12)
text(board, "ANTENNA\nKEEP-OUT", 24, 18, 1.1)
text(board, "GeoGreen V1", 47.5, 58.5, 1.8)
text(board, "PRODUCT PCB CONCEPT - NOT FAB READY", 47.5, 7.5, 0.9)

u1 = fp(board, "RF_Module", "ESP32-C6-MINI-1", "U1", "ESP32-C6-MINI-1", 43, 24)
u1.Models().clear()
add_model(
    u1,
    "models/ESP32-C6-MINI-1-simple.step",
)
usb = fp(board, "Connector_USB", "USB_C_Receptacle_GCT_USB4105-xx-A_16P_TopMnt_Horizontal", "J1", "USB-C", 47.5, 56, 180)
f1 = fp(board, "Fuse", "Fuse_1206_3216Metric", "F1", "PTC_USB", 57, 51)
d1 = fp(board, "Diode_SMD", "D_SOD-323", "D1", "TVS_USB", 37, 51)
u2 = fp(board, "Package_TO_SOT_SMD", "SOT-23-5", "U2", "3V3_REG_TODO", 64, 45)
c1 = fp(board, "Capacitor_SMD", "C_0805_2012Metric", "C1", "10uF", 60, 42)
c2 = fp(board, "Capacitor_SMD", "C_0805_2012Metric", "C2", "10uF", 69, 42)

sensor_ip = m8_4pin_footprint(board, "J2", "M8_4PIN_IP67_SENSOR")
sensor_ip.SetPosition(pt(15, 42))
sensor_ip.SetOrientationDegrees(90)
board.Add(sensor_ip)
pad_net(sensor_ip, 1, v3)
pad_net(sensor_ip, 2, gnd)
pad_net(sensor_ip, 3, uart_rx)
pad_net(sensor_ip, 4, sensor_rx)
sensor_dbg = fp(board, "Connector_JST", "JST_XH_B4B-XH-A_1x04_P2.50mm_Vertical", "J3", "A02YYUW_4WIRE", 28, 52)
rgb = fp(board, "Connector_JST", "JST_XH_B4B-XH-A_1x04_P2.50mm_Vertical", "J4", "RGB_SEMAFORO", 78, 22, 90)
bz = fp(board, "Buzzer_Beeper", "Buzzer_12x9.5RM7.6", "BZ1", "BUZZER", 76, 44)

for i, (ref, value, x, y) in enumerate([
    ("D2", "LED_R", 65, 14),
    ("D3", "LED_G", 70, 14),
    ("D4", "LED_B", 75, 14),
]):
    fp(board, "LED_SMD", "LED_0805_2012Metric", ref, value, x, y)

for ref, value, x, y in [
    ("R1", "CC1_5K1", 39, 47),
    ("R2", "CC2_5K1", 43, 47),
    ("R3", "SENSOR_RX_10K", 30, 39),
    ("R4", "LED_R_LIMIT", 65, 18),
    ("R5", "LED_G_LIMIT", 70, 18),
    ("R6", "LED_B_LIMIT", 75, 18),
]:
    fp(board, "Resistor_SMD", "R_0603_1608Metric", ref, value, x, y)

for ref, value, x, y in [
    ("TP1", "3V3", 54, 35),
    ("TP2", "GND", 58, 35),
    ("TP3", "UART_RX", 32, 35),
    ("TP4", "EN", 47, 35),
    ("TP5", "BOOT", 43, 35),
]:
    fp(board, "TestPoint", "TestPoint_THTPad_D1.5mm_Drill0.7mm", ref, value, x, y)

for ref, x, y in [("H1", 9, 9), ("H2", 86, 9), ("H3", 9, 58), ("H4", 86, 58)]:
    fp(board, "MountingHole", "MountingHole_2.2mm_M2", ref, "M2", x, y)

# Nets for visually meaningful major blocks. Exact ESP32 pin mapping remains TODO.
for pad in ["A4", "A9", "B4", "B9"]:
    pad_net(usb, pad, vbus)
for pad in ["A1", "A12", "B1", "B12", "S1", "S2", "S3", "S4"]:
    pad_net(usb, pad, gnd)
pad_net(f1, 1, vbus)
pad_net(f1, 2, v5)
pad_net(u2, 1, v5)
pad_net(u2, 2, gnd)
pad_net(u2, 5, v3)
pad_net(c1, 1, v5)
pad_net(c1, 2, gnd)
pad_net(c2, 1, v3)
pad_net(c2, 2, gnd)
pad_net(sensor_dbg, 1, v3)
pad_net(sensor_dbg, 2, gnd)
pad_net(sensor_dbg, 3, uart_rx)
pad_net(sensor_dbg, 4, sensor_rx)
pad_net(rgb, 1, v3)
pad_net(rgb, 2, led_r)
pad_net(rgb, 3, led_g)
pad_net(rgb, 4, led_b)
pad_net(bz, 1, buzz)
pad_net(bz, 2, gnd)

track(board, 47.5, 52, 57, 51, vbus, width=0.45)
track(board, 57, 51, 64, 45, v5, width=0.45)
track(board, 64, 45, 60, 42, v5, width=0.35)
track(board, 64, 45, 69, 42, v3, width=0.35)
track(board, 28, 52, 32, 35, uart_rx, width=0.25)
track(board, 28, 54.5, 30, 39, sensor_rx, width=0.25)
track(board, 78, 22, 75, 18, led_b, width=0.25)
track(board, 78, 24.5, 70, 18, led_g, width=0.25)
track(board, 78, 27, 65, 18, led_r, width=0.25)

text(board, "USB-C + PTC + TVS", 51, 49, 0.9)
text(board, "ESP32-C6\nsoldado", 43, 24, 1.0)
text(board, "SENSOR IP67\nTODO 4-wire", 15, 31, 0.9)
text(board, "A02YYUW fallback", 28, 58, 0.8)
text(board, "RGB / semaforo", 79, 13, 0.9)
text(board, "factory pads", 47, 39, 0.8)

pcbnew.SaveBoard("geogreen-v1.kicad_pcb", board)
