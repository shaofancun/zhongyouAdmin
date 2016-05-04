<?php
$time=date("H:i:s"); 
$result = array('success' => true);
$jsonstring = json_encode($result);
echo $jsonstring;
?>