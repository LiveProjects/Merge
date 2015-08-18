<?php
/**
 * 工作日加班班车统计：网页显示+导出excel文件
 */
header ( 'content-type:text/html;charset=utf-8' );
require_once '../../../common/php/non_get/dbaccess.php';
$db = new DB ();
//$com_name = $_GET ['com_name']; // 公司名称
//$start = $_GET ['start']; // 开始日期
//$end = $_GET ['end']; // 截止日期
$com_name = 'hisense2';
$start = '2015-08-10 00:00:00';
$end = '2015-10-10 00:00:00';
/*
 * 查询数据，构造网页显示数据的数组和excel表格显示数据的数组
 */
if (isset ( $com_name ) && isset ( $start ) && isset ( $end )) {
	// t_hs_company、t_hs_overwork_reserv与t_hs_employee联合查询，查找出该公司所有职员的编号
	$sql = "select d.FRDate,d.FStopID as FStop,d.FRTime,c.FName as emp_name,c.FSection from
	 (select b.FNumber,b.FName,b.FSectionID as FSection from t_hs_company as a inner join t_hs_employee as b on a.FID=b.FCompanyID where a.FName='hisense2')as c 
	INNER  JOIN t_hs_overwork_reserv as d on c.FNumber=d.FNumber 
	where( d.FRDate<='{$end}' and d.FRDate>='{$start}') and d.FType='1' order by FRDate asc";
	// echo $sql;die;
	$res = $db->execsql ( $sql );
	$web = array (); // 用于网页显示的数组
	$excel = array (); // 用于excel表格显示的数组
	foreach ( $res as $key => $value ) {
		// 根据站点编号查出站点名称
		$sql_stop = "select FName from t_hs_stop where FID='{$value['FStop']}'";
		$res_stop = $db->getrow ( $sql_stop );
		// 根据部门编号查出部门名称
		$sql_sec = "select FName from t_hs_section where FID='{$value['FSection']}'";
		$res_sec = $db->getrow ( $sql_sec );
		// 日期仅显示年月日
		$date = explode ( ' ', $value ['FRDate'] );
		// echo $date[0];
		// 构造网页显示数据的数组
		$web [$key] ['com_name'] = $com_name;
		$web [$key] ['FRDate'] = $date [0];
		$web [$key] ['FStop'] = $res_stop ['FName'];
		$web [$key] ['FRTime'] = $res [$key] ['FRTime'];
		// 构造excel表格需要显示的数据
		$excel [$key] ['com_name'] = $com_name;
		$excel [$key] ['FSection'] = $res_sec ['FName'];
		$excel [$key] ['emp_name'] = $res [$key] ['emp_name'];
		$excel [$key] ['FRDate'] = $date [0];
		$excel [$key] ['FRTime'] = $res [$key] ['FRTime'];
		$excel [$key] ['FStop'] = $res_stop ['FName'];
	}
}
$type = $_GET ['type'];
/*
 * 网页显示结果，显示的数据：公司、日期、下车站点、乘车时间、人数（按日期统计）
 */
// $type='web';
if ($type == 'web') {
	// 按日期查询人数
	$sql_num = "select d.FRDate,count(FRDate) as num  from
	(select b.FNumber from t_hs_company as a inner join t_hs_employee as b on a.FID=b.FCompanyID where a.FName='hisense2')as c
	INNER  JOIN t_hs_overwork_reserv as d on c.FNumber=d.FNumber
	where( d.FRDate<='{$end}' and d.FRDate>='{$start}') and d.FType='1' group by FRDate ";
	$res_num = $db->execsql ( $sql_num );
	foreach ( $res_num as $num_k => $num_v ) {
		// 日期仅显示年月日
		$date_num = explode ( ' ', $num_v ['FRDate'] );
		$res_num [$num_k] ['FRDate'] = $date_num [0];
	}
	$data = array (
			"web" => $web,
			"res_num" => $res_num 
	);
	var_dump ( $data );
	echo json_encode ( $data );
}
/*
 * 生成表格，显示的数据：公司、部门、人名、日期、乘坐时间、下车站点
 */

