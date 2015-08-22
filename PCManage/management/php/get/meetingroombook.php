<?php
header ( 'content-type:text/html;charset=utf-8' );
require_once '../../../common/php/non_get/dbaccess.php';
$db = new DB ();
session_start ();
$init = array ();
$init ['emp_name'] = $_SESSION ['user'] ['name'];
$init ['com_name'] = $_SESSION ['user'] ['companyname'];
$date=$_GET['date'].' 00:00:00';//日期
//echo $_GET['date'];die();
//$date = "2015-08-21 00:00:00";
if (isset ( $init ['emp_name'] ) && isset ( $init ['com_name'] ) ) {
	if (isset ( $date )) {
		// 查询登录者的联系方式
		$sql_phone = "select FPhone from t_hs_employee where FNumber='{$_SESSION['user']['number']}'";
		$res_phone = $db->getrow ( $sql_phone );
//		echo $sql_phone;die;
		$init ['phone'] = $res_phone ['FPhone'];
		//查询部门信息
		$sql_sec="select FName from t_hs_section where FCompanyID='{$_SESSION['user']['companyID']}' ";
		$res_sec=$db->execsql($sql_sec);
		$init['sec']=$res_sec;
		
		// 查询各个会议室的名称、可容纳人数
		$sql_room = "select * from t_hs_meetingroom";
		$res_room = $db->execsql ( $sql_room );
		$init ['room'] = $res_room;
		// 查询各个会议室的预定状态
		$sql_room_state = "select FRoomID,FStartTime,FEndTime from t_hs_meetingroom_reserv where FRDate='{$date}'";
		$res_room_state = $db->execsql ( $sql_room_state );
		// echo $sql_room_state;die;
		// print_r ( $res_room_state );
		// 查询每个会议室已预约的时间段
		foreach ( $init ['room'] as $key_init => $val_init ) {
			foreach ( $res_room_state as $key_room => $val_room ) {
				if ($val_init ['FID'] == $val_room ['FRoomID']) {
					// 某条预约记录预约的时间段
					$time = $val_room ['FStartTime'] . '-' . $val_room ['FEndTime'];
					$init ['room'] [$key_init] ['Time'] [] = $time;
				}
			}
		}
		//print_r($init);die();
		/*
		 * 点击预约按钮，将预约数据提交到数据库$_GET['type']='submit'
		 */
		$type = $_GET ['type'];
// 		$type='submit';
		if ($type == 'submit') {
			$room = array ();
			$room ['FRDate'] = $_GET ['date']; // 预约日期
// 			$room['FRDate']="2015-08-21";//预约日期
			$room ['FNumber'] = $_SESSION ['user'] ['number'];
			$room['FDate']=date('Y-m-d H:i:s',time());
// 			$room['FNum']=7;
// 			$room['FStartTime']='11:30';
// 			$room['FEndTime']='11:50';
// 			$room_name='A3-102';
// 			$sec_name='信息研发部1';
			$room ['FNum'] = $_GET ['FNum'];
			$room ['FStartTime'] = $_GET ['FStartTime'];
			$room ['FEndTime'] = $_GET ['FEndTime'];
			$room_name = $_GET ['room_name'];
			$sec_name=$_GET['sec_name'];
			if (isset ( $room ['FNum'] ) && isset ( $room ['FStartTime'] ) && isset ( $room ['FEndTime'] ) && isset ( $room_name )&&isset($sec_name)) {
				// 查询出预约的会议室的ID
				$sql_room_id = "select FID from t_hs_meetingroom where FName='{$room_name}'";
				$res_room_id = $db->getrow ( $sql_room_id );
				$room ['FRoomID'] = $res_room_id ['FID'];
				//查询出所选部门的ID
				$sql_sec_id="select FID from t_hs_section where FName='{$sec_name}'";
				$res_sec_id=$db->getrow($sql_sec_id);
				$room['FSectionID']=$res_sec_id['FID'];
// 				echo $room['FSectionID'];die;
				// 判断预约时间是否冲突
				$day_start = strtotime ( $room ['FRDate'] . ' 08:00:00' ); // 预约时间：早8:00~晚8:00
				$day_end = strtotime ( $room ['FRDate'] . ' 20:00:00' );
				$start = strtotime ( $room ['FRDate'] . ' ' . $room ['FStartTime'] ); // 用户传入的起始时间
				$end = strtotime ( $room ['FRDate'] . ' ' . $room ['FEndTime'] ); // 用户传入的终止时间
				$flag = true;
				//判断预约时间是否冲突
				if (($start >= $day_start) && ($end <= $day_end)) {
					foreach ( $init['room'] as $key_r => $val_r ) {
						if (($room ['FRoomID']==$init['room'][$key_r]['FID'])&&(!empty($val_r['Time']))){
							foreach ($val_r['Time'] as $key_time=>$val_time){
								$starttime = strtotime ( $room ['FRDate'] . ' ' . $val_time ['FStartTime'] ); // 数据库中的起始时间
								$endtime = strtotime ( $room ['FRDate'] . ' ' . $val_time ['FEndTime'] ); // 数据库中的终止时间
								if (! (($end < $starttime) || ($start > $endtime))) {
									$flag = false;
									$init ['error'] = 3; // 预约时间冲突，请重新填写
									break;
								}
							}
							
						}
						
					}
				} else {
					$flag = false;
					$init ['error'] = 5; // 预约时间为早8：00~下午8:00
				}
				//判断使用人数是否超过所预约会议室容纳的人数
				$sql_room_num="select FNum from t_hs_meetingroom where FID='{$room ['FRoomID']}'";//查询所预约会议室的容纳人数
				$res_room_num=$db->getrow($sql_room_num);
				if ($res_room_num['FNum']<$room ['FNum']){
					$flag=false;
					$init['error']=6;//预约人数超过会议室所能容纳人数
				}
				//满足条件，向数据库插入数据
				if ($flag) {
					$insert = $db->insert ( 't_hs_meetingroom_reserv', $room );
					if ($insert) {
						$init ['error'] = 1; // 预约成功
					} else {
						$init ['error'] = 0; // 预约失败，请联系技术支持
					}
				}
			} else {
				$init ['error'] = 4; // 请检查空项
			}
		}
	} else {
		$init ['error'] = 2; // 请选择预约日期
	}
// 	print_r($init);die;
	echo json_encode ( $init );
}
