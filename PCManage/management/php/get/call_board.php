<?php
header ( 'content-type:text/html;charset=utf-8' );
require_once  '../../../common/php/non_get/dbaccess.php';

session_start ();

if(empty($_GET['calltype'])&&empty($__GET['callcon'])){
    echo 2;//空值
}else{
	$db = new DB ();
	
	$call['FType']=$_GET['calltype'];
	$call['FContent']=$_GET['callcon'];
	$call['FDate']=date ( 'Y-m-d H:i:s', time () );
	$call['FUserID']=$_SESSION['user']['number']; 
	
	$res=$db->insert(t_hs_call_board, $call);
	if($res){
		echo 1;//成功
	}else{
		echo 0;//失败
	}
}


?>