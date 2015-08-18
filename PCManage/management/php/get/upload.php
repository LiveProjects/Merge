<?php

require_once '../../../common/php/non_get/dbaccess.php';
header ( 'content-type:text/html;charset=utf-8' );
//电脑上的文件的文件名
$file_name=$_FILES['favfood']['name'];
$file_tempname=$_FILES['favfood']['tmp_name'];



$dishname=$_POST['disname'];
$disintro=$_POST['dishintro'];
echo $dishname;

/* 设置允许的文件类型 */
$allowtype=array("jpg","png","gif");
/* 设置保存路径 */
/*相对路径*/
$path='../../../../common/uploads/';
/*绝对路径*/

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

$hz=array_pop(explode('.', $file_name));
if(!in_array($hz, $allowtype)){
	die("这个后缀是不允许的");
} 

/* 判断文件大小 */
if($file_size>$size){
	die("超出文件大小");
}
$file_name=date("YmdHis").rand(100, 999).".".$hz;

if(move_uploaded_file($file_tempname, $path.$file_name)){
	$db=new DB();
	
	$food['FID']=$_SESSION['user']['number'];//临时
	$food['upname']=$_SESSION['user']['name'];//提报人姓名
	$food['dishname']=$_POST['dishname'];//菜名
	$food['intro']=$_POST['dishintro'];//介绍
	$food['url']=$path.$file_name;//路径
	$food['date']=date ( 'Y-m-d H:i:s', time () );//提交时间
	$food['num']=0;//点赞数初始化
	
	//$res=$db->insert(t_hs_favfood, $food);
	// 判断是否重复预约
	/* $sql_repeat = "select FID from t_hs_college_reserv where FNumber='{$book['FNumber']}' and FRDate='{$book ['FRDate']}' ";
	$res_repeat = $db->getrow ( $sql_repeat ); */
	
	if (empty ( $res_repeat )) { // 没有重复预约
		// 向数据库插入数据
		$res=$db->insert(t_hs_favfood, $food);
		if ($res) {
			echo 1; // 预约成功
		} else {
			echo 0; // 预约失败，请联系技术支持
		}
	} else {
		//提示更新
		$sql_update = "update t_hs_college_reserv set FStopID='{$book['FStopID']}' , FRTime='{$book ['FRTime']}' , FDate='{$book ['FDate']}', FNum='{$book ['FNum']}' where FID='{$res_repeat['FID']}'";
		$res_update = $db->execsql ( $sql_update );
		if ($res_update) {
			echo 1; // 预约成功
		} else {
			echo 0; // 预约失败，请联系技术支持
		}
	}
	
}

echo $file_name;

?>