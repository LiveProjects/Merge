<?php
/**
 * 周末加班班车统计
 */
header ( 'content-type:text/html;charset=utf-8' );
require_once '../../../common/php/non_get/dbaccess.php';
$db = new DB ();
$com_name = $_GET ['com_name']; // 公司名称
$start = $_GET ['start']; // 开始日期
$end = $_GET ['end']; // 截止日期
//$com_name = 'hisense1';
//$start = '2015-08-10 00:00:00';
//$end = '2015-10-10 00:00:00';
/*
 * 查询数据，构造显示数据的数组
 */
if (isset ( $com_name ) && isset ( $start ) && isset ( $end )) {
	// 根据公司名称查找出公司ID
	$sql_com = "select FID from t_hs_company where FName='{$com_name}'";
	$res_com = $db->getrow ( $sql_com );
	// t_hs_overwork_reserv与t_hs_employee联合查询，找出：提报人姓名、人数、日期、时间、行驶区间、单程或往返
	$sql = "select a.FName,b.FNum,b.FRDate,b.FRTime,b.FStartStop,b.FEndStop,b.FType from
	 t_hs_temporary_reserv as b inner join t_hs_employee as a on b.FNumber=a.FNumber
	 where (b.FRDate<='{$end}' and b.FRDate>='{$start}') and b.FCompanyID='{$res_com['FID']}'";
	$res = $db->execsql ( $sql );
	$data = array (); // 用于网页显示的数组
	foreach ( $res as $key => $value ) {
		// 日期仅显示年月日
		$date = explode ( ' ', $value ['FRDate'] );
		// echo $date[0];
		// 显示单程或往返
		if ($value ['FType'] == '0') {
			$value ['FType'] = '单程';
		} else {
			$value ['FType'] = '往返';
		}
		// 构造显示数据的数组
		$data [$key] ['com_name'] = $com_name;
		$data [$key] ['emp_name'] = $value ['FName'];
		$data [$key] ['FNum'] = $value ['FNum'];
		$data [$key] ['FRDate'] = $date [0];
		$data [$key] ['FRTime'] = $value ['FRTime'];
		$data [$key] ['FStartStop'] = $value ['FStartStop'];
		$data [$key] ['FEndStop'] = $value ['FEndStop'];
		$data [$key] ['FType'] = $value ['FType'];
		// var_dump($excel);die;
	}
}
$type = $_GET ['type'];
//echo $type;die();
/*
 * 网页显示结果，显示的数据：公司、日期、下车站点、乘车时间、人数（按日期统计）
 */
//$type='web';
if ($type == 'web') {
//	var_dump($data);
	echo json_encode ( $data );
}
/*
 * 生成表格，显示的数据：公司、部门、人名、日期、乘坐时间、下车站点
 */

// $type='excel';

//echo $_GET['com_name'].$_GET['start'].$_GET['end'].$_GET['type'];die();
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
	$objSheet->setTitle ( "临时性班车统计" ); // 设置sheet名称
	                                
	// 设计表格标题
	$objSheet->setCellValue ( "A1", "临时性班车统计" ); // 表格标题
	$objSheet->mergeCells ( 'A1:H1' ); // 合并单元格
	$objSheet->getStyle ( 'A1:H1' )->getFill ()->setFillType ( PHPExcel_Style_Fill::FILL_SOLID )->getStartColor ()->setRGB ( '098079' ); // 设置单元格背景颜色
	$objSheet->getStyle ( 'A1:H1' )->getFont ()->setSize ( 20 )->setBold ( TRUE ); // 设置标题字体样式：大小20，加粗
	$objSheet->getStyle ( 'A1:H1' )->applyFromArray ( getBorderStyle ( '1c2a29' ) ); // 设置标题单元格边框
	                                                                        
	// 设置表头
	$objSheet->setCellValue ( "A2", "公司" )->setCellValue ( "B2", "提报人姓名" )->setCellValue ( "C2", "人数" )->setCellValue ( "D2", "日期" )->setCellValue ( "E2", "时间" )->setCellValue ( "F2", "始发站" )->setCellValue ( "G2", "终点站" )->setCellValue ( "H2", "单程或往返" );
	$objSheet->getStyle ( 'A2:H2' )->getFill ()->setFillType ( PHPExcel_Style_Fill::FILL_SOLID )->getStartColor ()->setRGB ( '9fb8b7' ); // 设置表头单元格背景颜色
	                                     // 设置表头单元格边框
	$objSheet->getStyle ( 'A2' )->applyFromArray ( getBorderStyle ( '1c2a29' ) );
	$objSheet->getStyle ( 'B2' )->applyFromArray ( getBorderStyle ( '1c2a29' ) );
	$objSheet->getStyle ( 'C2' )->applyFromArray ( getBorderStyle ( '1c2a29' ) );
	$objSheet->getStyle ( 'D2' )->applyFromArray ( getBorderStyle ( '1c2a29' ) );
	$objSheet->getStyle ( 'E2' )->applyFromArray ( getBorderStyle ( '1c2a29' ) );
	$objSheet->getStyle ( 'F2' )->applyFromArray ( getBorderStyle ( '1c2a29' ) );
	$objSheet->getStyle ( 'G2' )->applyFromArray ( getBorderStyle ( '1c2a29' ) );
	$objSheet->getStyle ( 'H2' )->applyFromArray ( getBorderStyle ( '1c2a29' ) );
	$objSheet->getStyle ( 'A2:H2' )->getFont ()->setSize ( 16 )->setBold ( TRUE ); // 设置表头字体样式：大小20，加粗
	                                                                     
	// 向表格内填充数据
	$j = 3;
	foreach ( $data as $excel_k => $excel_v ) {
		$index = 0;
		$objSheet->setCellValue ( getCells ( $index ) . $j, $excel_v ['com_name'] )->setCellValue ( getCells ( ++ $index ) . $j, $excel_v ['emp_name'] )->setCellValue ( getCells ( ++ $index ) . $j, $excel_v ['FNum'] )->setCellValue ( getCells ( ++ $index ) . $j, $excel_v ['FRDate'] )->setCellValue ( getCells ( ++ $index ) . $j, $excel_v ['FRTime'] )->setCellValue ( getCells ( ++ $index ) . $j, $excel_v ['FStartStop'] )->setCellValue ( getCells ( ++ $index ) . $j, $excel_v ['FEndStop'] )->setCellValue ( getCells ( ++ $index ) . $j, $excel_v ['FType'] );
		++ $j;
	}
	// $filename=$_GET['filename'];
	$filename = "temporary";
	$filename = $filename . '.xls';
	$objWriter = PHPExcel_IOFactory::createWriter ( $objPHPExcel, 'Excel5' );
	// $objWriter->save($filename);
	browser ( 'Excel5', $filename );
	$objWriter->save ( "php://output" );
}