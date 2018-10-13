<?php


 class validations{

 	
	
	public function validEmptyField($value){

		if($value == ''){
			
			return true;
		}else{
			
			return false;
		}
	}

	public function validationInputEmailField($value){

		if( filter_var($value, FILTER_VALIDATE_EMAIL) ){
			
			return true;
		}else{
			
			return false;
		}
	}

	public function isLoggedIn(){ 
				
		if(empty($_SESSION['logged_admin'])){
    		
    		return false;
		}else{
			
			return true;
		}
	    
	}     



 } 









?>