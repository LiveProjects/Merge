<?php
/**
 * 周末加班车查询
 */
header ( 'content-type:text/html;charset=utf-8' );
require_once '../../../common/php/dbaccess.php';
$db = new DB ();
// 查询工作日加班班车的线路
$sql_busline = "select FID from t_hs_busline where FType='3'";
$res_busline = $db->execsql ( $sql_busline );
// var_dump($res_busline);die;
foreach ( $res_busline as $key => $value ) {
	// 查出每条线路的站点和发车时间
	$sql_stop = "select  a.FName,a.FTime,a.FRemark as address from t_hs_stop as a inner join t_hs_busline_stop as b on a.FID=b.FStopID where b.FBusID='{$value['FID']}'";
	$res_stop = $db->execsql ( $sql_stop );
	$stop = array ();
	foreach ( $res_stop as $key1=>$value1 ) {
		$stop[$key1+1]['FID']=$key1+1;
		$stop [$key1+1]['FName'] = $value1 ['FName'];
		$stop[$key1+1]['FTime']=$value1['FTime'];
		$stop[$key1+1]['address']=$value1['address'];
	} 
	$res_busline [$key] ['stop'] = $stop;
}
/*print_r($res_busline);
echo '<hr/>';*/
echo json_encode ( $res_busline );