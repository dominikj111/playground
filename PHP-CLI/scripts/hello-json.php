#!/usr/local/bin/php

<?php

$json_1 = json_decode('{"key1":[1,2,3],"key2":"value"}');
$json_string_1 = json_encode($json_1, JSON_PRETTY_PRINT);
echo $json_string_1 . "\n";

echo "\n";

$json_2 = array('a' => 'apple', 'b' => 'banana', 'c' => 'catnip');
$json_string_2 = json_encode($json_2, JSON_PRETTY_PRINT);
echo $json_string_2 . "\n";


define ('ESC', "\033");
define('ANSI_CLOSE', ESC."[0m");
define('ANSI_BACKGROUND_YELLOW', ESC."[43m");
define('ANSI_BLACK', ESC."[30m");

fwrite(STDOUT, ANSI_BACKGROUND_YELLOW . ANSI_BLACK . $json_string_2 . ANSI_CLOSE . PHP_EOL);
