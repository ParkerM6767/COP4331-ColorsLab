<?php
header('Content-Type: application/json; charset=utf-8');

$config = parse_ini_file("../db_config.ini");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo 'Method Not Allowed';
    exit;
}

$db = mysqli("localhost", $config['DB_USER'], $config['DB_PASSWORD'], "COP4331");

if ($conn->connect_error) {
    returnWithError($conn->connect_error);
} else {
    $jsonBody = file_get_contents('php://input');
    $inData = json_decode($jsonBody, true);


    $stmt = $conn->prepare("SELECT ID,firstName,lastName FROM Users WHERE Login=? AND Password =?");
    $stmt->bind_param("ss", $inData["username"], $inData["password"]);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc()) {
        returnWithInfo($row['firstName'], $row['lastName'], $row['ID']);
    } else {
        returnWithError("No Records Found");
    }

    $stmt->close();
    $conn->close();
}

function getRequestInfo()
{
    return json_decode(file_get_contents('php://input'), true);
}

function sendResultInfoAsJson($obj)
{
    header('Content-type: application/json');
    echo $obj;
}

function returnWithError($err)
{
    $retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
    sendResultInfoAsJson($retValue);
}

function returnWithInfo($firstName, $lastName, $id)
{
    $retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","error":""}';
    sendResultInfoAsJson($retValue);
}

?>