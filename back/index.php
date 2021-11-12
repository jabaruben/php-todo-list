<?php

require __DIR__ . '/vendor/autoload.php';

use Config\Config; 
use PhpTodoList\Infraestructure\Database\Mysql\Mysql;

use PhpTodoList\Infraestructure\Router;
use PhpTodoList\Infraestructure\Bootstrap;
use PhpTodoList\Infraestructure\Middleware;

error_reporting(E_ALL ^ E_NOTICE);
ini_set("display_errors", Config::DISPLAY_ERRORS);

$app = null;
$db = null;
try {
    $app = new Bootstrap(new Router(), new Middleware(), new Config());
    $app->setBasePath(Config::ROUTER_BASE_PATH);
    $app->setRoutesFile(Config::CONFIG_ROUTES_PATH);
    $db = new Mysql(Config::HOST, Config::NAME, Config::USER, Config::PASSWORD);
    $app->addMiddlewareService("db", $db);
    $app->run();
    die();
} catch (Exception $e) {
    echo "{$e->getMessage()}";
}
