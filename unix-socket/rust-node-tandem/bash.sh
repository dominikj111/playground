#!/bin/bash

echo "Message from BASH" | socat STDIN UNIX-CONNECT:tandem.sock

echo -e "Another message" | nc -U tandem.sock

curl --unix-socket tandem.sock http://localhost/
