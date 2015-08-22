<?php
header("content-type:text/html;charset=utf-8");
require_once '../../../common/php/non_get/dbaccess.php';
$db = new DB ();
//获取当前日期
$date=date("Y-m-d",time())." 00:00:00";
$sql_check="select FID,FRDate,FNumber as FEmp ,FSectionID as FSection,FRoomID as FRoom,FNum,FStartTime,FEndTime from t_hs_meetingroom_reserv where FRDate>='{$date}'";
$res_check=$db->execsql($sql_check);

foreach ($res_check as $key=>$value){
	//查询预约人的姓名、联系方式和公司，以及预约的部门
	$sql_employee="select FName,FPhone,FCompanyID from t_hs_employee where FNumber='{$value['FEmp']}'";
	$res_employee=$db->getrow($sql_employee);
	$sql_com_name="select FName from t_hs_company where FID='{$res_employee['FCompanyID']}'";
	$res_com_name=$db->getrow($sql_com_name);
	$sql_sec_name="select FName from t_hs_section where FID='{$value['FSection']}'";
	$res_sec_name=$db->getrow($sql_sec_name);
	//查询预约的会议室名称
	$sql_room_name="select FName from t_hs_meetingroom where FID='{$value['FRoom']}'";
	$res_room_name=$db->getrow($sql_room_name);
	$res_check[$key]['FEmp']=$res_employee['FName'];
	$res_check[$key]['FPhone']=$res_employee['FPhone'];
	$res_check[$key]['FCompany']=$res_com_name['FName'];
	$res_check[$key]['FSection']=$res_sec_name['FName'];
	$res_check[$key]['FRoom']=$res_room_name['FName'];
}
// var_dump($res_check);die;
echo json_encode($res_check);