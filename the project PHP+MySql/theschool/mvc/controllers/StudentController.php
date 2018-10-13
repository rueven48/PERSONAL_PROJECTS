<?php


class StudentController{ 
	
	private $my_course,$my_student,$my_validations;

	function __construct(){
		
		$this->my_course = new courseModel();
		
		$this->my_student = new studentModel();
		
		$this->my_validations = new validations();
	}


	public function DisplayAction(){

		if( !$this->my_validations->isLoggedIn() ){ //r u logged in ?
			
			View::render('MaliciousPage');

			die();
		}

				
		$data = [];
	    $data['more_data'] = [
	        'courses_details' => $this->my_course->getAllCoursesDetails(),
			'students_details' => $this->my_student->getAllStudentsDetails(),
			'student_details' => $this->my_student->getStudentByKey('id',$_GET['student_id']),
			'courses_of_student' => $this->my_course->getStudentCourses($_GET['student_id']),
			'messages_success' => '',
			'messages_errors' => '',
	    ];

	    if($_GET['message'] == 'edit_successful'){
	    	
	    	$data['more_data']['messages_success'] = [

			'messages_success' => [
			                    'delete_message' => 'Delete was successful !',
			                    'edit_message' => 'Edit was successful !',
			                      ]
			];
	    }

	    if($_GET['message'] == 'create_successful'){
	    	
	    	$data['more_data']['messages_success'] = [

			'messages_success' => [
			                    'delete_message' => 'Delete was successful !',
			                    'create_message'  => 'Create was successful !'
							      ]
			];

	    }

	   
	    View::render('StudentDetailsPage', $data);
	}




	public function EditOrAddAction(){

		if( !$this->my_validations->isLoggedIn() ){
			
			View::render('MaliciousPage');

			die();
		}	


		if( isset($_GET['add_student']) || isset($_POST['add_student']) ){  // add mode
		
			if( $_SESSION['logged_admin']['role'] == 'sales' ){
			
			View::render('MaliciousPage');

			die();
			}

			$this->validBeforeAddStudentAndCreate();
		
		}else{ //edit mode 

				if($_POST['action_click'] == 'save'){
			    	
			    	if( $this->validBeforeUpdate() ){
			    		
			    		$this->updateCoursesBelongToStudent();
			    		$this->updateStudentAndRedirect();
			    	}

			    	
			    }

			    if($_POST['action_click'] == 'delete'){
			    	
			    	$this->deleteStudentAndRedirect();
			    }
     
		
			$data = [];
		    $data['more_data'] = [
		        'courses_details' => $this->my_course->getAllCoursesDetails(),
				'students_details' => $this->my_student->getAllStudentsDetails(),
				'student_details' => $this->my_student->getStudentByKey('id',$_GET['student_id']),
				'courses_of_student' => $this->my_course->getStudentCourses($_GET['student_id']),
						
		    ];
		       

		    View::render('StudentEditOrAddPage', $data);
            
            			
	    }

	}


	public function validBeforeAddStudentAndCreate(){
	  
		$data = [];
		$data['more_data'] = [
					        'courses_details' => $this->my_course->getAllCoursesDetails(),
							'students_details' => $this->my_student->getAllStudentsDetails(),
							'messages_errors' => [],
		                    ];

			if($_POST['action_click'] == 'save'){
				
				if( $this->my_validations->validEmptyField($_POST['student_name']) ){ //student name empty
						
				array_push($data['more_data']['messages_errors'], ['missing_name' => 'Name field is empty, try again !']);
				}

				if( $this->my_validations->validEmptyField($_POST['student_phone']) ){  //student phone empty
						
				array_push($data['more_data']['messages_errors'], ['missing_phone' => 'Phone field is empty, try again !']);
				}

				if( $this->my_validations->validEmptyField($_POST['student_email']) ){  //student email empty
						
				array_push($data['more_data']['messages_errors'], ['missing_email' => 'Email field is empty, try again !']);
				}

				if( !($this->my_validations->validEmptyField($_POST['student_name'])) && !($this->my_validations->validEmptyField($_POST['student_phone'])) && !($this->my_validations->validEmptyField($_POST['student_email'])) ){ // 3 fields not empty
					
					if( $this->my_validations->validationInputEmailField($_POST['student_email']) ){ //email pattern valid
							
							
							if( !$this->my_student->IsStudentExsist('email',$_POST['student_email']) ){ //student email exsist
								
								if( !$this->my_student->IsStudentExsist('name',$_POST['student_name']) ){//student name exsist
										
									$this->newStudentCreateAndRedirect(); // if all valiations o.k.
								}else{

									array_push($data['more_data']['messages_errors'], ['same_student' => 'Student exsist, try diffrent name !']);	
								}
							
							}else{

							array_push($data['more_data']['messages_errors'], ['email_exsist' => 'Email exsist, try diffrent email !']);	
							}
							
					}else{

					array_push($data['more_data']['messages_errors'], ['validate_email' => 'Email field is not valid, try again !']);
					}	

				}
				
			}
		    
		    View::render('StudentEditOrAddPage', $data);
	}



	public function newStudentCreateAndRedirect(){


		$result = $this->my_student->createStudent(strtolower($_POST['student_name']),$_POST['student_phone'],strtolower($_POST['student_email']),$_POST['student_avatar_img']);
		
		$student = $this->my_student->getStudentByKey('email',$_POST['student_email']);
		
		header("Location: http://mvc.com/Student/Display?student_id={$student['id']}&message=create_successful");
	}

