<?php
//本地根目录  D:/wamp/www/
echo ' web-root = '.$_SERVER['DOCUMENT_ROOT']."---------";

//当前文件路径  D:\wamp\www\merge\PCManage\index.php
echo ' current-file = '.__FILE__.'---------';

//当前文件所在的文件夹  D:\wamp\www\merge\PCManage
echo ' current-dir = '.dirname(__FILE__).'---------';

//端口  localhost:8088
echo ' http-root = '.$_SERVER['HTTP_HOST'].'---------';

//merge/PCManage/index.ph
echo ' web-position = '.$_SERVER['PHP_SELF'].'---------';



//举例
$file='c:/webroot/index.php';
echo ' file-position = '.$file.'<br>';

$fileWebAddress='http://'.str_replace($_SERVER['DOCUMENT_ROOT'],$_SERVER['HTTP_HOST'],$file);
echo ' file-web-position = '.$fileWebAddress.'<br>';