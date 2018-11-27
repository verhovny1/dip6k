<?php
	include_once "confg.php";

	$indata = array();
	$outdata = array();
	$sample_network_id = 1;


	//var_dump($_POST["indata"], $_POST["outdata"], $_POST["sample_network_id"]);die();

	$ind = "";$outd = "";
	if( isset($_POST["indata"]) && !empty($_POST["indata"]) ) $ind = $_POST["indata"] ;
	if( isset($_POST["outdata"]) && !empty($_POST["outdata"]) ) $outd = $_POST["outdata"] ;
	if( isset($_POST["sample_network_id"]) && !empty($_POST["sample_network_id"]) ) $sample_network_id = $_POST["sample_network_id"];
 
	$st = "";
	for ($i=0; $i < strlen( $ind); $i++)
	{ 
		if ($ind[$i]!=",") $st .= $ind[$i];
		else 
		{
			$indata[] = $st;
			$st = "";
		} 
	}
	$indata[] = $st;


	$st = "";
	for ($i=0; $i < strlen( $outd); $i++)
	{ 
		if ($outd[$i]!=",") $st .= $outd[$i];
		else 
		{
			$outdata[] = $st;
			$st = "";
		} 
	}
	$outdata[] = $st;



	//if( isset($_REQUEST["indata"]) && !empty($_REQUEST["indata"]) ) $indata = $_REQUEST["indata"];
	//if( isset($_REQUEST["outdata"]) && !empty($_REQUEST["outdata"]) ) $outdata = $_REQUEST["outdata"];
	//if( isset($_REQUEST["sample_network_id"]) && !empty($_REQUEST["sample_network_id"]) ) $sample_network_id = $_REQUEST["sample_network_id"];
	//$indata = array("45","455");
	//$outdata = array("4445","45577");
//var_dump( $sample_network_id );
//var_dump( $indata ); 
//var_dump( $outdata ); 
//var_dump( $_POST ); 
//var_dump( $_REQUEST  ); 
 
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