<?php
header ( 'content-type:text/html;charset=utf-8' );
require_once '../../../common/php/non_get/dbaccess.php';
$db = new DB ();
session_start ();
$init = array ();
$init ['emp_name'] = $_SESSION ['user'] ['name'];
$init ['com_name'] = $_SESSION ['user'] ['companyname'];
$init ['sec_name'] = $_SESSION ['user'] ['sectionname'];
$date=$_GET['date'].' 00:00:00';//日期
// $date = "2015-08-20 00:00:00";
if (isset ( $init ['emp_name'] ) && isset ( $init ['com_name'] ) && isset ( $init ['sec_name'] )) {
	if (isset ( $date )) {
		// 查询登录者的联系方式
		$sql_phone = "select FPhone from t_hs_employee where FNumber='{$_SESSION['user']['number']}'";
		$res_phone = $db->getrow ( $sql_phone );
		// echo $sql_phone;die;
		$init ['phone'] = $res_phone ['FPhone'];
		
		// 查询各个会议室的名称、可容纳人数
		$sql_room = "select * from t_hs_meetingroom";
		$res_room = $db->execsql ( $sql_room );
		$init ['room'] = $res_room;
		// 查询各个会议室的预定状态
		$sql_room_state = "select FRoomID,FStartTime,FEndTime from t_hs_meetingroom_reserv where FRDate='{$date}'";
		$res_room_state = $db->execsql ( $sql_room_state );
		// echo $sql_room_state;die;
		print_r ( $res_room_state );
		//查询每个会议室已预约的时间段
		foreach ( $init ['room'] as $key_init => $val_init ) {
			foreach ( $res_room_state as $key_room => $val_room ) {
				if ($val_init ['FID'] == $val_room ['FRoomID']) {
					// 某条预约记录预约的时间段
					$time = $val_room ['FStartTime'] . '-' . $val_room ['FEndTime'];
					$init ['room'] [$key_init] ['Time'] [] = $time;
				}
			}
		}
		// print_r($init);die;
		echo json_encode($init);
		 /*
		 * 预约提交数据库
		 */
		/*$room=array();
		$room['FRDate']=$date;//预约日期
		$room['FNumber']=$_SESSION['user'] ['name'];
		$room['FNum']='7';
		$room['FStartTime']=$_GET['FStartTime'];
		$room['FEndTime']=$_GET['FEndTime'];
		$room_name=$_GET['room_name'];
// 		$room['FNum']=$_GET['FNum'];
// 		$room['FStartTime']=$_GET['FStartTime'];
// 		$room['FEndTime']=$_GET['FEndTime'];
// 		$room_name=$_GET['room_name'];
		if (isset($room['FNum'])&&isset($room['FStartTime'])&&isset($room['FEndTime'])&&isset($room_name)){
			//查询出预约的会议室的ID
			$sql_room_id="select FID from t_hs_meetingroom where FName='{$room_name}'";
			$res_room_id=$db->getrow($sql_room_id);
			$room['FRoomID']=$res_room_id['FID'];
		}
		print_r($room); */
		
		
	} else {
		echo ""; // 请选择预约日期
	}
}
