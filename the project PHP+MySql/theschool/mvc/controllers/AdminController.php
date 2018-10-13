<?php



class AdminController{
	
	private $my_admin,$my_validations,$uniqe_password;

	function __construct(){
		
		$this->my_admin = new adminModel();
		
		$this->my_validations = new validations();
		
		$this->uniqe_password = new passwords();
	}

	public function EditOrAddAction(){

		if( !$this->my_validations->isLoggedIn() || $_SESSION['logged_admin']['role'] == 'sales' ){ //r u logged in and not sales?
			
			View::render('MaliciousPage'); 

			die();
		}

		if( isset($_GET['add_admin'])  || isset($_POST['add_admin']) ){ // add mode

			$this->validBeforeAddAdmintAndCreate();
		
		}else{  //edit mode

			$data = [];
		    $data['more_data'] = [
		        'admins_details' => $this->my_admin->getAllAdminsDetails(),
				'admin_details' => $this->my_admin->getAdminByKey('id',$_GET['admin_id']),
				'messages_success' => '',
				
		    ];

		    if( ($_SESSION['logged_admin']['role'] == 'manager' && $data['more_data'] ['admin_details'] ['role'] == 'owner') || ($_SESSION['logged_admin']['role'] == 'manager' && $data['more_data'] ['admin_details'] ['role'] == 'manager')  ){
		    	
		    	View::render('MaliciousPage'); // if manager try to edit admin that is not allow by changing the url go malicious page

		    	die();

		    }
			


			if($_POST['action_click'] == 'save'){
			    	
			    	if( $this->validBeforeUpdate() ){  
			    		
			    		$this->updateAdminAndRedirect();
			    	}
			}

			if($_POST['action_click'] == 'delete'){
			    	
			    	$this->deleteAdminAndRedirect();
			}
		    
		View::render('AdminEditOrAddPage', $data);

		}


	}


	public function validBeforeAddAdmintAndCreate(){

		$data = [];
		$data['more_data'] = [
					        'admins_details' => $this->my_admin->getAllAdminsDetails(),
							'messages_errors' => [],
		                    ];


		if($_POST['action_click'] == 'save'){
				

				if( $this->my_validations->validEmptyField($_POST['admin_name']) ){ //admin name empty
						
				array_push($data['more_data']['messages_errors'], ['missing_name' => 'Name field is empty, try again !']);
				}

				if( $this->my_validations->validEmptyField($_POST['admin_phone']) ){  //admin phone empty
						
				array_push($data['more_data']['messages_errors'], ['missing_phone' => 'Phone field is empty, try again !']);
				}

				if( $this->my_validations->validEmptyField($_POST['admin_email']) ){  //admin email empty
						
				array_push($data['more_data']['messages_errors'], ['missing_email' => 'Email field is empty, try again !']);
				}

				if( $this->my_validations->validEmptyField($_POST['admin_role']) ){  //admin role empty
						
				array_push($data['more_data']['messages_errors'], ['missing_role' => 'Role field is empty, try again !']);
				}

				if( $this->my_validations->validEmptyField($_POST['admin_password']) ){  //admin password empty
						
				array_push($data['more_data']['messages_errors'], ['missing_password' => 'Password field is empty, try again !']);
				}

				if( !($this->my_validations->validEmptyField($_POST['admin_name'])) && !($this->my_validations->validEmptyField($_POST['admin_phone'])) && !($this->my_validations->validEmptyField($_POST['admin_email'])) && !($this->my_validations->validEmptyField($_POST['admin_role'])) && !($this->my_validations->validEmptyField($_POST['admin_password'])) ){ // 5 fileds not empty
					
					if ( $this->my_validations->validationInputEmailField($_POST['admin_email']) ){ //email pattern valid  
						
						if( !$this->my_admin->IsAdminExsist('email',$_POST['admin_email']) ){ //email not exsist
							
							if( !$this->my_admin->IsAdminExsist('name',$_POST['admin_name']) ){ //name admin not exsists
							
								  if( ($_SESSION['logged_admin']['role'] == 'owner' && $_POST['admin_role'] == 'sales') || ($_SESSION['logged_admin']['role'] == 'owner' && $_POST['admin_role'] == 'manager') || ($_SESSION['logged_admin']['role'] == 'manager' && $_POST['admin_role'] == 'sales') ){ //role authorize to change 
								
										$this->newAdminCreateAndRedirect(); // if all valiations o.k.
								  }else{

										array_push($data['more_data']['messages_errors'], ['authorize_role' => 'Not authorize to create this role  !']);	
								   }
							}else{

								array_push($data['more_data']['messages_errors'], ['same_admin' => 'Admin exsist, try diffrent name !']);
							}

						}else{

							array_push($data['more_data']['messages_errors'], ['email_exsist' => 'Email exsist, try diffrent email !']);	
						}

					}else{

						array_push($data['more_data']['messages_errors'], ['validate_email' => 'Email field is not valid, try again !']);
					}

				}
			
				
		}                    


		View::render('AdminEditOrAddPage', $data);	


	}	

