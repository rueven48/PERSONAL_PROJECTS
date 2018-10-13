<?php

class HomeSchoolController{

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
			'number_of_courses' => $this->my_course->countNumberOfCourses(),
			'number_of_students' => $this->my_student->countNumberOfStudents(),
			'messages_success' => '',
			'messages_errors' => '',
	    ];
	    
	    	    

	    if($_GET['message']=='delete_successful'){
			
			$data['more_data']['messages_success'] = [

			'messages_success' => [
			                    'delete_message' => 'Delete was successful !',
							      ]
			];
		}
	  	
	  	
	  			
		View::render('HomeSchoolPage', $data);
		
	}

	

	
}





?>