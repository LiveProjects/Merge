<?php
/**
 *  将工作日加班时间和站点，以及周末站点查询出，以便于前端界面初步加载
 */
header ( 'content-type:text/html;charset=utf-8' );
require_once '../../../common/php/dbaccess.php';
$DB = new DB ();

/*
 * *******************加班时间查询*************************************
 */
$linktime = "SELECT FTime FROM t_hs_bustime where FBusID='7'";
$restime = $DB->execsql ( $linktime );

/*
 * *******************工作日班车站点查询*************************************
 */
$linkBS = "SELECT distinct a.FName FROM t_hs_stop as a inner join t_hs_busline_stop as b on a.FID=b.FStopID where (b.FBusID='7' OR b.FBusID='8' OR b.FBusID='9') ";
$resBS = $DB->execsql ( $linkBS );

/*
 * *******************周末班车站点查询*************************************
 */
$linkBS_weekend = "SELECT a.FName FROM t_hs_stop as a inner join t_hs_busline_stop as b on a.FID=b.FStopID where b.FBusID='10'";
$resBS_weekend = $DB->execsql ( $linkBS_weekend );

$chushi = array (
		'addtime' => $restime,
		'addBS' => $resBS,
		'addBS_weekend'=>$resBS_weekend
);
echo json_encode ( $chushi );
	
