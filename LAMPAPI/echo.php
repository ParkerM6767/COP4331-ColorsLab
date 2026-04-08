<?php

header('Content-Type: text/plain; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo 'Method Not Allowed';
    exit;
}

$value = isset($_GET['echo']) ? $_GET['echo'] : http_response_code(400) && exit('Bad Request: Missing "echo" parameter');
echo htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
