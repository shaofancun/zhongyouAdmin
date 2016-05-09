"use srtict";
var airfare=new Object(),
	addBox=$("#addFly"),
	editBox=$("#editFly");
var pordId=$("#prodId").val();		//商品ID
/*
	绑定事件控件
*/
var timeOn=$('#addFly .reservationtime').daterangepicker({
		timePicker: true,
        timePickerIncrement: 1,
		opens: 'left',
        startDate: moment().subtract('days', 29),
        endDate: moment(),
        timePicker12Hour:false
	});
timeOn.on('apply.daterangepicker', function(ev, picker) {
	$('#addFly .reservationtime').val(picker.startDate.format('YYYY-MM-DD HH:MM') + ' 至 ' + picker.endDate.format('YYYY-MM-DD HH:MM'));
	$('#addFly .start_time').val(picker.startDate.format('YYYY-MM-DD HH:MM'));
	$('#addFly .end_time').val(picker.endDate.format('YYYY-MM-DD HH:MM'));
});


var airfare=new Object();
/*
	添加航班
*/
airfare.add=function(){
	var type=$("#addFly .type").val(),		//往返类型
		startTime=$("#addFly .start_time").val(),		//起飞时间
		endTime=$("#addFly .end_time").val(),		//降落时间
		goAddr=$("#addFly .go_address").val(),		//出发城市
		goAirport=$("#addFly .go_airport").val(),		//出发机场
		backAddr=$("#addFly .go_address").val(),		//到达城市
		backAirport=$("#addFly .go_airport").val(),		//到达机场
		company=$("#addFly .company").val(),		//航空公司
		flight=$("#addFly .flight").val(),		//航班
		seat=$("#addFly .seat").val(),		//舱位
		price=$("#addFly .price").val();		//价格
	if(!type){
		alert("请选择类型");
		return false;
	}
	$.ajax({
		url:'../success.php',
		type:'POST',
		dataType:'json',
		data:{
			pordId:pordId,
			type:type,
			startTime:startTime,
			endTime:endTime,
			goAddr:goAddr,
			goAirport:goAirport,
			backAddr:backAddr,
			backAirport:backAirport,
			company:company,
			flight:flight,
			seat:seat,
			price:price
		}
	}).done(function(data){
		if(data.success){
			addBox.modal("hide").on('hidden.bs.modal', function (e) {
				window.location.reload();
			})
		}
	})
}
/*
	编辑加载航班
*/
$(".edit").click(function(){
	var _this=$(this),
		id=_this.parents("tr").data("airfareid"),
		box=$("#editFly .modal-body");
	$.ajax({
		url:'../success.php',
		type:'POST',
		dataType:'json',
		data:{
			id:id,
		}
	}).done(function(data){
		if(data.success){
			box.html(data.html);
		}
	})
	editBox.modal("show");
	
})
/*
	编辑航班
*/
airfare.edit=function(){
	var flyId=$("#EditFly #flyId").val(),		//航班ID
		type=$("#EditFly .type").val(),		//往返类型
		startTime=$("#EditFly .start_time").val(),		//起飞时间
		endTime=$("#EditFly .end_time").val(),		//降落时间
		goAddr=$("#EditFly .go_address").val(),		//出发城市
		goAirport=$("#EditFly .go_airport").val(),		//出发机场
		backAddr=$("#EditFly .go_address").val(),		//到达城市
		backAirport=$("#EditFly .go_airport").val(),		//到达机场
		company=$("#EditFly .company").val(),		//航空公司
		flight=$("#EditFly .flight").val(),		//航班
		seat=$("#EditFly .seat").val(),		//舱位
		price=$("#EditFly .price").val();		//价格
	if(!type){
		alert("请选择类型");
		return false;
	}
	$.ajax({
		url:'../success.php',
		type:'POST',
		dataType:'json',
		data:{
			pordId:pordId,
			flyId:flyId,
			type:type,
			startTime:startTime,
			endTime:endTime,
			goAddr:goAddr,
			goAirport:goAirport,
			backAddr:backAddr,
			backAirport:backAirport,
			company:company,
			flight:flight,
			seat:seat,
			price:price
		}
	}).done(function(data){
		if(data.success){
			editBox.modal("hide");
		}
	})
}
/*
	删除航班
*/
$(".del").click(function(){
	var _this=$(this).parents("tr"),
		id=_this.data("airfareid");
	$.ajax({
		url:'../success.php',
		type:'POST',
		dataType:'json',
		data:{
			id:id
		}
	}).done(function(data){
		if(data.success){
			_this.animate({opacity:0},800,function(){
				_this.remove();
			})
		}
	})
})