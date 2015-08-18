<?php
/**
 * 判断用户是否已在PC端绑定，并根据微信ID将职员编号取出，保存到session中
 */
require_once 'dbaccess.php';
$db = new DB ();
session_start ();
// 获取微信ID
$openid = '0002';
// 判断微信是否已确认绑定
$sql_type = "select FType,FNumber from t_hs_wechat where FWechatID='{$openid}'";
$res_type = $db->getrow ( $sql_type );
// var_dump($res_type);die;
if ($res_type ['FType'] == NULL) {
	echo 2; // 请先在PC端绑定微信号
} elseif ($res_type ['FType'] == 0) {
	echo 0; // 显示确认界面
} else {
	// 获取该职员编号，存入session中
	$_SESSION ['emp_number'] = $res_type ['FNumber'];
	echo 1; // 进入预约界面
}