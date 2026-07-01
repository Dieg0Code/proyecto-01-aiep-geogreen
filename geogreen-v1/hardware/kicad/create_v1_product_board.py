import json
import os
from pathlib import Path

import pcbnew

MM = 1_000_000

# Run from anywhere: anchor file I/O to this script's directory, not the cwd.
HERE = Path(__file__).resolve().parent

# Resolve the KiCad footprint root from the environment so this works on any
# install / OS / KiCad version, falling back to the default Windows path.
FP_ROOT = (
    os.environ.get("KICAD10_FOOTPRINT_DIR")
    or os.environ.get("KICAD_FOOTPRINT_DIR")
    or r"C:\Program Files\KiCad\10.0\share\kicad\footprints"
)
if not os.path.isdir(FP_ROOT):
    raise SystemExit(
        f"KiCad footprint root not found: {FP_ROOT}\n"
        "Set KICAD10_FOOTPRINT_DIR to your KiCad 'footprints' folder."
    )
LIBS = {
    name: os.path.join(FP_ROOT, name + ".pretty")
    for name in [
        "RF_Module", "Connector_USB", "Connector_Amphenol", "Connector_JST",
        "Buzzer_Beeper", "Package_TO_SOT_SMD", "Fuse", "Diode_SMD",
        "Capacitor_SMD", "Resistor_SMD", "LED_SMD", "TestPoint", "MountingHole",
    ]
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


def add_silk_logo(board, json_path, cx, cy, layer=pcbnew.F_SilkS):
    """Draw a vectorized logo as filled silkscreen polygons (white on the board),
    the way a real PCB carries a printed logo. Letter counters are real holes."""
    with open(json_path) as f:
        data = json.load(f)
    # One PCB_SHAPE per glyph: a single PCB_SHAPE poly renders only one outline,
    # so each disjoint shape (with its letter counters as holes) gets its own.
    for shape in data["shapes"]:
        ps = pcbnew.SHAPE_POLY_SET()
        oi = ps.NewOutline()
        for x, y in shape["outline"]:
            ps.Append(mm(cx + x), mm(cy + y), oi)
        for hole in shape["holes"]:
            hi = ps.NewHole(oi)
            for x, y in hole:
                ps.Append(mm(cx + x), mm(cy + y), oi, hi)
        shp = pcbnew.PCB_SHAPE(board)
        shp.SetShape(pcbnew.SHAPE_T_POLY)
        shp.SetPolyShape(ps)
        shp.SetLayer(layer)
        shp.SetFilled(True)
        shp.SetWidth(0)
        board.Add(shp)


def pad_net(item, pad, n):
    for p in item.Pads():
        if p.GetNumber() == str(pad):
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
    t.SetTextThickness(mm(size * 0.15))
    t.SetTextAngleDegrees(rot)
    t.SetHorizJustify(pcbnew.GR_TEXT_H_ALIGN_CENTER)
    t.SetVertJustify(pcbnew.GR_TEXT_V_ALIGN_CENTER)
    board.Add(t)


def track(board, x1, y1, x2, y2, n, layer=pcbnew.F_Cu, width=0.35):
    tr = pcbnew.PCB_TRACK(board)
    tr.SetStart(pt(x1, y1))
    tr.SetEnd(pt(x2, y2))
    tr.SetLayer(layer)
    tr.SetWidth(mm(width))
    tr.SetNet(n)
    board.Add(tr)


def ground_zone(board, layer, net_item, outline, holes=()):
    """Add a filled copper pour (ground plane) on a layer, with optional holes
    (e.g. the RF antenna keep-out, which must stay copper-free)."""
    z = pcbnew.ZONE(board)
    z.SetLayer(layer)
    z.SetNetCode(net_item.GetNetCode())
    z.SetAssignedPriority(0)
    z.SetLocalClearance(mm(0.3))
    z.SetMinThickness(mm(0.25))
    poly = z.Outline()
    poly.NewOutline()
    for x, y in outline:
        poly.Append(mm(x), mm(y))
    for hole in holes:
        hi = poly.NewHole()
        for x, y in hole:
            poly.Append(mm(x), mm(y), 0, hi)
    board.Add(z)
    return z


board = pcbnew.BOARD()
board.SetCopperLayerCount(2)
settings = board.GetDesignSettings()
settings.m_HoleClearance = mm(0.15)
settings.m_CopperEdgeClearance = mm(0.3)

gnd = net(board, "GND")
vbus = net(board, "VBUS_USB")
v5 = net(board, "5V_PROTECTED")
v3 = net(board, "3V3")
uart_rx = net(board, "SENSOR_UART_RX")
sensor_rx = net(board, "SENSOR_RX_PULLUP")
led_r = net(board, "LED_R")
led_g = net(board, "LED_G")
led_b = net(board, "LED_B")
lr_a = net(board, "LED_R_ANODE")
lg_a = net(board, "LED_G_ANODE")
lb_a = net(board, "LED_B_ANODE")
buzz = net(board, "BUZZER_OUT")
en_net = net(board, "EN")
boot_net = net(board, "BOOT_IO0")
cc1 = net(board, "USB_CC1")
cc2 = net(board, "USB_CC2")

# ---------------------------------------------------------------------------
# Board outline. Compact sealed lid module, with generous component spacing so
# the silkscreen labels never collide with parts in the 3D render.
# ---------------------------------------------------------------------------
rect(board, 4, 4, 96, 60, pcbnew.Edge_Cuts, 0.1)

# --- Mounting holes (corners) ---
for ref, x, y in [("H1", 9, 9), ("H2", 91, 9), ("H3", 9, 55), ("H4", 91, 55)]:
    fp(board, "MountingHole", "MountingHole_2.2mm_M2", ref, "M2", x, y)

# --- ESP32-C6 module + antenna keep-out (center-right) ---
U1_X = 60
U1_Y = 36
KO = (U1_X - 21.6, U1_Y - 26.0, U1_X + 21.6, U1_Y - 5.6)
rect(board, *KO, pcbnew.Cmts_User, 0.15)
text(board, "ANTENNA KEEP-OUT", U1_X, U1_Y - 23.0, 0.9, layer=pcbnew.Cmts_User)
u1 = fp(board, "RF_Module", "ESP32-C6-MINI-1", "U1", "ESP32-C6-MINI-1", U1_X, U1_Y)
u1.Models().clear()
# Official Espressif ESP32-C6-MINI-1 STEP (colored: green PCB + metal shield).
# Source: github.com/espressif/kicad-libraries -> 3dmodels/espressif.3dshapes/
#   ESP32-C6-MINI-1.STEP  (envelope 13.2 x 16.6 mm, origin at a module corner).
# KiCad's footprint origin is the module center, so recenter by half the
# envelope; this offset is only valid for that specific corner-origin STEP.
add_model(u1, "models/ESP32-C6-MINI-1.step", offset=(-6.56, -8.30, 0))
text(board, "ESP32-C6-MINI-1", U1_X, U1_Y + 13, 0.95, layer=pcbnew.Cmts_User)

# --- Ultrasonic sensor input (left) ---
# A02YYUW is an external waterproof (IP67) ultrasonic sensor connected by a
# 4-wire cable; only its JST connector lives on the PCB. The sensor is not
# board-mounted, so it is not shown in the render.
# The A02YYUW ships with a PH2.0-4P cable (JST PH, 2.0 mm pitch, 4-pin:
# VCC / GND / TX / RX), so the board carries the mating JST-PH header.
sensor = fp(
    board, "Connector_JST", "JST_PH_B4B-PH-K_1x04_P2.00mm_Vertical",
    "J2", "A02YYUW_PH2.0", 13, 42, 0,
)
r3 = fp(board, "Resistor_SMD", "R_0603_1608Metric", "R3", "SENSOR_RX_10K", 24, 45)
text(board, "SENSOR A02YYUW", 15, 35, 0.9)
text(board, "IP67 CABLE PH2.0 4P", 16, 49, 0.8)
pad_net(sensor, 1, v3)
pad_net(sensor, 2, gnd)
pad_net(sensor, 3, uart_rx)
pad_net(sensor, 4, sensor_rx)

# --- USB-C power input + protection + 3V3 regulator (bottom-center) ---
usb = fp(
    board, "Connector_USB",
    "USB_C_Receptacle_GCT_USB4105-xx-A_16P_TopMnt_Horizontal",
    "J1", "USB-C", 26, 54, 180,
)
f1 = fp(board, "Fuse", "Fuse_1206_3216Metric", "F1", "PTC", 40, 50)
d1 = fp(board, "Diode_SMD", "D_SOD-323", "D1", "TVS", 46, 50)
c1 = fp(board, "Capacitor_SMD", "C_0805_2012Metric", "C1", "10uF", 52, 50)
u2 = fp(board, "Package_TO_SOT_SMD", "SOT-23-5", "U2", "3V3_REG", 60, 52)
c2 = fp(board, "Capacitor_SMD", "C_0805_2012Metric", "C2", "10uF", 68, 52)
r1 = fp(board, "Resistor_SMD", "R_0603_1608Metric", "R1", "CC1_5K1", 34, 45)
r2 = fp(board, "Resistor_SMD", "R_0603_1608Metric", "R2", "CC2_5K1", 34, 48)
text(board, "USB-C 5V", 24, 48, 0.8)
text(board, "PTC + TVS + 3V3", 58, 47, 0.8)

# --- Test / factory pads (center) ---
for ref, value, x, y, tpnet in [
    ("TP1", "3V3", 75, 42, v3),
    ("TP2", "GND", 80, 42, gnd),
    ("TP3", "UART_RX", 90, 44, uart_rx),
    ("TP4", "EN", 75, 50, en_net),
    ("TP5", "BOOT", 70, 47, boot_net),
]:
    tp = fp(board, "TestPoint", "TestPoint_THTPad_D1.5mm_Drill0.7mm", ref, value, x, y)
    pad_net(tp, 1, tpnet)
text(board, "FACTORY / TEST", 80, 46, 0.8)

# --- Semaforo RGB outputs (left, outside antenna keep-out) ---
text(board, "SEMAFORO RGB", 25, 11, 0.95)
d2 = fp(board, "LED_SMD", "LED_0805_2012Metric", "D2", "LED_R", 18, 16)
d3 = fp(board, "LED_SMD", "LED_0805_2012Metric", "D3", "LED_G", 25, 16)
d4 = fp(board, "LED_SMD", "LED_0805_2012Metric", "D4", "LED_B", 32, 16)
r4 = fp(board, "Resistor_SMD", "R_0603_1608Metric", "R4", "LED_R_1K", 18, 22)
r5 = fp(board, "Resistor_SMD", "R_0603_1608Metric", "R5", "LED_G_1K", 25, 22)
r6 = fp(board, "Resistor_SMD", "R_0603_1608Metric", "R6", "LED_B_1K", 32, 22)
rgb = fp(
    board, "Connector_JST", "JST_XH_B4B-XH-A_1x04_P2.50mm_Vertical",
    "J4", "RGB_SEMAFORO", 10, 25, 90,
)
text(board, "RGB", 10, 32, 0.8)

# --- CC resistors for USB-C ---
text(board, "CC 5K1", 31, 45, 0.8, layer=pcbnew.Cmts_User)

# --- Buzzer alert (right) ---
bz = fp(board, "Buzzer_Beeper", "Buzzer_12x9.5RM7.6", "BZ1", "BUZZER", 84, 36)
text(board, "BUZZER", 84, 26, 0.85)

# --- Branding ---
text(board, "GeoGreen", 21, 6.5, 1.8)
text(board, "SMART BIN FILL MONITOR", 66, 6, 0.8)
text(board, "V1.0", 21, 9.6, 0.9)

# ---------------------------------------------------------------------------
# Full netlist. Concrete ESP32-C6-MINI-1 pin mapping (per Espressif datasheet
# pad numbers): 3=3V3; 1,2,11,14,36-48,50-53,49(EPAD)=GND; 8=EN; 12=IO0/BOOT;
# 9=IO4, 10=IO5 (sensor UART, routed via the GPIO matrix); 24=IO18, 25=IO19,
# 26=IO20 (RGB); 29=IO23 (buzzer). The board is autorouted from this netlist.
# ---------------------------------------------------------------------------
# Power in: USB-C -> PTC -> TVS -> 3V3 regulator.
for pad in ["A4", "A9", "B4", "B9"]:
    pad_net(usb, pad, vbus)
for pad in ["A1", "A12", "B1", "B12", "S1", "S2", "S3", "S4"]:
    pad_net(usb, pad, gnd)
pad_net(usb, "A5", cc1)
pad_net(usb, "B5", cc2)
pad_net(r1, 1, cc1)
pad_net(r1, 2, gnd)
pad_net(r2, 1, cc2)
pad_net(r2, 2, gnd)
pad_net(f1, 1, vbus)
pad_net(f1, 2, v5)
pad_net(d1, 1, vbus)
pad_net(d1, 2, gnd)
pad_net(u2, 1, v5)
pad_net(u2, 2, gnd)
pad_net(u2, 5, v3)
pad_net(c1, 1, v5)
pad_net(c1, 2, gnd)
pad_net(c2, 1, v3)
pad_net(c2, 2, gnd)

# ESP32-C6 module.
pad_net(u1, 3, v3)
for gpad in [1, 2, 11, 14, 49, 50, 51, 52, 53] + list(range(36, 49)):
    pad_net(u1, gpad, gnd)
pad_net(u1, 8, en_net)
pad_net(u1, 12, boot_net)
pad_net(u1, 9, uart_rx)
pad_net(u1, 10, sensor_rx)
pad_net(u1, 24, led_r)
pad_net(u1, 25, led_g)
pad_net(u1, 26, led_b)
pad_net(u1, 29, buzz)

# Sensor connector + RX pull-up.
pad_net(r3, 1, v3)
pad_net(r3, 2, uart_rx)

# Semaforo: GPIO -> series resistor -> LED anode -> GND, mirrored on J4 header.
pad_net(r4, 1, led_r)
pad_net(r4, 2, lr_a)
pad_net(r5, 1, led_g)
pad_net(r5, 2, lg_a)
pad_net(r6, 1, led_b)
pad_net(r6, 2, lb_a)
pad_net(d2, 2, lr_a)
pad_net(d2, 1, gnd)
pad_net(d3, 2, lg_a)
pad_net(d3, 1, gnd)
pad_net(d4, 2, lb_a)
pad_net(d4, 1, gnd)
pad_net(rgb, 1, v3)
pad_net(rgb, 2, led_r)
pad_net(rgb, 3, led_g)
pad_net(rgb, 4, led_b)

# Buzzer.
pad_net(bz, 1, buzz)
pad_net(bz, 2, gnd)

# Ground pours on both layers (solid ground plane). The RF antenna keep-out is
# punched out so no copper sits under the ESP32-C6 antenna.
board_outline = [(4.5, 4.5), (95.5, 4.5), (95.5, 59.5), (4.5, 59.5)]
antenna_hole = [(KO[0], KO[1]), (KO[2], KO[1]), (KO[2], KO[3]), (KO[0], KO[3])]
ground_zone(board, pcbnew.F_Cu, gnd, board_outline, [antenna_hole])
ground_zone(board, pcbnew.B_Cu, gnd, board_outline, [antenna_hole])

# Concept render: hide reference designators so only the descriptive silk labels
# and branding read cleanly. A fab-ready board would keep references visible.
for footprint in board.GetFootprints():
    footprint.Reference().SetVisible(False)
    footprint.Value().SetVisible(False)

# Do not fill zones from pcbnew Python here. KiCad 10 on Windows can crash in
# ZONE_FILLER.Fill() for this generated board. The zones are saved unfilled and
# KiCad/DRC/render can refill them from the PCB editor or CLI in a separate step.

pcbnew.SaveBoard(str(HERE / "geogreen-v1.kicad_pcb"), board)
