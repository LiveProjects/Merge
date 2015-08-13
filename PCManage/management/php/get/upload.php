<?php

header ( 'content-type:text/html;charset=utf-8' );
//电脑上的文件的文件名
$file=$_FILES['favfood']['name'];
//上传文件大小
$file_size=$_FILES['favfood']['size'];
//上传文件临时文件名
$file_tempname=$_FILES['favfood']['temp_name'];
//上传文件报错
$file_error=$_FILES['favfood']['error'];
//上传文件类型
$file_type=$_FILES['favfood']['type'];

/* 设置允许的文件类型 */
$allowtype=array("jpg","png","gif");
/* 设置保存路径 */
$path='./uploads';
/* 设置文件大小 */
$size=1000000;

if($file_error>0){
	switch ($file_error){
		case 1:die("上传文件超出了大小限制");
		case 2:die("超出表单约定值");
		case 3:die("部分被上传");
		case 4:die("无上传文件");
		case 5:die("未知错误");
	}
}
/* 判断上传文件是否为允许类型 */
$hz=array_pop(explode('.', $file));
if(!in_array($hz, $allowtype)){
	die("这个后缀是不允许的");
}

/* 判断文件大小 */
if($file_size>$size){
	die("超出文件大小");
}
$file=date("YmdHis").rand(100, 999).".".$hz;

/* 判断是否上传文件和能否成功移动文件 */
if(is_uploaded_file($file_tempname)){
	if(!move_uploaded_file($file_tempname, $path.'/'.$file)){
		die("不能移动文件到指定目录");
	}
}else {
	die("上传失败");
}


echo "文件上传成功，保存在目录{$path}中,大小为{$file_size}";

?>