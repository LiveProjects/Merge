<?php
require_once '../../../common/php/non_get/dbaccess.php';
header ( 'content-type:text/html;charset=utf-8' );

$url=$_GET['url'];
$path="../../../";
session_start ();
$db=new DB();
$link="update t_hs_favfood set num=num+1 where url='$path$url'";
/* echo $link."\n"; */
$res=mysql_query($link);
/* echo $res."\n"; */
if($res){
	echo 1;
}else{
	echo 0;
}
?>