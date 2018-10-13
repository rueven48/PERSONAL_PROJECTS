<?php

class loginController{

	private $my_validations,$my_admin,$uniqe_password;
	

	function __construct(){
	 	
		$this->my_admin  = new adminModel();

		$this->my_validations = new validations();

		$this->uniqe_password = new passwords();								

	}


    public function getloginAction(){
    	    	    	
    	if( $this->my_validations->isLoggedIn() ){
    		
    		 header("Location: ../HomeSchool/Display?name=login successful");
    	}
	    
    	
    	$this->validationsAndLogin();

    	
    	View::render('loginpage',$data);
    	
	}

	
	public function validationsAndLogin(){

	$data = [

		    "messages_errors" => [],
		    		    
			];    

	if( isset($_POST['username']) && $this->my_validations->validEmptyField($_POST['username']) ){  //username empty
	    		    			    		
		
		array_push($data['messages_errors'], ['missing_name' => 'Name field is empty, try again !']);
	}


	if( isset($_POST['password']) && $this->my_validations->validEmptyField($_POST['password']) ){ //password empty
		
		
		array_push($data['messages_errors'], ['missing_password' => 'Password field is empty, try again !']); 
	}

	

	if ( !$this->my_validations->validEmptyField($_POST['username']) && !$this->my_validations->validEmptyField($_POST['password']) ){ //both not empty
		
		if( $this->my_validations->validationInputEmailField($_POST['username']) ){ // email pattern valid
			
			$token = $this->uniqe_password->createUniqePassword($_POST['password']); // create token

			if( $this->my_admin->IsAdminExsist('email',$_POST['username']) && $this->my_admin->IsAdminExsist('password',$token) ){ // is admin exsist 
						
				$this->Login(); // if all valiations o.k.

			}else{
				array_push($data['messages_errors'], ['wrong_login_details' => 'Wrong username or password, try again !']);
			}			
	

		}else{
			array_push($data['messages_errors'], ['validate_email' => 'Username pattern not valid, try again !']);
		}
		
	}
	

	View::render('loginpage',$data);
	
    die();

	}

	public function Login(){
		
		$_SESSION['logged_admin'] = $this->my_admin->getAdminByKey('email',strtolower($_POST['username']));
	    
	    header("Location: ../HomeSchool/Display?name=login successful");
	    
	}
 
     
       
   
  






}

?>