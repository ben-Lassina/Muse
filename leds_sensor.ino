const int TRIG_PIN = 10;
const int ECHO_PIN = 9;
const int LED_PIN  = 3;
const int DISTANCE_THRESHOLD = 50; // cm

float duration_us, distance_cm;

void setup() {
  Serial.begin(115200);
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  pinMode(LED_PIN, OUTPUT);
}

void loop() {
  // Trigger ultrasonic pulse
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);

  // Measure echo pulse
  duration_us = pulseIn(ECHO_PIN, HIGH, 30000);

  if (duration_us == 0) {
    Serial.println("Out of range");
    digitalWrite(LED_PIN, HIGH); // LED OFF
  } else {
    distance_cm = 0.017 * duration_us;

    Serial.print("Distance: ");
    Serial.print(distance_cm);
    Serial.println(" cm");

    if (distance_cm <= DISTANCE_THRESHOLD) {
      digitalWrite(LED_PIN, HIGH); // LED ON if in range
    } else {
      digitalWrite(LED_PIN, LOW);  // LED OFF if out of range
    }
  }

  delay(500);
}
