"use srtict";
$(function() {
    $(".spec_select").select2();
    //富文本绑定初始化
    KindEditor.ready(function(K) {
	    window.editor = K.create('.ke',{
	        uploadJson:'/imageuc/kindeditor/upload?',
	        resizeType :1,
	        width:'100%',
	        height:'300px',
	        allowPreviewEmoticons : true,
	        allowImageUpload : true,
	    });	
	});
});
//添加产品-商品分类相关
var prodCLass=new Object();
/*
	初始化商品分类
	json格式：已选中需要加上"state":{"selected":true}
	[
		{"id":"1","text":"\u5468\u8fb9\u6e38",
			"children":[
				{"id":"1_1","text":"\u53e4\u9547","state":{"selected":true}},
				{"id":"1_2","text":"\u6e38\u4e50\u56ed"}
			]
		},
		{"id":"2","text":"\u56fd\u5185\u6e38"}
	]
*/
prodCLass.init=function(){
	var pordId=null;
	if($("#pordId").length>0) pordId=$("#pordId").val();
	$.ajax({
		url:'../class.php',
		type:'POST',
		dataType:'json',
		data:{
			pordId:pordId
		}
	}).done(function(data){
		//加载树
		$('#prodClassTree').jstree({
		    'plugins': ["checkbox", "types"],
		    'core': {
		        "themes" : {
		            "responsive": false
		        },
		        'data': data
		    }
		}).on('changed.jstree', function(e, data) {
			var arrId=new Array(),
				addText=new Array();
			for(var i = 0; i < data.selected.length; i++) {
				var node = data.instance.get_node(data.selected[i]);
				if (data.instance.is_leaf(node)) {
					var obj=Object();
					arrId.push(node.id);
					obj['id']=node.id;
					obj['text']=node.text;
					addText.push(obj);
				}
			}
			prodCLass._show(addText);		//添加到显示框
			$("#prodClass").val(arrId);		//添加到input-value
		});
	})
}
prodCLass.init();
/*
	把商品添加到显示框
*/
prodCLass._show=function(arr){
	var box=$("#prodClassBox"),
		str='';
	arr.forEach(function(v,i){
		str+='<div class="pord_class">'+v.text+' <i class="fa fa-times" onclick=\'prodClass._del("'+v.id+'")\'></i></div>';
	})
	box.html(str);
}
/*
	删除已添加的分类
*/
prodClass._del=function(id){
	$.jstree.reference('#prodClassTree').deselect_node(id);
}
//规格相关
var spec=new Object();
/*
	添加规格
*/
var specTable=$(".spec_table_box");
var changeTime=$('.spec_add_class').daterangepicker({
	language:'en', 
   	singleDatePicker: true,
   	opens:'right'
}); 
changeTime.on('apply.daterangepicker', function(ev, picker) { 
	var time=picker.startDate.format('YYYY-MM-DD'),
		dome=specTable.children("div");
	
	if(dome.length>0){
		var flag=true;
		//对比当前已经添加的时间规格
		specTable.children("div").each(function(k,v){
			var dTime=$(v).attr("id");
			dTime=dTime.replace('tab','');
			if(dTime==time){
				alert("该时间已添加");
				flag=false;
				return false;
			}
		});
		if(flag) spec.add(time);
	}else{
		spec.add(time);
	}
	
});
spec.add=function(time){
	var box=$(".spec_class_box ul"),
		timeStr='',
		table='',
		i=0;
	//比较当前I的值
	specTable.children("div").each(function(k,v){
		var dI=$(v).data("tableid");
		if(i<dI) i=dI;
	});
	i++;
	// $.ajax({
	// 	url:'../success.php',
	// 	type:'POST',
	// 	dataType:'json',
	// 	data:{
	// 		time:time,
	// 		i:i,
	// 	}
	// }).done(function(data){
	// 	if(data.success){
	// 		timeStr+='<li class="spec_class"><a href="#tab'+time+'" data-toggle="tab" aria-expanded="true">'+time+' <i class="fa fa-times" onclick=\'spec.del(this,"'+time+'")\'></i></a></li>';
	// 		box.append(timeStr);
	// 		specTable.append(data.html);
	// 		$('#tab'+time+'').find("select").select2();
	// 	}
	// })
	var tableTh='<thead><tr role="row"><th class="sorting_asc" width="150px">货号</th><th class="sorting_asc" width="200px">产品名 <button type="button" class="btn btn-default btn-xs pull-right" onclick=\'spec.addTr(this,"'+i+'")\'><i class="fa fa-plus"></i> 增加</button></th><th class="sorting_asc" width="200px">套餐</th><th class="sorting_asc" width="100px">售价</th><th class="sorting_asc" width="100px">成本价</th><th class="sorting_asc" width="100px">市场价</th><th class="sorting_asc" width="100px">库存</th></tr></thead>';
	timeStr+='<li class="spec_class"><a href="#tab'+time+'" data-toggle="tab" aria-expanded="true">'+time+' <i class="fa fa-times" onclick=\'spec.del(this,"'+time+'")\'></i></a></li>';
	table+='<div class="tab-pane fade" id="tab'+time+'" data-tableid="'+i+'"><table class="table table-bordered">'+tableTh;
	table+='<tbody><tr data-trid="1"><td rowspan="2"><input type="text" class="form-control input-sm" name="items['+i+'][art]"><input type="hidden" name="items['+i+'][time]" value="'+time+'"></td>';
	table+='<td><input type="text" class="form-control input-sm" name="items['+i+'][item_name][1]" value="成人"></td>';
	table+='<td><select class="form-control input-sm spec_select" name="items['+i+'][specval][1]"><option value="">请选择</option><option value="8">套餐8</option><option value="9">套餐9</option></select></td>';
	table+='<td><input type="text" class="form-control input-sm" name="items['+i+'][price][1]"></td>';
	table+='<td><input type="text" class="form-control input-sm" name="items['+i+'][cost_price][1]"></td>';
	table+='<td><input type="text" class="form-control input-sm" name="items['+i+'][mktprice][1]"></td>';
	table+='<td><input type="text" class="form-control input-sm" name="items['+i+'][stock][1]"></td></tr>';
	table+='<tr data-trid="2"><td><input type="text" class="form-control input-sm" name="items['+i+'][item_name][2]" value="儿童"></td>';
	table+='<td><select class="form-control input-sm spec_select" name="items['+i+'][specval][2]"><option value="">请选择</option><option value="8">套餐8</option><option value="9">套餐9</option></select></td>';
	table+='<td><input type="text" class="form-control input-sm" name="items['+i+'][price][2]"></td>';
	table+='<td><input type="text" class="form-control input-sm" name="items['+i+'][cost_price][2]"></td>';
	table+='<td><input type="text" class="form-control input-sm" name="items['+i+'][mktprice][2]"></td>';
	table+='<td><input type="text" class="form-control input-sm" name="items['+i+'][stock][2]"></td></tr>';
	table+='</tbody></table></div>';
	box.append(timeStr);
	specTable.append(table);
	$('#tab'+time+'').find("select").select2();
}

