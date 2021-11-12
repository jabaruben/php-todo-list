<?php

// use Psr\Http\Message\ResponseInterface as Response;
// use Psr\Http\Message\ServerRequestInterface as ServerRequest;
use src\Infraestructure\HTTP\ServerRequest;
use src\Infraestructure\HTTP\Response;

return [
    "routes" => [
        "private" => [
            // HTTP_METHOD, ROUTE, TARGET or CONTROLLER:METHOD, NAME, PATHTOFOLDER, CALLBACK_FUNCTION(Request, Response, $bootstrapConfig, Bootstrap)
            ['GET', '/userspriv', 'Users:list', 'ListUsersPriv', 'users', function (ServerRequest $req, Response $res) {
                echo "Attributes: " . print_r($req->getAttributes());
                echo "- TEST INSIDE FUNCTION ON ROUTER MAP" . NL;
                echo "- IS A PRIVATE SECCTION" . NL;
                return $res;
            }],
        ],
        "public" => [
            // HTTP_METHOD, ROUTE, TARGET or CONTROLLER:METHOD, NAME, PATHTOFOLDER, CALLBACK_FUNCTION(Request, Response, $bootstrapConfig, Bootstrap)
            ['GET', '/users', 'Users:list', 'ListUsers', 'users', function (ServerRequest $req, Response $res) {
                echo "Attributes: " . print_r($req->getAttributes());
                echo "- TEST INSIDE FUNCTION ON ROUTER MAP" . NL;
                echo "- IS A PRUBLIC SECCTION" . NL;
                return $res;
            }],
            ['GET', '/users/[i:id]', 'Users:list', 'ListUsersWithId', 'users'],
            ['GET', '/users/listnodes/[i:id]', 'Users:listNodes', 'ListUserNodes', 'users'],
            ['GET', '/users/login/[*:user]/[a:password]', 'Users:login', 'UserLogin', 'users'],
            ['GET', '/nodes/list/[i:id]', 'Nodes:list', 'ListNodesFromUserId', 'nodes'],
        ],
    ],
    "errors" => [
        "404" => ["controller" => "Errors", "method" => "error404", "target" => "404", "params" => ["controller" => "Errors", "method" => "404"], "name" => "404"],
    ],
];
