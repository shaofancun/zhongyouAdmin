"use srtict";
$(function() {
    $(".spec_select").select2();
    /*
		富文本绑定初始化
    */
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
	//省市区
	region.init($(".select_region"));
});
/*
	绑定上下架时间
*/
$(".form_datetime").datetimepicker({
    language:'zh',
    weekStart: 1,   
    showMeridian: 1 ,
    autoclose: true,
    isRTL: Metronic.isRTL(),
    format: "yyyy-mm-dd hh:ii",
    pickerPosition: (Metronic.isRTL() ? "bottom-right" : "bottom-left")
});
/*
	选择类型获取套餐
*/
$("#typeSelect").on('change',function(){
	var type=$(this).val();
	if(type!=''){
		$.post('../prodType.php',{type:type}).done(function(data){
			var data = eval("(" + data + ")"); 
			if(data.success){
				$("#typeOption").val(data.option);
				$(".spec_class_box ul,.spec_table_box").html("");
			}
		})
	}
})

var prodCLass=new Object();		//添加产品-商品分类相关
/*
	初始化商品分类
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

var spec=new Object();		//规格相关
/*
	添加规格
*/
var specTable=$(".spec_table_box"),
	specUl=$(".spec_class_box ul");
$(".spec_add_class").click(function(){
	var optionVal=$("#typeOption").val(),
		num=0;
	if(!optionVal){
		alert("请选择类型");
		return false;
	}
	//比较当前I的值
	specTable.children("div").each(function(k,v){
		var dI=$(v).data("tableid");
		if(num<dI) num=dI;
	});
	num++;
	spec.add(num,optionVal);
})
spec.add=function(num,option){
	var table='',		//表格
		tableTh='';		//表格头部
	var timeStr=spec.li(num);		//按钮DOM

	tableTh+='<thead><tr role="row"><th class="sorting_asc" width="200px">货号</th><th class="sorting_asc" width="200px">产品名 </th><th class="sorting_asc" width="200px">套餐</th><th class="sorting_asc" width="100px">售价</th><th class="sorting_asc" width="100px">成本价</th><th class="sorting_asc" width="100px">市场价</th><th class="sorting_asc" width="100px">库存</th></tr></thead>';
	table+='<div class="tab-pane fade" id="tab'+num+'" data-tableid="'+num+'"><table class="table table-bordered">'+tableTh;
	table+='<tbody><tr data-trid="1"><td><input type="text" class="form-control input-sm" name="item_s['+num+'][row][1][fn]"></td>';
	table+='<td><input type="text" class="form-control input-sm" name="item_s['+num+'][row][1][item_name]" value="成人"></td>';
	table+='<td><select class="form-control input-sm spec_select" name="item_s['+num+'][row][1][specval]"><option value="">请选择</option>'+option+'</select></td>';
	table+='<td><input type="text" class="form-control input-sm" name="item_s['+num+'][row][1][price]"></td>';
	table+='<td><input type="text" class="form-control input-sm" name="item_s['+num+'][row][1][cost_price]"></td>';
	table+='<td><input type="text" class="form-control input-sm" name="item_s['+num+'][row][1][mktprice]"></td>';
	table+='<td><input type="text" class="form-control input-sm" name="item_s['+num+'][row][1][stock]"></td></tr>';
	table+='<tr data-trid="2"><td><input type="text" class="form-control input-sm" name="item_s['+num+'][row][2][art]"></td>';
	table+='<td><input type="text" class="form-control input-sm" name="item_s['+num+'][row][2][item_name]" value="儿童"></td>';
	table+='<td><select class="form-control input-sm spec_select" name="item_s['+num+'][row][2][specval]"><option value="">请选择</option>'+option+'</select></td>';
	table+='<td><input type="text" class="form-control input-sm" name="item_s['+num+'][row][2][price]"></td>';
	table+='<td><input type="text" class="form-control input-sm" name="item_s['+num+'][row][2][cost_price]"></td>';
	table+='<td><input type="text" class="form-control input-sm" name="item_s['+num+'][row][2][mktprice]"></td>';
	table+='<td><input type="text" class="form-control input-sm" name="item_s['+num+'][row][2][stock]"></td></tr>';
	table+='</tbody></table>';
	table+='<button type="button" class="btn green" onclick=\'spec.addTr(this)\'><i class="fa fa-plus"></i> 增加一行</button></div>';
	specUl.append(timeStr);
	specTable.append(table);
	//绑定下拉框
	$('#tab'+num+'').find("select").select2();
	//绑定时间框
	new spec.onTime($('.time_change'));
}
/*
	复制规格
*/
$(".spec_copy_class").click(function(){

	var spec_class=$(".spec_class_box li"),
		i=0;
	if(spec_class.length==0){
		alert("请先新增一个规格才可以复制。");
		return false;
	}
	spec_class.each(function(j,v){
		if($(v).hasClass("active")){
			i=j;
		}
	})
	var num=0;		//规格的长度
	//比较当前I的值
	specTable.children("div").each(function(k,v){
		var dI=$(v).data("tableid");
		if(num<dI) num=dI;
	});
	num++;
	var	timeStr=spec.li(num),		//规格的html内容
		tableHtml=$(".spec_table_box .tab-pane").eq(i).html();		//第一个表格的html内容
	specUl.append(timeStr);
	//绑定时间框
	new spec.onTime($('.time_change'));
	specTable.append('<div class="tab-pane fade" id="tab'+num+'" data-tableid="'+num+'">'+tableHtml.replace(/item_s[\[][0-9][\]]/g,'item_s['+num+']')+'</div>');
	$('#tab'+num+' .select2-container').remove();
	$('#tab'+num+'').find("select").select2();
})
/*
	返回规格li
*/
spec.li=function(num){
	var timeStr='';
	timeStr+='<li class="spec_class">';
	timeStr+='<a href="#tab'+num+'" data-toggle="tab" aria-expanded="true">';
	timeStr+='<span class="time'+num+'">请选择时间</span>';
	timeStr+='<button type="button" class="btn btn-default btn-xs" onclick=\'spec.del(this,"'+num+'")\'><i class="fa fa-times"></i> 删除</button>';
	timeStr+='<button type="button" class="btn btn-default btn-xs time_change"><i class="fa fa-pencil"></i> 选择时间</button><input type="hidden" name="item_s['+num+'][time]" value="">';	
	timeStr+='</a></li>';
	return timeStr;
}
/*
	给value赋值
*/
specTable.on('keyup','input',function(){
	$(this).attr('value',$(this).val());
}).on('change','select',function(){
	var i=$(this).get(0).selectedIndex,
		option=$(this).find('option');
	option.removeAttr("selected","selected");
	option.eq(i).attr("selected","selected");
})

