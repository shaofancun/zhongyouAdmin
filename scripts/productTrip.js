"use srtict";
var trip=new Object(),
	addBox=$("#addTripForm"),
	editBox=$("#editTripForm");
var pordId=$("#prodId").val(),		//商品ID
	tripBox=$("#tripBox");		//表格
/*
	富文本绑定初始化
*/
var addDetailed,editDetailed;
KindEditor.ready(function(K) {
    addDetailed = K.create('#detailed',{
        uploadJson:'/imageuc/kindeditor/upload?',
        resizeType :1,
        width:'100%',
        height:'300px',
        allowPreviewEmoticons : true,
        allowImageUpload : true,
	    items : [
	    	'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline','removeformat', '|', 'justifyleft', 'justifycenter', 'justifyright', 'insertorderedlist','insertunorderedlist'
			]
    });	
});
/*
	行程图片上传
*/
var uploader = new plupload.Uploader({
    browse_button : 'tripPickfiles', 		//选择图片按钮
    url : "../handleUp.php",		//上传地址
    multi_selection: false,
    filters : {
        max_file_size : '4mb',		//允许最大4M
        mime_types: [
            {title : "Image files", extensions : "jpg,gif,png"}
        ]
    },
    init: {
    	PostInit:function(){
    		//删除图片
    		$(".trip_img_box").on("click",".trip_img_del",function(){
				$(this).parent().remove();
			})
    	},
        FilesAdded: function(uploader,files){
        	// var imgs=$(".trip_img_box .img_l").length;
        	// if(imgs>=3){
        	// 	uploader.removeFile(files[0].id);  
        	// 	alert("只能上传3张图片");
        	// 	return false;
        	// }else{
        		uploader.start();
        	//}
        },
       	//上传结果
        FileUploaded: function(up, file, data) {
            var response = $.parseJSON(data.response);
            if (response.success==1) {
                var img='<div class="img_l"><span class="trip_img_del"></span><img src="'+response.url+'"></div>';
                $(".trip_img_box").append(img);
            }else{
            	alert("只能上传3张图片");
            }
        }
    }
});
uploader.init();
/*
	增加行程
*/
trip.add=function(){
	var num=$("#num").val(),		//序号
		name=$("#name").val(),		//标题
		explain=$("#explain").val(),		//摘要
		detailed=addDetailed.html(),		//具体行程
		imgUp=new Object();		//图片
		imgs=$("#addTripForm .trip_img_box").find("img");
	//获取图片地址
	if(imgs.length>0){
		imgs.each(function(i,v){
			var url=$(v).attr("src");
			imgUp[i]=url;
		})
	}
	if(!name){
		alert("请输入行程标题");
		return false;
	}
	$.ajax({
		url:'../success.php',
		type:'POST',
		dataType:'json',
		data:{
			pordId:pordId,
			num:num,
			name:name,
			explain:explain,
			detailed:detailed,
			imgUp:imgUp
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
	编辑行程
*/
$(".edit").click(function(){
	var _this=$(this),
		id=_this.parents("tr").data("tripid"),
		box=$("#editTripForm .modal-body");
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
	KindEditor.ready(function(K) {
    	editDetailed = K.create('#editDetailed',{
	        uploadJson:'/imageuc/kindeditor/upload?',
	        resizeType :1,
	        width:'100%',
	        height:'300px',
	        allowPreviewEmoticons : true,
	        allowImageUpload : true,
		    items : [
		    	'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline','removeformat', '|', 'justifyleft', 'justifycenter', 'justifyright', 'insertorderedlist','insertunorderedlist'
				]
	    });	
	});
	editBox.modal("show");
	
})
trip.edit=function(){
	var id=$("#tripId").val(),
		num=$("#editNum").val(),		//序号
		name=$("#editName").val(),		//标题
		explain=$("#editExplain").val(),		//摘要
		detailed=editDetailed.html(),		//具体行程
		imgUp=new Object();		//图片
		imgs=$("#editTripForm .trip_img_box").find("img");
	//获取图片地址
	if(imgs.length>0){
		imgs.each(function(i,v){
			var url=$(v).attr("src");
			imgUp[i]=url;
		})
	}
	if(!name){
		alert("请输入行程标题");
		return false;
	}
	$.ajax({
		url:'../success.php',
		type:'POST',
		dataType:'json',
		data:{
			id:id,
			pordId:pordId,
			num:num,
			name:name,
			explain:explain,
			detailed:detailed,
			imgUp:imgUp
		}
	}).done(function(data){
		if(data.success){
			editBox.modal("hide");
		}
	})
}