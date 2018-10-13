<?php


class CourseController{
	
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
			'course_details' =>   $this->my_course->getCourseByKey('id',$_GET['course_id']), 
			'students_details_in_course' => $this->my_student->getStudentsInCourse($_GET['course_id']),
			'messages_success' => '',
			'messages_errors' => [],
	    ];

	    if($_GET['message'] == 'edit_successful'){
	    	    	
	    	$data['more_data']['messages_success'] = [

			'messages_success' => [
			                      'edit_message' => 'Edit was successful !',
			                      ]
			];
	    }

	    if($_GET['message'] == 'create_successful'){
	    	    	
	    	$data['more_data']['messages_success'] = [

			'messages_success' => [
			                      'create_message' => 'Create was successful !',
			                      ]
			];
	    }
	    

		View::render('CourseDetailsPage', $data);
	}



	public function EditOrAddAction(){

		if( !$this->my_validations->isLoggedIn() || $_SESSION['logged_admin']['role'] == 'sales' ){ //r u logged in and not sales?
			
			View::render('MaliciousPage');

			die();
		}
		
		if( isset($_GET['add_course']) || isset($_POST['add_course']) ){ //add mode
		
			$this->validBeforeAddCourseAndCreate();
		
		}else{ //edit mode


			if($_POST['action_click'] == 'save'){
				
				if( $this->validBeforeUpdate() ){
					
					$this->updateCourseAndRedirect();
				}
				
			}

			if($_POST['action_click'] == 'delete'){
				
				$this->deleteCourseAndRedirect();
			}

			$data = [];
		    $data['more_data'] = [
		        'courses_details' => $this->my_course->getAllCoursesDetails(),
				'students_details' => $this->my_student->getAllStudentsDetails(),
				'course_details' =>   $this->my_course->getCourseByKey('id',$_GET['course_id']),
				'students_details_in_course' => $this->my_student->getStudentsInCourse($_GET['course_id']),
				'messages_success' => '',
				'messages_errors' => '',
				
		    ];

	    	View::render('CourseEditOrAddPage', $data);
		}
	}	


	public function validBeforeAddCourseAndCreate(){

		$data = [];
		$data['more_data'] = [
					        'courses_details' => $this->my_course->getAllCoursesDetails(),
							'students_details' => $this->my_student->getAllStudentsDetails(),
							'messages_errors' => [],
		                    ];

		if($_POST['action_click'] == 'save'){
		
			
			if( $this->my_validations->validEmptyField($_POST['course_name'])  ){ //course name empty
						
				array_push($data['more_data']['messages_errors'], ['missing_name' => 'Name field is empty, try again !']);

			}


			if( $this->my_validations->validEmptyField($_POST['course_description']) ){ //course description empty
								
				array_push($data['more_data']['messages_errors'], ['missing_description' => 'Description is empty, try again !']);
			}

			if( !($this->my_validations->validEmptyField($_POST['course_name'])) && !($this->my_validations->validEmptyField($_POST['course_description'])) ){
				

				if( !$this->my_course->IsCourseExsist('name',$_POST['course_name']) ){ //name course not exsists
					
					$this->newCourseCreateAndRedirect(); // if all valiations o.k.
				}else{

					array_push($data['more_data']['messages_errors'], ['same_course' => 'Course exsist, try diffrent name !']); 
				}	

				
			}
		}                    
		

		View::render('CourseEditOrAddPage', $data);
	}

	

	public function newCourseCreateAndRedirect(){

		$result = $this->my_course->createCourse(strtolower($_POST['course_name']),$_POST['course_description'],$_POST['course_avatar_img']);

		$course = $this->my_course->getCourseByKey('name',$_POST['course_name']);
		
		header("Location: http://mvc.com/Course/Display?course_id={$course['id']}&message=create_successful");
	} 

	
	public function validBeforeUpdate(){

		$data = [];
		    $data['more_data'] = [
		        'courses_details' => $this->my_course->getAllCoursesDetails(),
				'students_details' => $this->my_student->getAllStudentsDetails(),
				'course_details' =>   $this->my_course->getCourseByKey('id',$_POST['course_id']),
				'students_details_in_course' => $this->my_student->getStudentsInCourse($_POST['course_id']),
				'messages_errors' => [],
		    ];
		
		
		if( $this->my_validations->validEmptyField($_POST['course_name'])  ){ //course name empty
						
				array_push($data['more_data']['messages_errors'], ['missing_name' => 'Name field is empty, try again !']);
		}

		if( $this->my_validations->validEmptyField($_POST['course_description']) ){ //course description empty
								
				array_push($data['more_data']['messages_errors'], ['missing_description' => 'Description is empty, try again !']);
		}

		if( !($this->my_validations->validEmptyField($_POST['course_name'])) && !($this->my_validations->validEmptyField($_POST['course_description'])) ){ // both fields not empty
			
			if( $data['more_data']['course_details']['name'] != $_POST['course_name'] || $data['more_data']['course_details']['description'] != $_POST['course_description'] || $data['more_data']['course_details']['image'] != $_POST['course_avatar_img']  ){ //if there is change in update filed
				
				return true; // if all valiations o.k.
			}else{

				array_push($data['more_data']['messages_errors'], ['no_change_in_update_input' => 'There was no change between prvious data against current data, update action was not execute !']);	
			}


			
		}
	
		View::render('courseeditoraddPage', $data);
		die();
	}


	public function updateCourseAndRedirect(){

		$result	= $this->my_course->updateCourseDetails(strtolower($_POST['course_name']),$_POST['course_description'],$_POST['course_id'],$_POST['course_avatar_img']);
		
		header("Location: http://mvc.com/Course/Display?course_id={$_POST['course_id']}&message=edit_successful");
	}
	
	public function deleteCourseAndRedirect(){

		$result	= $this->my_course->deleteCourse($_POST['course_id']);

		header("Location: http://mvc.com/HomeSchool/Display?message=delete_successful");
	}	




























}




















?>