<?php

	header('Content-Type:text/html; charset=utf-8');

	/*获取数据 */
	$data = file_get_contents('data.json');

	/*转化php对象*/
	$data = json_decode($data);

	/*页码*/
	$page = $_GET['page'];

	/*条数*/
	$pageSize = $_GET['pageSize'];

	/*获取数据的起始索引*/
	$offset = ($page - 1) * $pageSize;

	/*获取多少条数据*/
	$result = array_slice($data, $offset, $pageSize);

	/*下一页的页码*/
	$page++;

	/*转化json字符串*/
	echo json_encode(array('page'=>$page, 'items'=>$result));

	sleep(1);

?>
