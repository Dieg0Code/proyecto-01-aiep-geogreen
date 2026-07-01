"""Vectorize the AIEP logo into silkscreen polygons.

Silkscreen is a single colour, so the coloured logo is flattened to a black/white
silhouette and traced into filled polygons (with holes for letter counters). The
output JSON is consumed by ../create_v1_product_board.py to draw the logo on the
F.Silkscreen layer, the way a real board carries a printed logo.

Run:  uv run --with opencv-python-headless --with numpy python brand/vectorize_logo.py
"""
import json
import os

import cv2
import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "logo-aiep-source.png")
OUT = os.path.join(HERE, "logo_silk.json")

TARGET_W_MM = 22.0   # logo width on the board silkscreen
UPSCALE = 6          # supersample before threshold for smoother contours
EPSILON_PX = 1.2     # contour simplification tolerance (in upscaled px)


def main():
    img = cv2.imread(SRC, cv2.IMREAD_UNCHANGED)
    if img is None:
        raise SystemExit(f"cannot read {SRC}")
    # Flatten onto white using alpha if present.
    if img.shape[2] == 4:
        alpha = img[:, :, 3:4].astype(np.float32) / 255.0
        rgb = img[:, :, :3].astype(np.float32)
        white = np.full_like(rgb, 255.0)
        flat = (rgb * alpha + white * (1 - alpha)).astype(np.uint8)
    else:
        flat = img[:, :, :3]
    gray = cv2.cvtColor(flat, cv2.COLOR_BGR2GRAY)
    up = cv2.resize(gray, None, fx=UPSCALE, fy=UPSCALE, interpolation=cv2.INTER_CUBIC)
    # Shapes (dark ink) -> 255, background (white) -> 0.
    _, mask = cv2.threshold(up, 180, 255, cv2.THRESH_BINARY_INV)

    contours, hierarchy = cv2.findContours(
        mask, cv2.RETR_CCOMP, cv2.CHAIN_APPROX_SIMPLE
    )
    if hierarchy is None or not contours:
        raise SystemExit(
            "no contours found: check the source logo and threshold in this script"
        )
    hierarchy = hierarchy[0]

    h, w = mask.shape
    scale = TARGET_W_MM / w        # px -> mm
    cx, cy = w / 2.0, h / 2.0      # center the logo on the origin

    def to_mm(pts):
        out = []
        for p in pts:
            x, y = p[0]
            out.append([round((x - cx) * scale, 4), round((y - cy) * scale, 4)])
        return out

    shapes = []
    for i, cnt in enumerate(contours):
        if hierarchy[i][3] != -1:
            continue  # this is a hole; handled with its parent
        if cv2.contourArea(cnt) < 4:
            continue
        outline = cv2.approxPolyDP(cnt, EPSILON_PX, True)
        if len(outline) < 3:
            continue
        holes = []
        child = hierarchy[i][2]
        while child != -1:
            hc = contours[child]
            if cv2.contourArea(hc) >= 4:
                hp = cv2.approxPolyDP(hc, EPSILON_PX, True)
                if len(hp) >= 3:
                    holes.append(to_mm(hp))
            child = hierarchy[child][0]
        shapes.append({"outline": to_mm(outline), "holes": holes})

    meta = {"width_mm": TARGET_W_MM, "height_mm": round(h * scale, 4), "shapes": shapes}
    with open(OUT, "w") as f:
        json.dump(meta, f)
    print(f"wrote {OUT}: {len(shapes)} shapes, {meta['height_mm']} mm tall")


if __name__ == "__main__":
    main()
