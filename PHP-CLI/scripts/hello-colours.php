#!/usr/local/bin/php

<?php 

/**
 * Escape character
 */
define ('ESC', "\033");

/**
 * ANSI colours
 */
define('ANSI_BLACK', ESC."[30m");
define('ANSI_RED', ESC."[31m");
define('ANSI_GREEN', ESC."[32m");
define('ANSI_YELLOW', ESC."[33m");
define('ANSI_BLUE', ESC."[34m");
define('ANSI_MAGENTA', ESC."[35m");
define('ANSI_CYAN', ESC."[36m");
define('ANSI_WHITE', ESC."[37m");

/**
 * ANSI background colours
 */
define('ANSI_BACKGROUND_BLACK', ESC."[40m");
define('ANSI_BACKGROUND_RED', ESC."[41m");
define('ANSI_BACKGROUND_GREEN', ESC."[42m");
define('ANSI_BACKGROUND_YELLOW', ESC."[43m");
define('ANSI_BACKGROUND_BLUE', ESC."[44m");
define('ANSI_BACKGROUND_MAGENTA', ESC."[45m");
define('ANSI_BACKGROUND_CYAN', ESC."[46m");
define('ANSI_BACKGROUND_WHITE', ESC."[47m");

/**
 * ANSI styles
 */
define('ANSI_BOLD', ESC."[1m");
define('ANSI_ITALIC', ESC."[3m"); // limited support. ymmv.
define('ANSI_UNDERLINE', ESC."[4m");
define('ANSI_STRIKETHROUGH', ESC."[9m");

/**
 * Clear all ANSI styling
 */
define('ANSI_CLOSE', ESC."[0m");

// colour output
echo ANSI_RED."THIS IS RED".ANSI_CLOSE.PHP_EOL;
echo ANSI_GREEN."THIS IS GREEN".ANSI_CLOSE.PHP_EOL;
echo ANSI_YELLOW."THIS IS YELLOW".ANSI_CLOSE.PHP_EOL;
echo ANSI_BLUE."THIS IS BLUE".ANSI_CLOSE.PHP_EOL;
echo ANSI_MAGENTA."THIS IS MAGENTA".ANSI_CLOSE.PHP_EOL;
echo ANSI_CYAN."THIS IS CYAN".ANSI_CLOSE.PHP_EOL;
echo ANSI_WHITE."THIS IS WHITE".ANSI_CLOSE.PHP_EOL;

// colour background output
echo ANSI_BACKGROUND_WHITE."THIS IS ON A WHITE BACKGROUND".ANSI_CLOSE.PHP_EOL;
echo ANSI_BACKGROUND_RED.ANSI_WHITE."THIS IS WHITE ON A RED BACKGROUND".ANSI_CLOSE.PHP_EOL;

// style output
echo ANSI_BOLD."THIS IS BOLD".ANSI_CLOSE.PHP_EOL;
echo ANSI_ITALIC."THIS MAY OR MAY NOT BE ITALIC".ANSI_CLOSE.PHP_EOL;
echo ANSI_UNDERLINE."THIS IS UNDERLINED".ANSI_CLOSE.PHP_EOL;
echo ANSI_STRIKETHROUGH."THIS IS STRIKETHROUGH".ANSI_CLOSE.PHP_EOL;

// combined colour and style output
echo ANSI_BOLD.ANSI_RED."THIS IS RED AND BOLD".ANSI_CLOSE.PHP_EOL;
echo ANSI_BOLD.ANSI_STRIKETHROUGH.ANSI_RED."THIS IS RED AND BOLD AND STRIKETHROUGH".ANSI_CLOSE.PHP_EOL;
echo ANSI_BACKGROUND_RED.ANSI_WHITE.ANSI_BOLD."THIS IS BOLD WHITE ON A RED BACKGROUND".ANSI_CLOSE.PHP_EOL;

/**
 * Output an 'OK' message
 *
 * @param  String $message The message to display
 * @return void
 */
function ok(String $message):void
{
    fwrite(STDOUT,"[".ANSI_GREEN."OK".ANSI_CLOSE."] ".$message.PHP_EOL);
}

/**
 * Output an 'ERROR' message
 *
 * @param  String $message The message to display
 * @return void
 */
function error(String $message):void
{
    fwrite(STDOUT,"[".ANSI_RED."ERROR".ANSI_CLOSE."] ".$message.PHP_EOL);
}

// usage
ok("it worked");
error("something went wrong");
