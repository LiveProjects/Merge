<?php
require_once '../../../common/php/non_get/dbaccess.php';
header ( 'content-type:text/html;charset=utf-8' );
session_start ();
$url=$_GET['detailimgurl'];
$path="../../../";

$db=new DB();
$link="select dishname from t_hs_favfood where url='$path$url'";
$res=$db->getrow($link);
$dishname=$res['dishname'];

$link2="select * from pinglun where dishname='$dishname' order by FID desc";
$res2=$db->execsql($link2);

echo json_encode($res2);