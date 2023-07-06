#include <Arduino.h>
#include <UIPEthernet.h>
#include <w3front.hpp>
// #include <utils/basics.hpp>

const W3Front::PathContentPair *dictionary;
int dictionarySize;

// **** ETHERNET SETTING ****
byte mac[] = {0x54, 0x34, 0x41, 0x30, 0x30, 0x31};
IPAddress ip(192, 168, 1, 2);
EthernetServer server(80);

void setup()
{
	dictionary = W3Front::ContentFiles::GetPathContentDictionary();
	dictionarySize = W3Front::ContentFiles::pathContentDictionarySize;

	Serial.begin(9600);

	while (!Serial)
	{
		; // wait for serial port to connect. Needed for native USB port only
	}

	Serial.println("Serial OK");

	Ethernet.begin(mac, ip); // start the Ethernet connection and the server:
	server.begin();

	Serial.print("IP Address: ");
	Serial.println(Ethernet.localIP());
	Serial.println();
	Serial.println("-------------------");
	Serial.println("| SERVER IS READY |");
	Serial.println("-------------------");
	Serial.println();
}

void loop()
{
	EthernetClient client = server.available(); // listen for incoming clients

	if (client)
	{
		if (client.connected() && client.available())
		{
			Serial.println("   => Client Available");
		}

		while (client.connected() && client.available())
		{
			String request = client.readStringUntil('\r');
			String requestCopy = request;
			char *requestCopyPtr = const_cast<char *>(requestCopy.c_str());
			char *firstToken = strtok(requestCopyPtr, " ");
			char *secondToken = strtok(NULL, " "); // skip the first token as we need token on second position

			if (strcmp(firstToken, "GET") == 0)
			{
				W3Front::ContentMeta contentMeta;

				for (int i = 0; i < dictionarySize; i++)
				{
					W3Front::PathContentPair pair = dictionary[i];

					if (strcmp(pair.path, secondToken) == 0)
					{
						contentMeta = pair.file;
						break;
					}
				}

				Serial.print("contentMeta.content != nullptr : ");
				Serial.println(contentMeta.content != nullptr);

				if (contentMeta.content != nullptr)
				{
					Serial.println("      Responding Request");

					client.println("HTTP/1.1 200 OK");
					client.println("Server: Arduino");
					client.println("Content-Type: " + String(contentMeta.type));
					client.println("Connection: Closed");
					client.println();
					client.print(contentMeta.content);
				}
				else
				{
					Serial.println("      404 Not Found");

					client.println("HTTP/1.1 404 Not Found");
					client.println("Server: Arduino");
					client.println("Content-Type: text/html");
					client.println("Connection: Closed");
					client.println();
					client.print("<h1>404 Not Found</h1>");
				}
			}

			Serial.print(request);
		}

		client.stop();
		Serial.println("      Client Disconnected\n");
	}
}