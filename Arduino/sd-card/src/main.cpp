#include <Arduino.h>
#include <SPI.h>
#include <SD.h>

File myFile;

void setup()
{
	Serial.begin(9600);

	while (!Serial)
	{
		; // wait for serial port to connect. Needed for native USB port only
	}

	Serial.print("Initializing SD card ...");

	if (!SD.begin(10))
	{
		Serial.println("Initialization failed!");
		return;
	}

	Serial.println("Initialization done");

	// open the file. note that only one file can be open at a time,
	// so you have to close this one before opening another.
	myFile = SD.open("test.txt", FILE_WRITE);

	if (myFile)
	{
		// if the file opened okay, write to it:
		Serial.print("Writing to test.txt ...");
		myFile.println("Testing 1, 2, 3.");

		myFile.close();
		Serial.println("Done");
	}
	else
	{
		Serial.println("Error opening test.txt");
	}

	myFile = SD.open("test.txt"); // re-open the file for reading:

	if (myFile)
	{

		while (myFile.available())
		{
			Serial.println("Reading the test.txt ...");
			Serial.write(myFile.read());
		}

		myFile.close();
	}
	else
	{
		Serial.println("Error opening the test.txt");
	}
}

void loop()
{
}