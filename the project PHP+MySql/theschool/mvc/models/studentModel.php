<?php

class studentModel{

	public function getAllStudentsDetails(){

		$query = "SELECT *
		          FROM student";

		return  ruevenSQL::query_2_array($query);                 
	}
	
	public function countNumberOfStudents(){

		$query = "SELECT COUNT(id) AS number_of_students
		          FROM student";

		return ruevenSQL::queryReturnOneArray($query);          
	}

	public function getStudentByKey($key,$value){

		$query = "SELECT *
		          FROM student
				  WHERE $key = '$value'";

		return ruevenSQL::queryReturnOneArray($query);          
	}

	public function updateStudentDetails($student_name,$phone,$email,$id,$image){  

		$query = "UPDATE student
		          SET name='$student_name',phone='$phone',email='$email',image='$image'
		          WHERE id= $id ";
	
		return ruevenSQL::q($query);
	} 

	public function deleteStudent($id){

		$this->deleteStudentBelongToCourse($id);
		
		$query = "DELETE FROM student
		          WHERE id = $id  ";

		return ruevenSQL::q($query);
	}

	
	public function deleteStudentBelongToCourse($id){

		$query = "DELETE FROM student2course
	 	          WHERE studentid = $id  ";

	 	return ruevenSQL::q($query);       
	}


	public function getStudentsInCourse($id){

		$query = "SELECT s.name name,s.image image
		          FROM course c LEFT JOIN student2course s2c ON (c.id=s2c.courseid)
		                        INNER JOIN student s ON (s.id=s2c.studentid)
		          WHERE c.id = $id ";

		return ruevenSQL::query_2_array($query);
   	}

    public function createStudent($name,$phone,$email,$image){    

    	$query = "INSERT INTO student (name,phone,email,image)              
    	          VALUES ('$name','$phone','$email','$image') ";

     	return ruevenSQL::q($query); 
    }

    public function IsStudentExsist($key,$value){

    	$query = "SELECT *
                  FROM student
                  WHERE $key = '$value'";
        
        return ruevenSQL::queryReturnTrueOrFalse($query);

    } 

   

}







?>