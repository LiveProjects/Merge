<?php
header("content-type:text/html;charset=utf-8");
require_once '../../../common/php/non_get/dbaccess.php';
$db = new DB ();
session_start ();