// $type='excel';
if ($type == 'excel') {
	require_once '../../../common/PHPExcel/PHPExcel.php';
	$objPHPExcel = new PHPExcel ();
	
	/*
	 * 根据下标获得单元格所在列位置
	 */
	function getCells($index) {
		$arr = range ( 'A', 'Z' );
		return $arr [$index];
	}
	/*
	 * 获取不同的边框样式
	 */
	function getBorderStyle($color) {
		$styleArray = array (
				'borders' => array (
						'outline' => array (
								'style' => PHPExcel_Style_Border::BORDER_THICK,
								'color' => array (
										'rgb' => $color 
								) 
						) 
				) 
		);
		return $styleArray;
	}
	/*
	 * 在浏览器中输出结果
	 */
	function browser($type, $filename) {
		if ($type == "Excel5") {
			header ( 'Content-Type: application/vnd.ms-excel' ); // 告诉浏览器将要输出excel03文件
		} else {
			header ( 'Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ); // 告诉浏览器将要输出excel07文件
		}
		header ( "Content-Disposition: attachment;filename='{$filename}'" ); // 告诉浏览器将要输出文件的名称
		header ( 'Cache-Control: max-age=0' ); // 禁止缓存
	}
	// var_dump($excel);die;
	
	$objSheet = $objPHPExcel->getActiveSheet ();
	$objSheet->getDefaultStyle ()->getFont ()->setName ( '微软雅黑' )->setSize ( 14 ); // 设置默认字体
	$objSheet->getDefaultStyle ()->getAlignment ()->setVertical ( PHPExcel_Style_Alignment::VERTICAL_CENTER )->setHorizontal ( PHPExcel_Style_Alignment::HORIZONTAL_CENTER ); // 设置字体默认居中
	$objSheet->setTitle ( "工作日加班" ); // 设置sheet名称
	                              
	// 设计表格标题
	$objSheet->setCellValue ( "A1", "工作日加班车统计" ); // 表格标题
	$objSheet->mergeCells ( 'A1:F1' ); // 合并单元格
	$objSheet->getStyle ( 'A1:F1' )->getFill ()->setFillType ( PHPExcel_Style_Fill::FILL_SOLID )->getStartColor ()->setRGB ( '098079' ); // 设置单元格背景颜色
	$objSheet->getStyle ( 'A1:F1' )->getFont ()->setSize ( 20 )->setBold ( TRUE ); // 设置标题字体样式：大小20，加粗
	$objSheet->getStyle ( 'A1:F1' )->applyFromArray ( getBorderStyle ( '1c2a29' ) ); // 设置标题单元格边框
	                                                                        
	// 设置表头
	$objSheet->setCellValue ( "A2", "公司" )->setCellValue ( "B2", "部门" )->setCellValue ( "C2", "人名" )->setCellValue ( "D2", "日期" )->setCellValue ( "E2", "乘坐时间" )->setCellValue ( "F2", "下车站点" );
	$objSheet->getStyle ( 'A2:F2' )->getFill ()->setFillType ( PHPExcel_Style_Fill::FILL_SOLID )->getStartColor ()->setRGB ( '9fb8b7' ); // 设置表头单元格背景颜色
	                                     // 设置表头单元格边框
	$objSheet->getStyle ( 'A2' )->applyFromArray ( getBorderStyle ( '1c2a29' ) );
	$objSheet->getStyle ( 'B2' )->applyFromArray ( getBorderStyle ( '1c2a29' ) );
	$objSheet->getStyle ( 'C2' )->applyFromArray ( getBorderStyle ( '1c2a29' ) );
	$objSheet->getStyle ( 'D2' )->applyFromArray ( getBorderStyle ( '1c2a29' ) );
	$objSheet->getStyle ( 'E2' )->applyFromArray ( getBorderStyle ( '1c2a29' ) );
	$objSheet->getStyle ( 'F2' )->applyFromArray ( getBorderStyle ( '1c2a29' ) );
	$objSheet->getStyle ( 'A2:F2' )->getFont ()->setSize ( 16 )->setBold ( TRUE ); // 设置表头字体样式：大小20，加粗
	                                                                     
	// 向表格内填充数据
	$j = 3;
	foreach ( $excel as $excel_k => $excel_v ) {
		$index = 0;
		$objSheet->setCellValue ( getCells ( $index ) . $j, $excel_v ['com_name'] )->setCellValue ( getCells ( ++ $index ) . $j, $excel_v ['FSection'] )->setCellValue ( getCells ( ++ $index ) . $j, $excel_v ['emp_name'] )->setCellValue ( getCells ( ++ $index ) . $j, $excel_v ['FRDate'] )->setCellValue ( getCells ( ++ $index ) . $j, $excel_v ['FRTime'] )->setCellValue ( getCells ( ++ $index ) . $j, $excel_v ['FStop'] );
		++ $j;
	}
	// $filename=$_GET['filename'];
	$filename = "overwork";
	$filename = $filename . '.xls';
	$objWriter = PHPExcel_IOFactory::createWriter ( $objPHPExcel, 'Excel5' );
	// $objWriter->save($filename);
	browser ( 'Excel5', $filename );
	$objWriter->save ( "php://output" );
}



