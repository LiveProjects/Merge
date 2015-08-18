<?php
/**
 * 查看预约班车记录的页面
 */
header ( 'content-type:text/html;charset=utf-8' );
require_once '../../../common/php/dbaccess.php';
session_start ();
if (isset ( $_SESSION ['emp_number'] ) && isset ( $_SESSION ['Company'] ) && isset ( $_SESSION ['Section'] )) {
	$emp_num = $_SESSION ['emp_number'];
	$db = new DB ();
	// 记录本周的起始日期
	/*
	 * $currentdate = strtotime ( date ( 'Y-m-d', time () ) );
	 * $currentweek = date ( 'w', time () );
	 * switch ($currentweek) {
	 * case 1 :
	 * break;
	 * case 2 :
	 * $currentdate -= 1 * 24 * 60 * 60;
	 * break;
	 * case 3 :
	 * $currentdate -= 2 * 24 * 60 * 60;
	 * break;
	 * case 4 :
	 * $currentdate -= 3 * 24 * 60 * 60;
	 * break;
	 * case 5 :
	 * $currentdate -= 4 * 24 * 60 * 60;
	 * break;
	 * case 6 :
	 * $currentdate -= 5 * 24 * 60 * 60;
	 * break;
	 * case 7 :
	 * $currentdate -= 6 * 24 * 60 * 60;
	 * break;
	 * default :
	 * break;
	 * }
	 * $from = date ( 'Y-m-d', $currentdate ) . " 00:00:00"; // 查询的起始日期
	 */
	/*
	 * ****************预约查看*********************
	 */
	// 查找当天之后的预约记录
	$from = date ( 'Y-m-d', time () ) . " 00:00:00";
// 	echo $from;die;
	$sql_check = "select FStopID as FStop,FRDate,FRTime from t_hs_overwork_reserv where FNumber='{$_SESSION['emp_number']}' and FRDate>='{$from}' order by FRDate desc";
// 	echo $sql_check;die;
	$res_check = $db->execsql ( $sql_check );
	// var_dump($res_check);die;
	$num = count ( $res_check );
	if ($num) {
		for($i = 0; $i < $num; $i ++) {
			$sql_state = "select FName as name_stop from  t_hs_stop where FID='{$res_check[$i]['FStop']}'";
			$res_state = $db->getrow ( $sql_state );
			// print_r($res_state);
			$res_check [$i] ['FStop'] = $res_state ['name_stop'];
			$data = explode ( ' ', $res_check [$i] ['FRDate'] );
			// var_dump($data);
			$res_check [$i] ['FRDate'] = $data [0];
			if ($res_check [$i] ['FRTime'] == NULL) {
				$res_check [$i] ['FRTime'] = '无加班时间项';
			}
		}
	}
	// 将查到的公司信息与职员的预约记录以JSON格式输出
	$check_data = array (
			'company' => $_SESSION ['Company'],
			'section' => $_SESSION ['Section'],
			'check' => $res_check 
	);
	// var_dump($check_data);die;
	$checkjson = json_encode ( $check_data );
	echo $checkjson;
}

?>