/*
	规格增加一行
*/
spec.addTr=function(e,num){
	var box=$(e).parents('table').children('tbody'),
		tdRow=box.find("td").eq(0),
		str="",
		i=2;
	box.children("tr").each(function(j,v){
		var tI=$(v).data("trid");
		if(i<tI) i=tI;
	})
	i++;
	// $.ajax({
	// 	url:'../success.php',
	// 	type:'POST',
	// 	dataType:'json',
	// 	data:{
	// 		num:num,
	// 		i:i,
	// 	}
	// }).done(function(data){
	// 	if(data.success){
	// 		box.append(data.html);
	// 		$('tr[data-trid="'+i+'"]').find("select").select2();
	// 	}
	// })
	str+='<tr data-trid="'+i+'"><td><input type="text" class="form-control input-sm" name="items['+num+'][item_name]['+i+']" value=""></td>';
	str+='<td><select class="form-control input-sm spec_select" name="items['+num+'][specval]['+i+']"><option value="">请选择</option><option value="8">套餐8</option><option value="9">套餐9</option></select></td>';
	str+='<td><input type="text" class="form-control input-sm" name="items['+num+'][price]['+i+']"></td>';
	str+='<td><input type="text" class="form-control input-sm" name="items['+num+'][cost_price]['+i+']"></td>';
	str+='<td><input type="text" class="form-control input-sm" name="items['+num+'][mktprice]['+i+']"></td>';
	str+='<td><input type="text" class="form-control input-sm" name="items['+num+'][stock]['+i+']"></td></tr>';
	tdRow.attr("rowspan",parseInt(tdRow.attr("rowspan"))+1);
	box.append(str);
	$('tr[data-trid="'+i+'"]').find("select").select2();
}
/*
	删除规格
*/
spec.del=function(e,id){
	$('#tab'+id+'').remove();
	$(e).parent().parent().remove();
}


