<?php
/**
 *
 * *****************海信学院班车预约******************
 */
header ( 'content-type:text/html;charset=utf-8' );
require_once  '../../../common/php/non_get/dbaccess.php';
$db = new DB ();
session_start ();

/*echo $_GET ['FNum'].$_GET ['FRDate'].$_GET ['FRTime'].$_GET ['FStop'];die;*/
if (isset ( $_SESSION['user']['number'] )) {

	if(empty ( $_GET ['FNum'] ) || empty ( $_GET ['FRDate'] ) || empty ( $_GET ['FRTime'] ) || empty ( $_GET ['FStop'] )){
        echo 2; // 请检查空项
	}else{
	    $emp_number = $_SESSION['user']['number'];

        $FNumber=$_GET['FNumber'];//提交人编号
        $FCompanyID=$_GET['FCompanyID'];
        $FNum=$_GET['FNum'];//人数
        $FRTime = $_GET ['FRTime']; // 班车预约时间
        $FRDate = $_GET ['FRDate']; // 班车预约日期
        $FStop = $_GET ['FStop']; // 班车预约下车站点,需要查询ID号
        $CurDate=$_GET['FDate']; //当前日期

        //echo $FRTime.$FRDate.$FStop;
        //$link="insert into t_hs_collage_reserv values (default,$company,$company,$num,$date,$time,$park,$date)";

        // 查询下车站点编号
        $sql_id_stop = "select FID from t_hs_stop where FName='{$FStop}'";
        $res_id_stop = $db->getrow ( $sql_id_stop );
        //echo $sql_id_stop;

        $book=array();

        $book ['FNumber'] = $_SESSION['user']['number']; // 提报人编号
        $book ['FCompanyID'] = $_SESSION['user']['companyID']; // 公司ID
        $book ['FStopID'] = $res_id_stop['FID'];
        $book ['FNum'] = $FNum;
        $book ['FRDate'] = $FRDate;
        $book ['FRTime'] = $FRTime;
        $book ['FDate'] = date ( 'Y-m-d H:i:s', time () ); // 提报时间

        //echo $book ['FNumber'].$book ['FCompanyID'].$book ['Num'].$book ['FRDate'].$book ['FRTime'].$book ['FStopID'].$book ['CurDate'];
        // 判断是否重复预约
        $sql_repeat = "select FID from t_hs_college_reserv where FNumber='{$book['FNumber']}' and FRDate='{$book ['FRDate']}' ";
        $res_repeat = $db->getrow ( $sql_repeat );

        if (empty ( $res_repeat )) { // 没有重复预约
            // 向数据库插入数据
            $res=$db->insert(t_hs_college_reserv, $book);
            if ($res) {
                echo 1; // 预约成功
            } else {
                echo 0; // 预约失败，请联系技术支持
            }
        } else {
            //提示更新
            $sql_update = "update t_hs_college_reserv set FStopID='{$book['FStopID']}' , FRTime='{$book ['FRTime']}' , FDate='{$book ['FDate']}', FNum='{$book ['FNum']}' where FID='{$res_repeat['FID']}'";
            $res_update = $db->execsql ( $sql_update );
            if ($res_update) {
                echo 1; // 预约成功
            } else {
                echo 0; // 预约失败，请联系技术支持
            }
        }
	}
}else{
    echo 9;//去登陆
}


?>