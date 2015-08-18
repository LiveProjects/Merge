<?php
/*
 * 构造预约记录的数据结构，将预约记录提交到数据表t_hs_overwork_reserv
 */
require_once '../../../common/php/dbaccess.php';
session_start ();
if (! isset ( $_SESSION ['emp_number'] )) {
	echo 0; // 预约失败，请联系技术支持
	die ();
} else {
	$emp_number = $_SESSION ['emp_number'];
	$FRTime = $_GET ['FRTime']; // 加班时间
	$FRDate = $_GET ['FRDate']; // 加班日期
    // $FRDate = "2015-7-31"; // 加班日期
	$FStop = $_GET ['FStop']; // 下车站点
	if (empty ( $FRTime ) || empty ( $FRDate ) || empty ( $FStop )) {
		echo 2; // 请检查空项
		die ();
	} else {
		if ($FRTime=='无加班时间项'){
			$FRTime=NULL;
		}
		$week = date ( 'w', strtotime ( $FRDate ) );
		// echo "haha".$week."hah";
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
		$db = new DB ();
		// 查询下车站点编号
		$sql_id_stop = "select FID from t_hs_stop where FName='{$FStop}'";
		$res_id_stop = $db->getrow ( $sql_id_stop );
		// 构造数据库结构
		$book = array ();
		$book ['FNumber'] = $emp_number;
		$book ['FStopID'] = $res_id_stop ['FID'];
		$book ['FRTime'] = $FRTime;
		$book ['FRDate'] = $FRDate;
		$book ['FType'] = $FType;
		$book ['FDate'] = date ( 'Y-m-d H:i:s', time () );
		// $book ['FBookID'] = $res_id_book ['FID'];
		// print_r($book);die;
		// 判断是否重复预约
		$sql_repeat = "select FID from t_hs_overwork_reserv where FNumber='{$book['FNumber']}' and FRDate='{$book ['FRDate']}' ";
		$res_repeat = $db->getrow ( $sql_repeat );
		// echo $res_repeat['FID'];
		if (empty ( $res_repeat )) { // 没有重复预约
		                             // 向数据库插入数据
			$insert = $db->insert ( 't_hs_overwork_reserv', $book );
			if ($insert) {
				echo 1; // 预约成功
			} else {
				echo 0; // 预约失败，请联系技术支持
			}
		} else {
			$sql_update = "update  t_hs_overwork_reserv set FStopID='{$book['FStopID']}' , FRTime='{$book ['FRTime']}' , FDate='{$book ['FDate']}' where FID='{$res_repeat['FID']}'";
			$res_update = $db->execsql ( $sql_update );
			if ($res_update) {
				echo 1; // 预约成功
			} else {
				echo 0; // 预约失败，请联系技术支持
			}
		}
	}
}