	public function validBeforeUpdate(){

		$data = [];
		    $data['more_data'] = [
		        'courses_details' => $this->my_course->getAllCoursesDetails(),
				'students_details' => $this->my_student->getAllStudentsDetails(),
				'student_details' => $this->my_student->getStudentByKey('id',$_POST['student_id']),
				'courses_of_student' => $this->my_course->getStudentCourses($_POST['student_id']),
				'messages_errors' => [], 
				
		    ];
		
		
		if( $this->my_validations->validEmptyField($_POST['student_name']) ){ //student name empty
						
			array_push($data['more_data']['messages_errors'], ['missing_name' => 'Name field is empty, try again !']);
		}

		if( $this->my_validations->validEmptyField($_POST['student_phone']) ){  //student phone empty
						
			array_push($data['more_data']['messages_errors'], ['missing_phone' => 'Phone field is empty, try again !']);
		}

		if( $this->my_validations->validEmptyField($_POST['student_email']) ){  //student email empty
						
			array_push($data['more_data']['messages_errors'], ['missing_email' => 'Email field is empty, try again !']);
		}

		if( !($this->my_validations->validEmptyField($_POST['student_name'])) && !($this->my_validations->validEmptyField($_POST['student_phone'])) && !($this->my_validations->validEmptyField($_POST['student_email'])) ){ // 3 fields not empty
					
			if( $this->my_validations->validationInputEmailField($_POST['student_email']) ){ //email pattern valid
					
					$student_current_email = $data['more_data']['student_details']['email'];


					if( !$this->my_student->IsStudentExsist('email',$_POST['student_email']) || $student_current_email == $_POST['student_email']  ){ //if email not exsist or this is the same email of the student without change than valid is ok
						
						$is_change_true = $this->checkCheckboxsForChanges(); // check if there is change in checks checkboxs
						
												

						if( $data['more_data']['student_details']['name'] != $_POST['student_name'] || $data['more_data']['student_details']['phone'] != $_POST['student_phone'] || $data['more_data']['student_details']['email'] != $_POST['student_email'] ||  $data['more_data']['student_details']['image'] != $_POST['student_avatar_img'] || $is_change_true ){ // change happened
							
							return true; // if all valiations o.k.
						}else{

							array_push($data['more_data']['messages_errors'], ['no_change_in_update_input' => 'There was no change between previous data against current data, update action was not execute !']);	
						}
	
									
					}else{
					
					array_push($data['more_data']['messages_errors'], ['email_exsist' => 'Email exsist, try diffrent email !']);	
					}
					
			}else{

			array_push($data['more_data']['messages_errors'], ['validate_email' => 'Email field is not valid, try again !']);
			}	

		}
		
		
		View::render('StudentEditOrAddPage', $data);
		die();
	}
	

	public function updateCoursesBelongToStudent(){

					
			$arr_student_courses = [];

			$courses_belong_student  = $this->my_course->getStudentCourses($_POST['student_id']);

			foreach ($courses_belong_student as $course) {
				
				array_push($arr_student_courses, $course['name']) ; //populate names of shared courses in arr_student_courses
			}

			foreach ($_POST['courses_checked'] as $course){
				
				
				$course_att_checkbox = $this->my_course->getCourseByKey('name',$course); //needle

				$result = in_array($course, $arr_student_courses);

				if($result == false){  //new course been checked
					
				  $result = $this->my_course->existCourseNowIsAddToStudent($_POST['student_id'],$course_att_checkbox['id']);

				}

			}
		
			
			foreach ($arr_student_courses as $course){
					
				$result	= !in_array($course, $_POST['courses_checked']); 
				
					if($result == true){ // exsist course is unchecked
						
						$courses_id_not_checked = $this->my_course->getCourseByKey('name',$course);
						
						$this->my_course->deleteCourseBelongToStudent($courses_id_not_checked['id'],$_POST['student_id']);
					}

			}

	}


	public function updateStudentAndRedirect(){
		
		$result = $this->my_student->updateStudentDetails(strtolower($_POST['student_name']),$_POST['student_phone'],strtolower($_POST['student_email']),$_POST['student_id'],$_POST['student_avatar_img']);
	
		header("Location: http://mvc.com/Student/Display?student_id={$_POST['student_id']}&message=edit_successful");
	}

	
	public function deleteStudentAndRedirect(){

		$result	= $this->my_student->deleteStudent($_POST['student_id']);

		header("Location: http://mvc.com/HomeSchool/Display?message=delete_successful");
	}


	public function checkCheckboxsForChanges(){

					
			$arr_student_courses = [];

			$courses_belong_student  = $this->my_course->getStudentCourses($_POST['student_id']);

			foreach ($courses_belong_student as $course){
				
				array_push($arr_student_courses, $course['name']) ; //populate share courses in $arr_student_courses
			}

			
			foreach ($arr_student_courses as $course){
				
			$result	= !in_array($course, $_POST['courses_checked']); 
			
				if($result == true){ // exsist course is unchecked
					
					return true;
				}

			}
			

			foreach ($_POST['courses_checked'] as $course){
				
				$result = in_array($course, $arr_student_courses); 
				
				if($result == false){ //new course checked
					
					return true;
				}
			
			}
			return false;
	}


	









}







?>