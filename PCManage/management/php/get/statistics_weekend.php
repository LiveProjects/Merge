<?php
/**
 * 周末加班班车统计
 */
header ( 'content-type:text/html;charset=utf-8' );
require_once '../../../common/php/non_get/dbaccess.php';
$db = new DB ();
// $com_name = $_GET ['com_name']; // 公司名称
// $start = $_GET ['start']; // 开始日期
// $end = $_GET ['end']; // 截止日期
$com_name = 'hisense2';
$start = '2015-08-10 00:00:00';
$end = '2015-10-10 00:00:00';
if (isset ( $com_name ) && isset ( $start ) && isset ( $end )) {
	// t_hs_company、t_hs_overwork_reserv与t_hs_employee联合查询，查找出该公司所有职员的编号
	$sql = "select d.FRDate,d.FStopID as FStop from
	 (select b.FNumber from t_hs_company as a inner join t_hs_employee as b on a.FID=b.FCompanyID where a.FName='hisense2')as c 
	INNER  JOIN t_hs_overwork_reserv as d on c.FNumber=d.FNumber 
	where( d.FRDate<='{$end}' and d.FRDate>='{$start}') and d.FType='2' ";
	$res = $db->execsql ( $sql );
	// var_dump($res);
	foreach ( $res as $key => $value ) {
		$sql_stop = "select FName from t_hs_stop where FID='{$value['FStop']}'";
		$res_stop = $db->getrow ( $sql_stop );
		$res [$key] ['FStop'] = $res_stop ['FName'];
	}
// 	var_dump($res);
	echo json_encode ( $res );
}