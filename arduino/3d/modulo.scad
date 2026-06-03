// ============================================================
//  GeoGreen - MODULO clip-on para tapa de basurero (parametrico)
//  Caja sellada que se PEGA (adhesivo 3M) a la cara interior de
//  la tapa. El sensor HC-SR04 mira hacia abajo al contenido; no
//  requiere perforar ni fabricar basureros especiales.
//
//  Contenido: Arduino Nano + HC-SR04 + porta-pilas 3xAAA +
//  buzzer + 3 LEDs (semaforo) + interruptor.
//
//  Render del plano explosionado:
//    openscad -o modulo.png --viewall --autocenter modulo.scad
//  Exportar piezas para imprimir:
//    openscad -D "vista=\"base\"" -o modulo-base.stl modulo.scad
//    openscad -D "vista=\"tapa\"" -o modulo-tapa.stl modulo.scad
// ============================================================

vista = "ensamble";   // "ensamble" | "base" | "tapa"
E     = 22;           // separacion de la vista explosionada (0 = ensamblado)

$fn = 64;

// --- Dimensiones de la caja (mm) ---
LX = 72;    // largo interior
LY = 54;    // ancho interior
LZ = 34;    // alto interior
t  = 2.5;   // espesor de pared
tapa_t = 2.5;

// --- HC-SR04 ---
sr_pcb = [45, 20, 1.5];
sr_ojo_d = 16;
sr_ojo_sep = 26;
sr_ojo_h = 12;

// --- Componentes (proxies para el plano) ---
nano = [45, 18, 8];
bat  = [58, 24, 14];     // porta-pilas 3xAAA en linea
buzz_d = 12; buzz_h = 9;
led_d = 5;  led_sep = 11;
sw = [13, 7, 6];         // interruptor

// =================== PIEZAS IMPRIMIBLES ===================

module caja_base() {
  difference() {
    // cuerpo exterior
    cube([LX + 2*t, LY + 2*t, LZ + t]);
    // hueco interior
    translate([t, t, t]) cube([LX, LY, LZ + 1]);
    // dos "ojos" del sensor en el piso (miran hacia abajo)
    translate([(LX + 2*t)/2 - sr_ojo_sep/2, (LY + 2*t)/2, -1]) cylinder(h = t + 2, d = sr_ojo_d);
    translate([(LX + 2*t)/2 + sr_ojo_sep/2, (LY + 2*t)/2, -1]) cylinder(h = t + 2, d = sr_ojo_d);
    // hueco del interruptor en una pared corta
    translate([-1, (LY + 2*t)/2 - sw[1]/2, LZ - sw[2]]) cube([t + 2, sw[1], sw[2]]);
  }
  // postes para atornillar la tapa (embebidos 1mm en el piso -> solido unico)
  for (x = [t + 4, LX + t - 4], y = [t + 4, LY + t - 4])
    translate([x, y, t - 1]) difference() {
      cylinder(h = LZ - 5, d = 6);
      translate([0,0,3]) cylinder(h = LZ, d = 2.2);
    }
}

module tapa_modulo() {
  difference() {
    cube([LX + 2*t, LY + 2*t, tapa_t]);
    // semaforo: 3 LEDs en fila
    for (i = [-1, 0, 1])
      translate([(LX + 2*t)/2 + i*led_sep, (LY + 2*t)/2 + 12, -1]) cylinder(h = tapa_t + 2, d = led_d);
    // buzzer
    translate([(LX + 2*t)/2, (LY + 2*t)/2 - 12, -1]) cylinder(h = tapa_t + 2, d = buzz_d);
    // agujeros de tornillo
    for (x = [t + 4, LX + t - 4], y = [t + 4, LY + t - 4])
      translate([x, y, -1]) cylinder(h = tapa_t + 2, d = 3.2);
  }
}

// =================== PROXIES (solo para el plano) ===================

module sensor_hcsr04() {  // PCB con los dos transductores apuntando hacia ABAJO (-z)
  color("RoyalBlue") cube([sr_pcb[0], sr_pcb[1], sr_pcb[2]]);
  for (s = [-1, 1])
    color("MidnightBlue")
      translate([sr_pcb[0]/2 + s*sr_ojo_sep/2, sr_pcb[1]/2, -sr_ojo_h])
        cylinder(h = sr_ojo_h, d = sr_ojo_d);
}

module arduino_nano() {
  color("Teal") cube(nano);
  color("Silver") translate([2, nano[1]/2 - 4, nano[2]]) cube([16, 8, 3]); // USB
}

module bateria_aaa() {
  color("DimGray") cube(bat);
  for (s = [-1, 1])
    color("Crimson") translate([bat[0]/2 + s*18, bat[1]/2, bat[2]/2]) rotate([0,90,0]) cylinder(h=44, d=10, center=true);
}

module adhesivo() {  // pad 3M en la cara de montaje (arriba de la tapa)
  color([0.9,0.9,0.2,0.6]) cube([LX + 2*t - 8, LY + 2*t - 8, 1]);
}

// =================== ENSAMBLE / SALIDA ===================

if (vista == "base") {
  caja_base();
} else if (vista == "tapa") {
  tapa_modulo();
} else {
  // Plano explosionado (de abajo hacia arriba):
  // sensor -> caja_base -> arduino -> bateria -> tapa -> adhesivo
  cx = (LX + 2*t)/2; cy = (LY + 2*t)/2;

  z_nano  = t + 2 + E;
  z_bat   = z_nano + nano[2] + E;
  z_cover = z_bat + bat[2] + E;
  z_adh   = z_cover + tapa_t + E;

  // sensor debajo del piso, transductores mirando hacia abajo (al contenido)
  translate([cx - sr_pcb[0]/2, cy - sr_pcb[1]/2, -E - sr_ojo_h - 4]) sensor_hcsr04();

  color("SeaGreen") caja_base();

  translate([cx - nano[0]/2, cy - nano[1]/2, z_nano]) arduino_nano();
  translate([cx - bat[0]/2,  cy - bat[1]/2,  z_bat])  bateria_aaa();

  color("Gainsboro") translate([0, 0, z_cover]) tapa_modulo();
  translate([4, 4, z_adh]) adhesivo();
}
