<?php
header ( 'content-type:text/html;charset=utf-8' );
require_once  '../../../common/php/non_get/dbaccess.php';
$db = new DB ();
session_start ();

if (isset ( $_SESSION ['emp_number'] )) {
	
	$emp_number = $_SESSION ['emp_number'];

	$FNumber=$_GET['FNumber'];//提交人编号
	$FCompanyID=$_GET['FCompanyID'];
	$FNum=$_GET['FNum'];//人数
	$FRTime = $_GET ['FRTime']; // 班车预约时间
    $FRDate = $_GET ['FRDate']; // 班车预约日期
	$FStop = $_GET ['FStop']; // 班车预约下车站点,需要查询ID号
    $CurDate=$_GET['FDate']; //当前日期


    //echo $FRTime.$FRDate.$FStop;
	
	if (empty ( $FRTime ) || empty ( $FRDate ) || empty ( $FStop )) {
		echo 2; // 请检查空项
		die ();
	}else { 
		
		$week = date ( 'w', strtotime ( $FRDate ) );
		//echo "$week";
		switch ($week) {
			case 1 :
			case 2 :
			case 3 :
			case 4 :
			case 5 :
				$FType = 1;
				break;
			case 6 :
				$FType = 2;
				break;
			default :
				break;
		}
		//$link="insert into t_hs_collage_reserv values (default,$company,$company,$num,$date,$time,$park,$date)";
		
		// 查询下车站点编号
		$sql_id_stop = "select FID from t_hs_stop where FName='{$FStop}'";
		$res_id_stop = $db->getrow ( $sql_id_stop );
		//echo $sql_id_stop;
		
		$book=array();
		
		$book ['FNumber'] = $FNumber;
		$book ['FCompanyID'] = $FCompanyID;

		$book ['FStopID'] = $res_id_stop['FID'];
		$book ['Num'] = $FNum;
		$book ['FRDate'] = $FRDate;
		$book ['FRTime'] = $FRTime;
	    $book ['CurDate'] = $CurDate;

	    echo $book ['FNumber'].$book ['FCompanyID'].$book ['Num'].$book ['FRDate'].$book ['FRTime'].$book ['FStopID'].$book ['CurDate'];
		
		// 判断是否重复预约
		/*$sql_repeat = "select FID from t_hs_collage_reserv where FNumber='{$book['FNumber']}' and FRDate='{$book ['FRDate']}' ";
		$res_repeat = $db->getrow ( $sql_repeat ); *//**//**//*
		
		
		if (empty ( $res_repeat )) { // 没有重复预约
			// 向数据库插入数据
			$res=$db->insert(t_hs_collage_reserv, $book);
			if ($res) {
				echo 1; // 预约成功
			} else {
				echo 0; // 预约失败，请联系技术支持
			}
		} else {
			//提示更新
			$sql_update = "update  t_hs_overwork_reserv set FStopID='{$book['FStopID']}' , FRTime='{$book ['FRTime']}' , FDate='{$book ['FDate']}' where FID='{$res_repeat['FID']}'";
			$res_update = $db->execsql ( $sql_update );
			if ($res_update) {
				echo 1; // 预约成功
			} else {
				echo 0; // 预约失败，请联系技术支持
			}
		}*/

	}
}


?>