<?php
	// print_r($_FILES);
	// {"error":1,"message":"\u4ec5\u652f\u6301jpg,jpeg,gif,png\u683c\u5f0f\uff0c\u56fe\u7247\u5927\u5c0f\u4e0d\u8981\u8d85\u8fc71M"}
$result = array('error' => 0,"url"=>"hh.txt");
	$jsonstring = json_encode($result);
	echo $jsonstring;
?>