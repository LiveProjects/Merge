<?php
require_once '../../../common/php/non_get/dbaccess.php';
header ( 'content-type:text/html;charset=utf-8' );

$dishname=$_GET['dishname'];
$content=$_GET['content'];
session_start ();
$path="../../../";

$db=new DB();
$pinglun['username'] = $_SESSION['user']['name']; // 提报人姓名
$pinglun['dishname']=$dishname;
$pinglun['pingluncon']=$content;

$res=$db->insert(pinglun, $pinglun);


echo $res;
