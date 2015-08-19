<?php
/**
 * 查看海信学院班车预约记录的页面
 */
header ( 'content-type:text/html;charset=utf-8' );
require_once '../../../common/php/non_get/dbaccess.php';
session_start ();
if (isset ( $_SESSION['user']['number'] ) && isset ( $_SESSION['user']['companyname'] ) && isset ( $_SESSION['user']['sectionname'] )) {
	$emp_num = $_SESSION['user']['number'];
	$db = new DB ();
	/*
	 * ****************预约查看*********************
	 */
	// 查找当天之后的预约记录
	$from = date ( 'Y-m-d', time () ) . " 00:00:00";
	$sql_check = "select FNum,FRDate,FRTime,FStopID from t_hs_college_reserv where FNumber='{$emp_num}' and FRDate>='{$from}' order by FRDate asc";
	$res_check = $db->execsql ( $sql_check );
	// echo $sql_check;die;
	// var_dump($res_check);die;
	$num = count ( $res_check );
	// 将查到的公司信息与职员的预约记录以JSON格式输出
	$check_data = array (
			'emp_company' => $_SESSION['user']['companyname'],
			'emp_name' => $_SESSION ['emp_name'],
			'check' => $res_check 
	);
	//var_dump($check_data);die;
	$checkjson = json_encode ( $check_data );
	echo $checkjson;
}
?>