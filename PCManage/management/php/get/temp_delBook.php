<?php
/**
 * 
 * *****************临时性班车预约删除******************
 */
require_once '../../../common/php/non_get/dbaccess.php';
$db = new DB ();
session_start ();

if (isset ( $_SESSION ['emp_number'] )) {
	$emp_num = $_SESSION ['emp_number'];
	$time = date ( 'H', time () );
	// echo $time;die;
	if ($time >= 17) {
		die ( '2' ); // 请在每天下午5点之前删除预约
	} else {
		$BDate = $_GET ['FRDate'] . ' 00:00:00';
		/* $FID = $_GET ['FRDate']; */
		if (isset ( $BDate )) {
			$sql_del = "delete From t_hs_temporary_reserv where FNumber='{$emp_num}' and FRDate='{$BDate}'";
			/* $sql_del = "delete t_hs_overwork_reserv where FID='{$FID}' "; */
			$res_del = $db->execsql ( $sql_del );
			$res = mysql_affected_rows ();
			if ($res) {
				echo 1; // 删除成功
			} else {
				echo mysql_error ();
				echo 0; // 删除失败，请联系技术支持
			}
		} else {
			echo 0; // 删除失败，请联系技术支持
		}
	}
}
