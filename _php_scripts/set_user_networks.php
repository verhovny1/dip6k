<?php
 	include_once "confg.php";

	$network_name = "";
	$network_json = "";
	$network_symbols = "";
	$network_user_id = -1;
	$network_activation_function = "";
	$network_hidden_layers = "";
	if( isset($_POST["network_name"]) && !empty($_POST["network_name"]) ) $network_name = $_POST["network_name"];
	if( isset($_POST["network_json"]) && !empty($_POST["network_json"]) ) $network_json = $_POST["network_json"];
	if( isset($_POST["network_symbols"]) && !empty($_POST["network_symbols"]) ) $network_symbols = $_POST["network_symbols"];
	if( isset($_POST["network_user_id"]) && !empty($_POST["network_user_id"]) ) $network_user_id = $_POST["network_user_id"];
	if( isset($_POST["network_activation_function"]) && !empty($_POST["network_activation_function"]) ) $network_activation_function = $_POST["network_activation_function"];
	if( isset($_POST["network_hidden_layers"]) && !empty($_POST["network_hidden_layers"]) ) $network_hidden_layers = $_POST["network_hidden_layers"];
 
 

	$conn = new mysqli($servername, $username, $password, $dbname);

	$conn->query("set_client='utf8'");
    $conn->query("set character_set_results='utf8'");
    $conn->query("set collation_connection='utf8_general_ci'");
    $conn->query("SET NAMES utf8");

	$sql = "INSERT INTO neural_networks (network_name, network_json, network_symbols, network_user_id,network_activation_function,network_hidden_layers) VALUES ( '".$network_name."','".$network_json."','".$network_symbols."', ". $network_user_id .", '".$network_activation_function."', '".$network_hidden_layers."' )" ; 

	if ($conn->query($sql) === TRUE) 
	{
	    echo "New record created successfully";
	} else 
	{
	    echo "Error: " . $sql . "<br>" . $conn->error;
	}

	$conn->close();

