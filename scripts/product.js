"use srtict";
$(function() {
    
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
	$.ajax({
		url:'../class.php',
		type:'POST',
		dataType:'json'
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
/*
	主图图片上传
*/
var uploader = new plupload.Uploader({
    browse_button : 'handlePickfiles', 		//选择图片按钮
    container: 'handleContainer', 		//图片容器
    url : "../handleUp.php",		//上传地址
    filters : {
        max_file_size : '4mb',		//允许最大4M
        mime_types: [
            {title : "Image files", extensions : "jpg,gif,png"}
        ]
    },
    init: {
        PostInit: function(){
            //开始上传
            $('#handleUploadfiles').click(function() {
                uploader.start();
                return false;
            });
            //删除队列里的图片
            var filelist=$('#handleFilelist');
            filelist.html("");
            filelist.on('click', '.added-files .remove', function(){
                uploader.removeFile($(this).parent('.added-files').attr("id"));    
                $(this).parent('.added-files').remove();                     
            });
			//绑定默认图片事件
			var imgBox=$("#handleImgBox");
			imgBox.on("click",".handleDefault",function(){
				var _this=$(this),
					id=_this.parents("li").data("imgid");
				$.post("../success.php",{id:id}).done(function(data){
					var data=eval("(" + data + ")");
					if(data.success){
						$(".handleDefault").removeClass("btn-success").html('设为默认图片');
						_this.addClass('btn-success').html('默认图片');
					}
				})
			})
			//删除已经上传的图片
			imgBox.on("click",".handleDelImg",function(){
				var _this=$(this).parents("li"), 
					id=_this.data("imgid");
				$.post("../success.php",{id:id}).done(function(data){
					var data=eval("(" + data + ")");
					if(data.success){
						_this.animate({opacity : 0},500,function(){
				            _this.remove();
				        });
					}
				})
			})
        },
        //添加图片到上传队列
        FilesAdded: function(up, files) {
            plupload.each(files, function(file) {
                $('#handleFilelist').append('<div class="alert alert-warning added-files" id="' + file.id + '">' + file.name + '(' + plupload.formatSize(file.size) + ') <span class="status label label-info"></span>&nbsp;<a href="javascript:;" style="margin-top:-5px" class="remove pull-right btn btn-sm red"><i class="fa fa-times"></i> 删除</a></div>');
            });
        },
        //上传进度
        UploadProgress: function(up, file) {
            $('#' + file.id + ' > .status').html(file.percent + '%');
        },
       	//上传结果
        FileUploaded: function(up, file, data) {
            var response = $.parseJSON(data.response);
            if (response.success==1) {
                $('#' + file.id + ' > .status').removeClass("label-info").addClass("label-success").html('<i class="fa fa-check"></i> 上传成功')
                $('#' + file.id + '').animate({opacity : 0},1000,function(){
		            $('#' + file.id + '').remove();
		        });
		        //添加到图片框
		        var str='';
		        str+='<li class="handle_img" data-imgid="'+response.id+'">';
				str+='<img src="'+response.url+'" draggable="false">';
				str+='<div class="handle_img_fun">';
				str+='<button type="button" class="btn btn-default btn-xs handleDefault"> 设为默认图片 </button>';
				str+='<button type="button" class="btn btn-default btn-xs handleDelImg"><i class="fa fa-trash-o"></i> 删除 </button>';
				str+='</div></li>';
		        $("#handleImgBox").append($(str).hide().fadeIn(600));
            } else if(response.success==2){
                $('#' + file.id + ' > .status').removeClass("label-info").addClass("label-danger").html('<i class="fa fa-warning"></i> 只能上传3张图片');
            }else{

            }
        },
        Error: function(up, err) {
            Metronic.alert({type: 'danger', message: err.message, closeInSeconds: 10, icon: 'warning'});
        }
    }
});
uploader.init();
/*
	拖动图片排序，并赋值
*/
$( "#handleImgBox").disableSelection();
$("#handleImgBox").sortable({
	opacity: 0.6, //设置拖动时候的透明度 
    revert: true, //缓冲效果 
    cursor: 'move', //拖动的时候鼠标样式 
    update:function(){
    	var _this=$(this),
    		order=[];
    	_this.children(".handle_img").each(function(i,v){
    		order.push($(v).data("img"));
    	})
    	$("#prodImgs").val(order);
    }
});

