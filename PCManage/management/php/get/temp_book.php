<?php
/**
 * 临时性班车预约文件
 */
header ( 'content-type:text/html;charset=utf-8' );
require_once '../../../common/php/non_get/dbaccess.php';
// 开启session，并session内的登录者姓名和其所在公司取出
session_start ();
// echo $_GET ['FNum'] . '<br/>';
// echo $_GET ['FRDate'] . '<br/>';
// echo $_GET ['FRTime'] . '<br/>';
// echo $_GET ['FStartStop'] . '<br/>';
// echo $_GET ['FEndStop'] . '<br/>';
// echo $_GET ['FType'] . '<br/>';
if (isset ( $_SESSION ['emp_name'] ) && isset ( $_SESSION ['emp_company'] )) {
	if (empty ( $_GET ['FNum'] ) || empty ( $_GET ['FRDate'] ) || empty ( $_GET ['FRTime'] ) || empty ( $_GET ['FStartStop'] ) || empty ( $_GET ['FEndStop'] ) || empty ( $_GET ['FType'] )) {
		echo 2; // 请检查空项
	} else {
		$db = new DB ();
		// 查询出所在公司的ID
		$emp_company = $_SESSION ['emp_company']; // 公司名称
		$sql_company_name = "select FID from t_hs_company where FName='{$emp_company}'";
		$res_company_name = $db->getrow ( $sql_company_name );
		if ($_GET ['FType'] == '单程') {
			$type = "0";
		} else {
			$type = "1";
		}
		// 构造数据结构，向t_hs_temporary_reserv插入预约记录
		$book = array ();
		$book ['FNumber'] = $_SESSION ['emp_number']; // 提报人编号
		$book ['FCompanyID'] = $res_company_name ['FID']; // 公司ID
		$book ['FNum'] = $_GET ['FNum']; // 人数
		$book ['FRDate'] = $_GET ['FRDate']; // 使用班车日期
		$book ['FRTime'] = $_GET ['FRTime']; // 时间
		$book ['FStartStop'] = $_GET ['FStartStop']; // 始发站
		$book ['FEndStop'] = $_GET ['FEndStop']; // 终点站
		$book ['FType'] = $type; // 单程或往返
		$book ['FDate'] = date ( 'Y-m-d H:i:s', time () ); // 提报时间
		
		// 判断是否重复预约
		$sql_repeat = "select FID from t_hs_temporary_reserv where FNumber='{$book['FNumber']}' and FRDate='{$book ['FRDate']}' ";
		$res_repeat = $db->getrow ( $sql_repeat );
		// echo $res_repeat['FID'];
		if (empty ( $res_repeat )) { // 没有重复预约
		                             // 向数据库插入数据
			$insert = $db->insert ( 't_hs_temporary_reserv', $book );
			if ($insert) {
				echo 1; // 预约成功
			} else {
				echo 0; // 预约失败，请联系技术支持
			}
		} else {
			$sql_update = "update  t_hs_temporary_reserv set FNum='{$book['FNum']}' ,FType='{$book['FType']}' ,FStartStop='{$book['FStartStop']}' ,FEndStop='{$book['FEndStop']}' , FRTime='{$book ['FRTime']}' , FDate='{$book ['FDate']}' where FID='{$res_repeat['FID']}'";
			$res_update = $db->execsql ( $sql_update );
			if ($res_update) {
				echo 1; // 预约成功
			} else {
				echo 0; // 预约失败，请联系技术支持
			}
		}
	}
}
