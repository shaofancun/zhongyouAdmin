"use strict";
var tbody=$("#tbody");
/*
	添加一行
*/
$("#addTr").click(function(){
	var i=tbody.find('tr').length+1,
		str='';
	str+='<tr><td><input type="text" class="form-control" name="items['+i+'][name]"></td>';
	str+='<td><input type="text" class="form-control" name="items['+i+'][type]"></td>';
	str+='<td><textarea name="items['+i+'][info]" class="form-control"></textarea></td>';
	str+='<td><button type="button" class="btn green upload'+i+'">上传附件 <i class="fa fa-plus"></i></button><input type="hidden" name="items['+i+'][doc]"><a href="" class="btn blue">查看</a></td>';
	str+='<td><button type="button" class="btn red delete">删除</button></td></tr>';
	tbody.append($(str).hide().fadeIn(500));
	upload(i);
})
/*
	删除一行
*/
$(document).on('click','.delete',function(){
	var _this=$(this).parents("tr");
	_this.animate({opacity:0},500,function(){
		_this.remove();
	})
})
/*
	上传附件
*/
function upload(i){
	var i=(i)?i:'';
	KindEditor.ready(function(K) {
		var editor = K.editor({
			allowFileManager : true,
			uploadJson : '../a.php',
		});
		K('.upload'+i+'').click(function() {
			var _this=$(this).next();
			editor.loadPlugin('insertfile', function() {
				editor.plugin.fileDialog({
					clickFn : function(url, title) {
						_this.val(url);
						_this.next().attr('href',url);
						editor.hideDialog();
					}
				});
			});
		});
	});
}
upload();