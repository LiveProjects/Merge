<?php
/**
 * 判断用户是否已在PC端绑定，并根据微信ID将职员编号取出，保存到session中
 */
require_once 'dbaccess-SAE.php';
require_once 'getuser.php';
$db = new DB ();
session_start ();
// 获取微信ID
//$openid = '0002';
// 判断微信是否已确认绑定
$flag=$_GET['flag'];
if($flag == 1){
	$sql = "update t_hs_wechat set FType = 1 where FWechatID='{$openid}'";
	$db->execsql($sql);
}
$sql_type = "select FType,FNumber from t_hs_wechat where FWechatID='{$openid}'";
$res_type = $db->getrow ( $sql_type );
// var_dump($res_type);die;
if (count($res_type) == 0) { //没有记录
	//echo 2; // 请先在PC端绑定微信号
	echo "<p>您的微信ID为：<b>".$openid."</b></p>";
	echo "请先在PC端绑定微信号";
	$db->db_close();
	die();
} elseif ($res_type ['FType'] == 0) {
	//echo 0; // 显示确认界面
	$fnumber = $res_type['FNumber'];
	$sql = "select a.FName, b.FName,c.FName from t_hs_employee as a inner join t_hs_company as b on a.FCompanyID == b.FID inner join 
	  t_hs_section as c on a.FSectionID == c.FID where a.FNumber == '".$fnumber."'";
	$res = $db->get_num_row ( $sql );
	if( count($res) > 0){
		echo "<p>姓名：".$res[0]."</p>";
		echo "<p>所属公司：".$res[1]."</p>";
		echo "<p>所属部门：".$res[2]."</p>";
		echo "<script language='javascript'>function verify(){window.location.href='wechat-SAE.php?flag=1';}</script>";
		echo "<p><input type=button value='确认绑定' onclick='verify()' ><p>";
		$db->db_close();
		die();
	}
} else {
	// 获取该职员编号，存入session中
	$_SESSION ['emp_number'] = $res_type ['FNumber'];
	echo 1; // 进入预约界面
}