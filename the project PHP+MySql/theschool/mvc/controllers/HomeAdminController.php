<?php


class HomeAdminController{

	private $my_admin,$my_validations;

	
	function __construct(){
		
		$this->my_admin = new adminModel();

		$this->my_validations = new validations();
	}

	public function DisplayAction(){

		if( !$this->my_validations->isLoggedIn() || $_SESSION['logged_admin']['role'] == 'sales' ){ //r u logged in and not sales?
			
			View::render('MaliciousPage');

			die();
		}


		$data = [];
	    $data['more_data'] = [
	        
	        'admins_details' => $this->my_admin->getAllAdminsDetails(),
			'number_of_admins' => $this->my_admin->countNumberOfAdmins(),
			'messages_success' => '',
	    ];

	    if($_GET['message'] == 'edit_successful'){
	    	
	    	$data['more_data']['messages_success'] = [

			'messages_success' => [
			                      'edit_message' => 'Edit was successful !',
			                      ]
			];
	    }
	    

	    if($_GET['message']=='delete_successful'){
			
			$data['more_data']['messages_success'] = [

			'messages_success' => [
			                    'delete_message' => 'Delete was successful !',
							      ]
			];
		}


	    if($_GET['message'] == 'create_successful'){
	    	
	    	$data['more_data']['messages_success'] = [

			'messages_success' => [
			                      'create_message'  => 'Create was successful !'
							      ]
			];

	    }

	    View::render('HomeAdminPage', $data);


	}












}






?>