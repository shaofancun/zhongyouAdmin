<?php
$result = array(
	'success' => true,
	'html'=>'<div class="form-body"><div class="form-group"><label class="col-md-2 control-label">序号：</label><div class="col-md-3"><div class="input-group"><span class="input-group-addon">第</span><input type="text" class="form-control" id="num" name="num"><span class="input-group-addon">天</span></div></div></div><div class="form-group"><label class="col-md-2 control-label">标题：</label><div class="col-md-8"><input type="text" class="form-control" id="name" name="name" placeholder="行程标题"></div></div><div class="form-group"><label class="col-md-2 control-label">摘要：</label><div class="col-md-8"><textarea class="form-control" id="explain" name="explain" placeholder="摘要" rows="4"></textarea></div></div><div class="form-group"><label class="col-md-2 control-label">详细行程：</label><div class="col-md-8"><textarea class="form-control ke" id="editDetailed" name="detailed"><h2>1</h2></textarea></div></div><div class="form-group"><label class="col-md-2 control-label"></label><div class="col-md-8"><div class="trip_up_img"></div><div class="trip_up_img"></div><div class="trip_up_img"></div></div></div></div>'
);
$jsonstring = json_encode($result);
echo $jsonstring;	
?>