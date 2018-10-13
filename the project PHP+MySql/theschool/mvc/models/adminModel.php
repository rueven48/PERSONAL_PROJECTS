<?php


class adminModel{ 
	
	
	public function IsAdminExsist($key,$value){

        $query = "SELECT *
                  FROM administrator
                  WHERE $key = '$value'";
        
        return ruevenSQL::queryReturnTrueOrFalse($query);
        
    }


    public function getAllAdminsDetails(){

    	$query = "SELECT *
		          FROM administrator";

		return  ruevenSQL::query_2_array($query);
    }


    public function countNumberOfAdmins(){

		$query = "SELECT COUNT(id) AS number_of_admins
		          FROM administrator";

		return ruevenSQL::queryReturnOneArray($query); 

    }


    public function getAdminByKey($key,$value){

		$query = "SELECT *
		          FROM administrator
				  WHERE $key = '$value'";

		return ruevenSQL::queryReturnOneArray($query);          
	} 


	public function updateAdminDetails($admin_name,$phone,$email,$role,$id,$image){  

		$query = "UPDATE administrator
		          SET name='$admin_name',phone='$phone',email='$email',role='$role',image='$image'
		          WHERE id= $id ";

		return ruevenSQL::q($query);
	} 


	public function deleteAdmin($id){

		$query = "DELETE FROM administrator
		          WHERE id = $id  ";

		return ruevenSQL::q($query);
	}


	public function createAdmin($admin_name,$phone,$email,$role,$image,$password){ 

		$query = "INSERT INTO administrator (name,phone,email,role,image,password)              
     	          VALUES ('$admin_name','$phone','$email','$role','$image','$password') ";

		return ruevenSQL::q($query); 
	}





}













?>