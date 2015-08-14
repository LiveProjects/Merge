<?php 
header ( 'content-type:text/html;charset=utf-8' );
require_once 'dbaccess.php';
$db = new DB ();
session_start ();


$link="select * from t_hs_call_board order by FDate";
$res=$db->execsql($link);

echo json_encode($res);

?>