	public function newAdminCreateAndRedirect(){

		$token = $this->uniqe_password->createUniqePassword($_POST['admin_password']);

		$result = $this->my_admin->createAdmin(strtolower($_POST['admin_name']),$_POST['admin_phone'],strtolower($_POST['admin_email']),strtolower($_POST['admin_role']),$_POST['admin_avatar_img'],$token);

		$admin = $this->my_admin->getAdminByKey('email',$_POST['admin_email']);
		
		header("Location: http://mvc.com/HomeAdmin/Display?admin={$admin['id']}&message=create_successful");
	} 

	public function validBeforeUpdate(){

		$data = [];
		    $data['more_data'] = [
		        'admins_details' => $this->my_admin->getAllAdminsDetails(),
				'admin_details' => $this->my_admin->getAdminByKey('id',$_POST['admin_id']),
				'messages_errors' => [],
				
		    ];
		
		if( $this->my_validations->validEmptyField($_POST['admin_name']) ){ //admin name empty
						
			array_push($data['more_data']['messages_errors'], ['missing_name' => 'Name field is empty, try again !']);
		}

		if( $this->my_validations->validEmptyField($_POST['admin_phone']) ){  //admin phone empty
						
			array_push($data['more_data']['messages_errors'], ['missing_phone' => 'Phone field is empty, try again !']);
		}

		if( $this->my_validations->validEmptyField($_POST['admin_email']) ){  //admin email empty
				
		array_push($data['more_data']['messages_errors'], ['missing_email' => 'Email field is empty, try again !']);
		}

		if( $this->my_validations->validEmptyField($_POST['admin_role']) ){  //admin role empty
				
			array_push($data['more_data']['messages_errors'], ['missing_role' => 'Role field is empty, try again !']);
		}

		
		if( !($this->my_validations->validEmptyField($_POST['admin_name'])) && !($this->my_validations->validEmptyField($_POST['admin_phone'])) && !($this->my_validations->validEmptyField($_POST['admin_email'])) && !($this->my_validations->validEmptyField($_POST['admin_role']))  ){ // 4 fileds not empty
					
					if ( $this->my_validations->validationInputEmailField($_POST['admin_email']) ){ //email pattern valid  
						
						$admin_current_email = $data['more_data']['admin_details']['email'];

						if( !$this->my_admin->IsAdminExsist('email',$_POST['admin_email']) || $admin_current_email == $_POST['admin_email'] ){ //if email not exsist or this is the same email of the admin without change than valid is ok
							
							if( $data['more_data']['admin_details']['name'] != $_POST['admin_name'] || $data['more_data']['admin_details']['phone'] != $_POST['admin_phone'] || $data['more_data']['admin_details']['email'] != $_POST['admin_email'] || $data['more_data']['admin_details']['role'] != $_POST['admin_role'] || $data['more_data']['admin_details']['image'] != $_POST['admin_avatar_img'] ){ //if there is change in update filed
								
								

								if( ($_SESSION['logged_admin']['role'] == 'owner' && $data['more_data']['admin_details']['role'] != 'owner'  &&  $_POST['admin_role'] == 'sales') || ( $_SESSION['logged_admin']['role'] == 'owner' &&  $data['more_data']['admin_details']['role'] != 'owner' && $_POST['admin_role'] == 'manager') ||  ($_SESSION['logged_admin']['role'] == 'manager' && $data['more_data']['admin_details']['role'] == 'sales' && $_POST['admin_role'] == 'sales') || ($_SESSION['logged_admin']['role'] == 'owner' && $data['more_data']['admin_details']['role'] == 'owner' && $_POST['admin_role'] == 'owner') ){ //role authorize to change 
																
									return true; // if all valiations o.k.
								}else{

									array_push($data['more_data']['messages_errors'], ['authorize_role' => 'Not authorize to update this role !']);	
								}
							
							}else{

								array_push($data['more_data']['messages_errors'], ['no_change_in_update_input' => 'There was no change between prvious data against current data, update action was not execute !']);	
							}


						}else{

							array_push($data['more_data']['messages_errors'], ['email_exsist' => 'Email exsist, try diffrent email !']);	
						}

					}else{

						array_push($data['more_data']['messages_errors'], ['validate_email' => 'Email field is not valid, try again !']);
					}

		}


		View::render('AdminEditOrAddPage', $data);
		die();
	}


	public function updateAdminAndRedirect(){  



		 $result = $this->my_admin->updateAdminDetails(strtolower($_POST['admin_name']),$_POST['admin_phone'],strtolower($_POST['admin_email']),strtolower($_POST['admin_role']),$_POST['admin_id'],$_POST['admin_avatar_img']);


		 header("Location: http://mvc.com/HomeAdmin/Display?message=edit_successful");
	}


	public function deleteAdminAndRedirect(){

		$result = $this->my_admin->deleteAdmin($_POST['admin_id']);

		header("Location: http://mvc.com/HomeAdmin/Display?message=delete_successful");
	}
















}































?>