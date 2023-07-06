#include <Arduino.h>

int serialReadByte;
int randNumber;
int ledState = LOW;
unsigned long sleepTime = 1000;
unsigned long latestSwitchMs = millis();

String message = "";

bool expectingCommand = true;
bool ledBlinkingIsOn = false;

bool wantToGetAMessage = false;
bool wantToSetSleepTime = false;
bool wantToKnowLastRandom = false;
bool wantToGenerateRandom = false;
bool wantToSwitchBlinkingOnOff = false;
bool wantToSetMessage = false;

void processState();
void establishContact();

void setup()
{
	pinMode(LED_BUILTIN, OUTPUT);
	Serial.begin(9600);

	while (!Serial)
	{
		; // wait for serial port to connect. Needed for native USB port only
	}

	Serial.println("OK");
}

void loop()
{
	if (Serial.available() > 0 && expectingCommand)
	{
		serialReadByte = Serial.read();

		// Serial.print(serialReadByte);

		switch (serialReadByte)
		{
		case 49: // 1
			wantToGetAMessage = true;
			break;
		case 50: // 2
			wantToSetSleepTime = true;
			expectingCommand = false;
			break;
		case 51: // 3
			wantToKnowLastRandom = true;
			break;
		case 52: // 4
			wantToGenerateRandom = true;
			break;
		case 53: // 5
			wantToSwitchBlinkingOnOff = true;
			break;
		case 54: // 6
			wantToSetMessage = true;
			expectingCommand = false;
			break;
		}
		return;
	}

	processState();

	if (ledBlinkingIsOn && sleepTime != 0)
	{
		if (millis() - latestSwitchMs >= sleepTime)
		{
			ledState = !ledState;
			digitalWrite(LED_BUILTIN, ledState);
			latestSwitchMs = millis();
		}
	}
}

void processState()
{
	if (wantToSwitchBlinkingOnOff)
	{
		wantToSwitchBlinkingOnOff = false;
		ledBlinkingIsOn = !ledBlinkingIsOn;
	}

	if (wantToGetAMessage)
	{
		wantToGetAMessage = false;

		if (message.length() == 0)
		{
			String defaultMessage = "Ahoj, napiš! rnd[" + String(randNumber) + "]";
			Serial.write(defaultMessage.c_str());
		}
		else
		{
			Serial.write(message.c_str());
		}
		Serial.println();
	}

	if (wantToKnowLastRandom)
	{
		wantToKnowLastRandom = false;
		Serial.write(randNumber);
		Serial.println();
	}

	if (wantToGenerateRandom)
	{
		wantToGenerateRandom = false;
		randNumber = random(256); // 0 - 255
	}

	// SETTERS

	if (wantToSetSleepTime && Serial.available() > 0)
	{
		sleepTime = Serial.read();
		wantToSetSleepTime = false;
		expectingCommand = true;
	}

	if (wantToSetMessage && Serial.available() > 0)
	{
		sleepTime = Serial.read();
		wantToSetMessage = false;
		expectingCommand = true;
	}
}