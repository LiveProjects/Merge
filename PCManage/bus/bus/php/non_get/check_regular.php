<?php
/**
 * 工作日常规班车查询
 */
header ( 'content-type:text/html;charset=utf-8' );
require_once '../../../common/php/dbaccess.php';
$db = new DB ();
// 查询工作日常规班车的线路
$sql_busline = "select FID,FName from t_hs_busline where FType='1'";
$res_busline = $db->execsql ( $sql_busline );
// var_dump($res_busline);die;
foreach ( $res_busline as $key => $value ) {
	// 查出每条线路的站点
	$sql_stop = "select a.FName from t_hs_stop as a inner join t_hs_busline_stop as b on a.FID=b.FStopID where b.FBusID='{$value['FID']}'";
	$res_stop = $db->execsql ( $sql_stop );
	$stop = array ();
	foreach ( $res_stop as $value1 ) {
		$stop [] = $value1 ['FName'];
	}
	$res_busline [$key] ['stop'] = $stop;
	// 查出每条线路的发车时间
	$sql_time = "select FTime from t_hs_bustime where FBusID='{$value['FID']}'";
	$res_time = $db->execsql ( $sql_time );
	$time = array ();
	foreach ( $res_time as $value2 ) {
		$time [] = $value2 ['FTime'];
	}
	$res_busline [$key] ['time'] = $time;
}
// var_dump($res_busline);
// echo '<hr/>';
echo json_encode ( $res_busline );