<?php
	include_once "confg.php";

	$sample_network_id = 1;
	if( isset($_POST["sample_network_id"]) && !empty($_POST["sample_network_id"]) ) $sample_network_id = $_POST["sample_network_id"];

 
	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);

	$conn->query("set_client='utf8'");
    $conn->query("set character_set_results='utf8'");
    $conn->query("set collation_connection='utf8_general_ci'");
    $conn->query("SET NAMES utf8");

	$sql = "SELECT sample_inpup, sample_output FROM `sampling` WHERE sample_network_id = ".$sample_network_id.";";
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