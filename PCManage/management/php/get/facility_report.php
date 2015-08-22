<?php
header ( 'content-type:text/html;charset=utf-8' );
require_once '../../../common/php/non_get/dbaccess.php';
$db = new DB ();
session_start ();
$init = array ();
$init ['emp_name'] = $_SESSION ['user'] ['name']; // 报修人姓名
$init ['com_name'] = $_SESSION ['user'] ['companyname']; // 报修人所在公司
if (isset ( $init ['emp_name'] ) && isset ( $init ['com_name'] )) {
	
	// 查询登录者的联系方式
	$sql_phone = "select FPhone from t_hs_employee where FNumber='{$_SESSION['user']['number']}'";
	$res_phone = $db->getrow ( $sql_phone );
	$init ['phone'] = $res_phone ['FPhone'];
	// 查询部门信息
	$sql_sec = "select FName from t_hs_section where FCompanyID='{$_SESSION['user']['companyID']}' ";
	$res_sec = $db->execsql ( $sql_sec );
	$init ['sec'] = $res_sec;
	// 查询办公楼信息
	$sql_building = "select FName from t_hs_building ";
	$res_building = $db->execsql ( $sql_building );
	$init ['building'] = $res_building;
	/*
	 * 点击预约按钮，将预约数据提交到数据库$_GET['type']='submit'
	 */
	// $type = $_GET ['type'];
	$type = 'submit';
	if ($type == 'submit') {
		$report = array ();
		$report ['FNumber'] = $_SESSION ['user'] ['number'];
		$report ['FDate'] = date ( 'Y-m-d H:i:s', time () );
		// $report ['FLocation'] = $_GET ['FLocation']; // 具体位置
		// $report ['FProblem'] = $_GET ['FProblem']; // 存在问题
		// $building_name = $_GET ['building_name']; // 楼号
		// $sec_name = $_GET ['sec_name']; // 部门名称
		$report ['FLocation'] = '三楼'; // 具体位置
		$report ['FProblem'] = '空调出风口有问题'; // 存在问题
		$building_name = 'A1'; // 楼号
		$sec_name = '信息研发部1';
		if (isset ( $report ['FLocation'] ) && isset ( $report ['FProblem'] ) && isset ( $building_name ) && isset ( $sec_name )) {
			// 查询楼号ID
			$sql_building_id = "select FID from t_hs_building where FName='{$building_name}'";
			$res_building_id = $db->getrow ( $sql_building_id );
			$report ['FBuildingID'] = $res_building_id ['FID'];
			// 查询出所选部门的ID
			$sql_sec_id = "select FID from t_hs_section where FName='{$sec_name}'";
			$res_sec_id = $db->getrow ( $sql_sec_id );
			$report ['FSectionID'] = $res_sec_id ['FID'];
			// echo $report['FSectionID'];die;
			$insert = $db->insert ( 't_hs_facility_report', $report );
			if ($insert) {
				$init ['error'] = 1; // 预约成功
			} else {
				$init ['error'] = 0; // 预约失败，请联系技术支持
			}
		} else {
			$init ['error'] = 2; // 请检查空项
		}
	}
	print_r ( $init );	die ();
	// echo json_encode ( $init );
}
