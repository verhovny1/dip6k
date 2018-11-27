<?php
	include_once "confg.php";

	$indata = array();
	$outdata = array();
	$sample_network_id = 1;
	if( isset($_POST["indata"]) && !empty($_POST["indata"]) ) $indata = $_POST["indata"];
	if( isset($_POST["outdata"]) && !empty($_POST["outdata"]) ) $outdata = $_POST["outdata"];
	if( isset($_POST["sample_network_id"]) && !empty($_POST["sample_network_id"]) ) $sample_network_id = $_POST["sample_network_id"];
	//$indata = array("45","455");
	//$outdata = array("4445","45577");
 
 
	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);

	$conn->query("set_client='utf8'");
    $conn->query("set character_set_results='utf8'");
    $conn->query("set collation_connection='utf8_general_ci'");
    $conn->query("SET NAMES utf8");

	$sql = "INSERT INTO sampling (sample_inpup, sample_output, sample_network_id) VALUES " ;
	for ($i=0; $i < count( $indata ) - 1; $i++) $sql .= "('" .$indata[$i]. "', '" .$outdata[$i]. "', '" . $sample_network_id . "')," ;
	$sql .= "('" .$indata[count($indata)-1]. "', '" .$outdata[count($indata)-1]. "', '" . $sample_network_id . "');" ;

	
	if ($conn->query($sql) === TRUE) 
	{
	    echo "New record created successfully";
	} else 
	{
	    echo "Error: " . $sql . "<br>" . $conn->error;
	}

	$conn->close();