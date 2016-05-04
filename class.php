<?php
$result = array(
	array("id"=>"1","text"=>"周边游",
		"children"=>array(
			array("id"=>"1_1","text"=>"古镇",
				"state"=>array("selected"=>true)
			),
			array("id"=>"1_2","text"=>"游乐园")
		)
	),
	array("id"=>"2","text"=>"国内游",)
);
$jsonstring = json_encode($result);
echo $jsonstring;
?>