/*
	绑定时间事件
*/
spec.onTime=function(dom){
	dom.daterangepicker({
		language:'en', 
	   	singleDatePicker: true,
	   	opens:'right'
	}).on('apply.daterangepicker', function(e, picker) { 
		e.stopPropagation(); 
		var time=picker.startDate.format('YYYY-MM-DD'),		//获取时间
			dome=$(this).prev().prev(),		//dom按钮
			inV=$(this).next();		//时间input
		if(dome.length>0){
			var flag=true;
			//对比当前已经添加的时间规格
			dome.each(function(k,v){
				var dTime=$(v).text();
				if(dTime==time){
					alert("该时间已添加");
					flag=false;
					return false;
				}
			});
			if(flag){
				dome.html(time);
				inV.val(time);
			}
		}
	})
}
spec.onTime($('.time_change'));
/*
	规格增加一行
*/
spec.addTr=function(e){
	var box=$(e).prev('table').children('tbody'),
		option=$("#typeOption").val(),
		str="",
		num=$(e).parent().data('tableid'),
		i=box.find('tr').length+1;
	str+='<tr data-trid="'+i+'"><td><input type="text" class="form-control input-sm" name="item_s['+num+'][row]['+i+'][art]"></td>';
	str+='<td><input type="text" class="form-control input-sm" name="item_s['+num+'][row]['+i+'][item_name]" value=""></td>';
	str+='<td><select class="form-control input-sm spec_select" name="item_s['+num+'][row]['+i+'][specval]"><option value="">请选择</option>'+option+'</select></td>';
	str+='<td><input type="text" class="form-control input-sm" name="item_s['+num+'][row]['+i+'][price]"></td>';
	str+='<td><input type="text" class="form-control input-sm" name="item_s['+num+'][row]['+i+'][cost_price]"></td>';
	str+='<td><input type="text" class="form-control input-sm" name="item_s['+num+'][row]['+i+'][mktprice]"></td>';
	str+='<td><input type="text" class="form-control input-sm" name="item_s['+num+'][row]['+i+'][stock]"></td></tr>';
	box.append(str);
	$('tr[data-trid="'+i+'"]').find("select").select2();
}



/*
	删除规格
*/
spec.del=function(e,id){
	$('#tab'+id+'').remove();
	$(e).parents("li").remove();
}


