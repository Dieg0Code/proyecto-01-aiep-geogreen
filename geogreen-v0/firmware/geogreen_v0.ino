// GeoGreen V0.1 - ESP32 + A02YYUW / SEN0311
//
// Objetivo:
//   Validar lectura UART del sensor, filtrar distancia y clasificar
//   EMPTY / MEDIUM / FULL. Sin Wi-Fi, Bluetooth, LEDs, buzzer ni pantalla.
//
// Cableado V0.1:
//   A02YYUW VCC -> ESP32 3V3
//   A02YYUW GND -> ESP32 GND
//   A02YYUW TX  -> ESP32 GPIO16 / RX2
//   A02YYUW RX  -> 3V3 mediante pull-up de 10 kOhm
//   No conectar TX del ESP32 al sensor durante V0.1.

#include <Arduino.h>

static const uint32_t USB_SERIAL_BAUD = 115200;
static const uint32_t SENSOR_BAUD = 9600;
static const uint8_t SENSOR_RX_PIN = 16;
static const int8_t SENSOR_TX_PIN_UNUSED = -1;

// TODO: calibrar con el basurero real.
static const uint16_t EMPTY_DISTANCE_MM = 600;  // sensor -> fondo cuando esta vacio
static const uint16_t FULL_DISTANCE_MM = 80;    // sensor -> contenido cuando esta lleno

static const uint8_t MEDIAN_WINDOW = 7;
static const uint8_t EMPTY_MAX_PCT = 33;
static const uint8_t FULL_MIN_PCT = 67;

enum ParserState {
  WAIT_HEADER,
  READ_DATA_H,
  READ_DATA_L,
  READ_CHECKSUM
};

enum ParseResult {
  PARSE_NONE,
  PARSE_VALID,
  PARSE_INVALID_HEADER,
  PARSE_INVALID_CHECKSUM
};

struct Parser {
  ParserState state = WAIT_HEADER;
  uint8_t dataH = 0;
  uint8_t dataL = 0;
};

struct Measurement {
  uint16_t rawMm = 0;
  uint16_t filteredMm = 0;
  uint8_t fillPct = 0;
  const char* state = "INVALID";
  bool valid = false;
};

Parser parser;
uint16_t recentReadings[MEDIAN_WINDOW] = {0};
uint8_t recentCount = 0;
uint8_t recentNext = 0;

ParseResult parseSensorByte(Parser& p, uint8_t byteValue, uint16_t& distanceMm) {
  switch (p.state) {
    case WAIT_HEADER:
      if (byteValue == 0xFF) {
        p.state = READ_DATA_H;
        return PARSE_NONE;
      }
      return PARSE_INVALID_HEADER;

    case READ_DATA_H:
      p.dataH = byteValue;
      p.state = READ_DATA_L;
      return PARSE_NONE;

    case READ_DATA_L:
      p.dataL = byteValue;
      p.state = READ_CHECKSUM;
      return PARSE_NONE;

    case READ_CHECKSUM: {
      const uint8_t expected = (uint8_t)((0xFF + p.dataH + p.dataL) & 0xFF);
      p.state = WAIT_HEADER;
      if (byteValue != expected) {
        return PARSE_INVALID_CHECKSUM;
      }
      distanceMm = ((uint16_t)p.dataH << 8) | p.dataL;
      return PARSE_VALID;
    }
  }

  p.state = WAIT_HEADER;
  return PARSE_INVALID_HEADER;
}

void addReading(uint16_t distanceMm) {
  recentReadings[recentNext] = distanceMm;
  recentNext = (recentNext + 1) % MEDIAN_WINDOW;
  if (recentCount < MEDIAN_WINDOW) {
    recentCount++;
  }
}

uint16_t medianReading() {
  if (recentCount == 0) {
    return 0;
  }

  uint16_t sorted[MEDIAN_WINDOW];
  for (uint8_t i = 0; i < recentCount; i++) {
    sorted[i] = recentReadings[i];
  }

  for (uint8_t i = 1; i < recentCount; i++) {
    uint16_t value = sorted[i];
    int8_t j = i - 1;
    while (j >= 0 && sorted[j] > value) {
      sorted[j + 1] = sorted[j];
      j--;
    }
    sorted[j + 1] = value;
  }

  return sorted[recentCount / 2];
}

uint8_t fillPercent(uint16_t filteredMm) {
  if (EMPTY_DISTANCE_MM <= FULL_DISTANCE_MM) {
    return 0;
  }

  if (filteredMm >= EMPTY_DISTANCE_MM) {
    return 0;
  }

  if (filteredMm <= FULL_DISTANCE_MM) {
    return 100;
  }

  const uint32_t span = (uint32_t)EMPTY_DISTANCE_MM - FULL_DISTANCE_MM;
  const uint32_t filled = (uint32_t)EMPTY_DISTANCE_MM - filteredMm;
  return (uint8_t)((filled * 100UL + (span / 2UL)) / span);
}

const char* classifyState(uint8_t fillPct) {
  if (fillPct <= EMPTY_MAX_PCT) {
    return "EMPTY";
  }
  if (fillPct >= FULL_MIN_PCT) {
    return "FULL";
  }
  return "MEDIUM";
}

Measurement buildValidMeasurement(uint16_t rawMm) {
  addReading(rawMm);

  Measurement m;
  m.rawMm = rawMm;
  m.filteredMm = medianReading();
  m.fillPct = fillPercent(m.filteredMm);
  m.state = classifyState(m.fillPct);
  m.valid = true;
  return m;
}

Measurement buildInvalidMeasurement() {
  Measurement m;
  m.rawMm = 0;
  m.filteredMm = medianReading();
  m.fillPct = fillPercent(m.filteredMm);
  m.state = "INVALID";
  m.valid = false;
  return m;
}

void printCsv(const Measurement& m) {
  Serial.print(millis());
  Serial.print(',');
  Serial.print(m.rawMm);
  Serial.print(',');
  Serial.print(m.filteredMm);
  Serial.print(',');
  Serial.print(m.fillPct);
  Serial.print(',');
  Serial.print(m.state);
  Serial.print(',');
  Serial.println(m.valid ? 1 : 0);
}

void setup() {
  Serial.begin(USB_SERIAL_BAUD);
  Serial2.begin(SENSOR_BAUD, SERIAL_8N1, SENSOR_RX_PIN, SENSOR_TX_PIN_UNUSED);

  Serial.println("timestamp_ms,raw_mm,filtered_mm,fill_pct,state,valid");
}

void loop() {
  while (Serial2.available() > 0) {
    const uint8_t byteValue = (uint8_t)Serial2.read();
    uint16_t distanceMm = 0;
    const ParseResult result = parseSensorByte(parser, byteValue, distanceMm);

    if (result == PARSE_VALID) {
      printCsv(buildValidMeasurement(distanceMm));
    } else if (result == PARSE_INVALID_HEADER || result == PARSE_INVALID_CHECKSUM) {
      printCsv(buildInvalidMeasurement());
    }
  }
}

