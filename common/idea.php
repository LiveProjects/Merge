<?php 
require_once 'dbaccess.php';
header ( 'content-type:text/html;charset=utf-8' );
session_start();
$db=new DB();

$idea=array();
$idea['ideaType']=$_GET['ideaType'];
$idea['ideaCon']=$_GET['ideaCon'];
$idea['ideaAdd']=$_GET['ideaAdd'];

//echo json_encode($idea);
if(empty($_GET['ideaType'])||empty($_GET['ideaCon'])||empty($_GET['ideaAdd'])){
	echo 2;//空值检测
}else {
	$res=$db->insert(t_hs_idea, $idea);
	if($res){
		echo 1;//提交成功
	}else{
		echo 0;//提交失败
	}
}

/* if(!isset ( $_SESSION ['emp_number'] )){
	
}else {
	
} */


?>