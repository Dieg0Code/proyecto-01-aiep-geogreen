import cadquery as cq


def export_esp32_c6(path: str) -> None:
    # ESP32-C6-MINI-1 datasheet footprint envelope is 13.2 x 16.6 mm.
    module = (
        cq.Workplane("XY")
        .box(13.2, 16.6, 1.0)
        .faces(">Z")
        .workplane()
        .center(0, 1.2)
        .box(9.8, 9.0, 1.0)
    )
    antenna = (
        cq.Workplane("XY")
        .center(0, 6.2)
        .box(12.4, 3.8, 0.35)
        .translate((0, 0, 1.0))
    )
    body = module.union(antenna)
    cq.exporters.export(body, path)


def export_m8_4pin(path: str) -> None:
    # Simplified right-angle M8 panel/PCB sensor connector volume.
    shell = cq.Workplane("YZ").circle(4.0).extrude(14.0).translate((-14.0, 0, 3.6))
    rear = cq.Workplane("XY").box(12.0, 10.0, 6.5).translate((-3.8, 0, 3.25))
    flange = cq.Workplane("XY").box(18.0, 12.0, 1.8).translate((-8.0, 0, 1.0))
    pins = cq.Workplane("XY")
    for x, y in [(-2.0, -2.0), (-2.0, 2.0), (2.0, -2.0), (2.0, 2.0)]:
        pins = pins.union(cq.Workplane("XY").center(x, y).circle(0.45).extrude(5.5))
    body = shell.union(rear).union(flange).union(pins)
    cq.exporters.export(body, path)


if __name__ == "__main__":
    export_esp32_c6("models/ESP32-C6-MINI-1-simple.step")
    export_m8_4pin("models/M8-4pin-IP67-simple.step")

