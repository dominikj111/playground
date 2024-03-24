<?php

// After edit, manually remove the ./wwwroot/wp-config.php file.

define("DB_HOST", getenv("DB_HOST"));
define("DB_USER", getenv("DB_USER"));
define("DB_PASSWORD", getenv("DB_PASSWORD"));
define("DB_NAME", getenv("DB_NAME"));
define("DB_CHARSET", getenv("DB_CHARSET"));
define("DB_COLLATE", getenv("DB_COLLATE"));
define("WP_SITEURL", getenv("WP_SITEURL"));
define("WP_HOME", getenv("WP_HOME"));
// define("WP_DEFAULT_THEME", getenv("WP_DEFAULT_THEME"));

define("WP_DEBUG", getenv("WP_DEBUG"));
define("WP_DEBUG_LOG", getenv("WP_DEBUG_LOG"));
define("WP_DEBUG_DISPLAY", getenv("WP_DEBUG_DISPLAY"));

define("AUTH_KEY", getenv("AUTH_KEY"));
define("SECURE_AUTH_KEY", getenv("SECURE_AUTH_KEY"));
define("LOGGED_IN_KEY", getenv("LOGGED_IN_KEY"));
define("NONCE_KEY", getenv("NONCE_KEY"));
define("AUTH_SALT", getenv("AUTH_SALT"));
define("SECURE_AUTH_SALT", getenv("SECURE_AUTH_SALT"));
define("LOGGED_IN_SALT", getenv("LOGGED_IN_SALT"));
define("NONCE_SALT", getenv("NONCE_SALT"));
define("FS_METHOD", "direct");

$table_prefix = "wp_";

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
