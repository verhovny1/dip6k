<?php
	include_once "confg.php";

	$network_id = "";
	if( isset($_POST["network_id"]) && !empty($_POST["network_id"]) ) $network_id = $_POST["network_id"];
 
 
	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	
	$conn->query("set_client='utf8'");
    $conn->query("set character_set_results='utf8'");
    $conn->query("set collation_connection='utf8_general_ci'");
    $conn->query("SET NAMES utf8");


	$sql = "SELECT network_id,network_name,network_json,network_symbols,network_user_id,network_activation_function,network_hidden_layers FROM `neural_networks` WHERE network_id = ". $network_id .";";
	$result = $conn->query($sql);

	$outpDat = array();

	if ($result->num_rows > 0) 
	{
	    while($row = $result->fetch_assoc()) 
	    {
        	$outpDat[] = $row;
    	}
    	//var_dump( $outpDat );
	} 
	else 
	{
	    echo "0 results";
	}
	$conn->close();


	$myJSON = json_encode($outpDat);
	echo $myJSON;