<?php
/**
 * 根据职员编号查询职员的姓名及所在的公司和部门,并将部门和公司存入session中
 */
header ( 'content-type:text/html;charset=utf-8' );
require_once 'dbaccess.php';
$db = new DB ();
session_start ();
$_SESSION['emp_number'] = '0001';
// $res = array ();
// if (isset ( $_SESSION ['emp_number'] )) {
$emp_num = $_SESSION ['emp_number'];
$sql_name_com = "SELECT b.FName as Company,a.FName as name,a.FSectionID as Section FROM t_hs_employee as a inner join t_hs_company as b on a.FCompanyID=b.FID WHERE a.FNumber = '{$emp_num}' ";
$res_name_com = $db->getrow ( $sql_name_com );
// echo $sql_name_com;
$sql_name_sec = "select FName from t_hs_section where FID='{$res_name_com['Section']}'";
$res_name_sec = $db->getrow ( $sql_name_sec );
$res_name_com ['Section'] = $res_name_sec ['FName'];
// var_dump($res_name_com);
$res_name_com ['number'] = $emp_num;
$_SESSION ['emp_name'] = $res_name_com ['name'];
$_SESSION ['emp_company'] = $res_name_com ['Company'];
$_SESSION ['emp_section'] = $res_name_com ['Section'];
// var_dump ( $_SESSION );
 echo json_encode ( $res_name_com );
// }

?>