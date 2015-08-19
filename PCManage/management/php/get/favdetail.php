<?php
require_once '../../../common/php/non_get/dbaccess.php';
header ( 'content-type:text/html;charset=utf-8' );

$url=$_GET['detailimgurl'];
$path="../../../";
session_start ();
$db=new DB();
$link="select * from t_hs_favfood where url='$path$url'";
$res=$db->getrow($link);


//$link="select * from pinglun";
//$res=$db->getrow($link);

echo json_encode($res);