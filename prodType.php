<?php
$id=$_POST['type'];
if($id==1){
	$result = array('success' => true,'option'=>'<option value="1">套餐1</option><option value="2">套餐2</option>');
}else if($id==2){
	$result = array('success' => true,'option'=>'<option value="3">套餐3</option><option value="4">套餐4</option>');
}else if($id==3){
	$result = array('success' => true,'option'=>'<option value="5">套餐5</option><option value="6">套餐6</option>');
}
$jsonstring = json_encode($result);
echo $jsonstring;
?>