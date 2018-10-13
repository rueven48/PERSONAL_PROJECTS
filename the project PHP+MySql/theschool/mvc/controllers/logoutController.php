<?php


class logoutController{

		

	public function getlogoutAction(){

		session_start();
		session_unset();
		session_destroy();  // kill the cookie in server sides
		$_SESSION = array();

		header('Location: http://mvc.com/login/getlogin?message=logout successful');
	}









}










?>