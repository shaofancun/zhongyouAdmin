"use srtict";
var trip=new Object(),
	addbox=$("#addTripForm");
var pordId=$("#prodId").val(),		//商品ID
	tripBox=$("#tripBox");		//表格
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
/*
	行程图片上传
*/
var uploader = new plupload.Uploader({
    browse_button : 'tripPickfiles', 		//选择图片按钮
    url : "../handleUp.php",		//上传地址
    filters : {
        max_file_size : '4mb',		//允许最大4M
        mime_types: [
            {title : "Image files", extensions : "jpg,gif,png"}
        ]
    },
    init: {
        QueueChanged: function(){
            uploader.start();
        },
       	//上传结果
        FileUploaded: function(up, file, data) {
            var response = $.parseJSON(data.response);
            if (response.success==1) {
                var img='<div class="img_l"><img src="'+response.url+'"></div>';
                $(".trip_img_box").append(img);
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
		detailed=editor.html(),		//具体行程
		imgUp=new Object();		//图片
		imgs=$(".trip_img_box").find("img");
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
			var str='';
			str+='<tr><td>第'+num+'天</td>';
			str+='<td>'+name+'</td>';
			str+='<td>'+explain+'</td>';
			str+='<td><a href="javascript:;" class="btn green btn-sm">编辑 <i class="glyphicon glyphicon-edit"></i></a>';
			str+='<a href="javascript:;" class="btn default btn-sm">删除 <i class="glyphicon glyphicon-remove"></i></a>';
			str+='</td></tr>';
			addbox.modal("hide");
			tripBox.append(str);
		}
	})
}
