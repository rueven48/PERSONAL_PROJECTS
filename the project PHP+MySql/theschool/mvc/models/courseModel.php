<?php


class courseModel{
	
	
	public function getAllCoursesDetails(){

		$query = "SELECT *
		          FROM course";

		return  ruevenSQL::query_2_array($query);          
	}
	
	public function countNumberOfCourses(){

		$query = "SELECT COUNT(id) AS number_of_courses
		          FROM course";

		return ruevenSQL::queryReturnOneArray($query);          
	}

	public function getStudentCourses($id){

		$query = "SELECT c.id id,c.name name,c.image image
		          FROM student s LEFT JOIN student2course s2c ON (s.id=s2c.studentid)
		          				 INNER JOIN course c ON (c.id=s2c.courseid)
		          WHERE s.id = $id ";

		return ruevenSQL::query_2_array($query);          
	}


	public function getCourseByKey($key,$value){

		$query = "SELECT *
		          FROM course
				  WHERE $key = '$value'";

		return ruevenSQL::queryReturnOneArray($query);             
	}
	
	public function updateCourseDetails($course_name,$description,$id,$image){ 

		$query = "UPDATE course
	 	          SET name ='$course_name',description ='$description',image ='$image'
	 	          WHERE id = $id ";

		return ruevenSQL::q($query);
	}

	public function existCourseNowIsAddToStudent($student_id,$course_id){

		$query = "INSERT INTO student2course (studentid,courseid)
				  VALUES ($student_id,$course_id)";
	
		return ruevenSQL::q($query);
	}


	public function deleteCourse($id){

		$query = "DELETE FROM course
	 	          WHERE id = $id ";

	 	return ruevenSQL::q($query);
	}

	public function deleteCourseBelongToStudent($course_id,$student_id){

		$query = "DELETE FROM student2course
	 	          WHERE courseid = $course_id AND studentid = $student_id";
	 	
	 	return ruevenSQL::q($query);       
	}


	public function createCourse($name,$description,$image){  

		$query = "INSERT INTO course (name,description,image)               
    	          VALUES ('$name','$description','$image') ";

        return ruevenSQL::q($query); 
	}



	public function IsCourseExsist($key,$value){

    	$query = "SELECT *
                  FROM course
                  WHERE $key = '$value'";
        
        return ruevenSQL::queryReturnTrueOrFalse($query);

    } 
	

	

	 

	










}







?>