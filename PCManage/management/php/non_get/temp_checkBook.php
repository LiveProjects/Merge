<?php
/**
 * 查看临时性班车预约记录的页面
 */
header ( 'content-type:text/html;charset=utf-8' );
require_once '../../../common/php/non_get/dbaccess.php';
session_start ();
if (isset ( $_SESSION ['emp_number'] ) && isset ( $_SESSION ['emp_company'] ) && isset ( $_SESSION ['emp_section'] )) {
	$emp_num = $_SESSION ['emp_number'];
	$db = new DB ();
	/*
	 * ****************预约查看*********************
	 */
	// 查找当天之后的预约记录
	$from = date ( 'Y-m-d', time () ) . " 00:00:00";
	$sql_check = "select FStartStop,FEndStop,FNum,FRDate,FRTime,FType from t_hs_temporary_reserv where FNumber='{$emp_num}' and FRDate>='{$from}' order by FRDate asc";
	$res_check = $db->execsql ( $sql_check );
	// echo $sql_check;die;
	// var_dump($res_check);die;
	$num = count ( $res_check );
	if ($num) {
		for($i = 0; $i < $num; $i ++) {
			$data = explode ( ' ', $res_check [$i] ['FRDate'] );
			// var_dump($data);
			$res_check [$i] ['FRDate'] = $data [0];
			if ($res_check [$i] ['FType'] == 1) {
				$res_check [$i] ['FType'] = '往返';
			} else {
				$res_check [$i] ['FType'] = '单程';
			}
		}
	}
	// 将查到的公司信息与职员的预约记录以JSON格式输出
	$check_data = array (
			'emp_company' => $_SESSION ['emp_company'],
			'emp_name' => $_SESSION ['emp_name'],
			'check' => $res_check 
	);
	var_dump($check_data);die;
	/* $checkjson = json_encode ( $check_data );
	echo $checkjson; */
}
?>
