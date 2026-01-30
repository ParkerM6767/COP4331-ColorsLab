<?php
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo 'Method Not Allowed';
    exit;
}

$jsonBody = file_get_contents('php://input');
$data = json_decode($jsonBody, true);

echo "<pre>";
print_r($data['username']);
echo "</pre>";
?>