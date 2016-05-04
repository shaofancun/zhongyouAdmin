<?php
// var_dump($_FILES);
// exit();
$time=rand(1,99999);
$filename="aaa".$time.".jpg";
$destination="bbb/".$filename;
$file=$_FILES['file'];
if(move_uploaded_file($file['tmp_name'], $destination)){
	$file['name']=$filename;
	unset($file['tmp_name'],$file['size'],$file['type']);
}
$result = array('success' => 1, 'url' => 'http://192.168.1.250/zyadmin/bbb/'.$filename,'name'=>$filename,'id'=>'1');
$jsonstring = json_encode($result);
echo $jsonstring;
?>