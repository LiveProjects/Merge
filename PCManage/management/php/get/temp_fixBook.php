<?php
/**
 * *****************临时性班车预约修改******************
 */
require_once '../../../common/php/non_get/dbaccess.php';
session_start ();
if (isset ( $_SESSION ['emp_number'] )) {
	$BTime = $_GET ['fixtime']; // 修改后的预约时间
	$FStartStop = $_GET ['fixstartstop']; // 修改后的始发站
	$FEndStop = $_GET ['fixendstop']; // 修改后的终点站
	$FNum = $_GET ['FNum']; // 修改后的用车人数
	$FType = $_GET ['FType']; // 修改后的单程或往返
	$FRDate = $_GET ['FRDate']; // 修改前的预约日期
	$emp_num = $_SESSION ['emp_number']; // 职员编号
	                                  
	$data_hour = date ( 'H', time () );// 获取小时数
	// echo $data_hour;
	if ($data_hour >= 17) {
		die ( '3' ); // 请在每天下午5点之前修改预约
	} else {
		if (isset ( $BTime ) && isset ( $FStartStop )&& isset ( $FEndStop )&& isset ( $FNum )&& isset ( $FType )) {
			if (isset ( $FRDate )) {
				$day=date('Y-m-d H:i:s',time());
				$db = new DB ();
				switch ($FType) {
					case '单程' :
						$FType=0;
						break;
					case '往返' :
						$FType=1;
						break;
					default :
						break;
				}
				$sql_mod = "update  t_hs_overwork_reserv set FNum='{$FNum}' , FRTime='{$BTime}'  ,FStartStop='{$FStartStop}', FEndStop='{$FEndStop}',FType='{$FType}' ,FDate='{$day}'  where FNumber='{$emp_num}' and FRDate='{$FRDate}'";
				// echo $sql_mod;DIE;
				$res_mod = $db->execsql ( $sql_mod );
				$num_row = mysql_affected_rows ();
				if ($num_row) {
					echo 1; // 修改成功
				} else {
					echo 0; // 修改失败，请联系技术支持
				}
			} else {
				echo 0; // 修改失败，请联系技术支持
			}
		} else {
			echo 2; // 请检查空项
		}
	}
}
