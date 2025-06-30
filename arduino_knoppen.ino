const int buttonPinA = A4;
const int buttonPinB = A5;

bool lastButtonA = LOW;
bool lastButtonB = LOW;

void setup() {
  Serial.begin(19200);
  pinMode(buttonPinA, INPUT_PULLUP);
  pinMode(buttonPinB, INPUT_PULLUP);
}

void loop() {
  bool currentA = !digitalRead(buttonPinA);
  bool currentB = !digitalRead(buttonPinB);

  if (currentA && !lastButtonA) {
    Serial.println("A");
  }

  if (currentB && !lastButtonB) {
    Serial.println("B");
  }

  lastButtonA = currentA;
  lastButtonB = currentB;

  delay(50); // debounce
}
