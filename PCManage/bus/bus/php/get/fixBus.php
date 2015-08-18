<?php
/**
 * *****************预约修改******************
 */
require_once '../../../common/php/dbaccess.php';
session_start();
if(isset($_SESSION['emp_number'])){
	$BTime = $_GET ['fixtime']; // 修改后的预约时间
//	echo $BTime;die;
	$FStop = $_GET ['fixpark']; // 修改后的下车站点
	$FRDate = $_GET ['FRDate']; // 修改前的预约日期
	$emp_num=$_SESSION['emp_number']; // 职员姓名
	// 获取小时数
	$data_hour = date ( 'H', time () );
	// echo $data_hour;
	$day=date('Y-m-d H:i:s',time());
	if ($data_hour >= 17) {
		die ( '3' ); // 请在每天下午5点之前修改预约
	} else {
		if (isset ( $BTime )  && isset ( $FStop )) {
			if (isset ( $FRDate ) ) {
//			echo "123";
				$db = new DB ();
				$week = date ( 'w', $BDate );
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
				$sql_stop = "select FID from t_hs_stop where FName='{$FStop}' ";
				$res_stop = $db->getrow ( $sql_stop );
				// echo $sql_stop;
				$sql_mod = "update  t_hs_overwork_reserv set FStopID='{$res_stop['FID']}' , FRTime='{$BTime}'  , FDate='{$day}'  where FNumber='{$emp_num}' and FRDate='{$FRDate}'";
//				echo $sql_mod;DIE;
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
