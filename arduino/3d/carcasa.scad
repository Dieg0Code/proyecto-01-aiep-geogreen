// ============================================================
//  GeoGreen - Carcasa de la maqueta (parametrico, OpenSCAD)
//  Caja-contenedor + tapa con huecos para el sensor HC-SR04,
//  el semaforo de 3 LEDs y el buzzer.
//
//  Render (vista ensamble):
//    openscad -o carcasa.png --viewall --autocenter carcasa.scad
//  Exportar piezas para imprimir:
//    openscad -D "parte=\"contenedor\"" -o contenedor.stl carcasa.scad
//    openscad -D "parte=\"tapa\""       -o tapa.stl       carcasa.scad
// ============================================================

parte = "ensamble";   // "contenedor" | "tapa" | "ensamble"

$fn = 72;

// --- Parametros del contenedor (mm) ---
ancho = 90;     // X
fondo = 90;     // Y
alto  = 120;    // altura
pared = 2.5;    // espesor de pared
tapa_h = 6;     // espesor de la tapa
holgura = 0.4;  // juego para que la tapa calce

// --- Sensor HC-SR04 ---
sep_ojos = 26;  // separacion entre centros de los transductores
d_ojo = 16.5;   // diametro de cada transductor

// --- LEDs del semaforo ---
d_led = 5.2;
sep_led = 12;

// --- Buzzer ---
d_buzzer = 12.5;

module contenedor() {
  difference() {
    cube([ancho, fondo, alto]);
    // hueco interior, abierto por arriba
    translate([pared, pared, pared])
      cube([ancho - 2*pared, fondo - 2*pared, alto]);
  }
}

module tapa() {
  union() {
    difference() {
      cube([ancho, fondo, tapa_h]);
      // dos "ojos" del sensor mirando hacia abajo, al centro
      translate([ancho/2 - sep_ojos/2, fondo/2, -1]) cylinder(h = tapa_h + 2, d = d_ojo);
      translate([ancho/2 + sep_ojos/2, fondo/2, -1]) cylinder(h = tapa_h + 2, d = d_ojo);
      // fila de 3 LEDs (semaforo)
      for (i = [-1, 0, 1])
        translate([ancho/2 + i*sep_led, fondo - 16, -1]) cylinder(h = tapa_h + 2, d = d_led);
      // buzzer
      translate([18, 18, -1]) cylinder(h = tapa_h + 2, d = d_buzzer);
    }
    // faldon interior para que la tapa encaje en el contenedor
    translate([pared + holgura, pared + holgura, -5])
      difference() {
        cube([ancho - 2*(pared + holgura), fondo - 2*(pared + holgura), 5]);
        translate([pared, pared, -1])
          cube([ancho - 2*(pared + holgura) - 2*pared,
                fondo - 2*(pared + holgura) - 2*pared, 7]);
      }
  }
}

if (parte == "contenedor") {
  contenedor();
} else if (parte == "tapa") {
  tapa();
} else {
  // vista ensamble (explosionada) para el render
  color("SeaGreen")  contenedor();
  color("Gainsboro") translate([0, 0, alto + 25]) tapa();
}
