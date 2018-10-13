<html>
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"> 
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous"> 
</head> 

<body>

<header>
	
	<?php

	if( isset($_GET['student_id']) ){
	
		View::render('StudentEditHeader',$student_details);
	}else{

		View::render('StudentAddHeader');
	}

	?>	 

</header>

		
		
		<?php if( isset($_GET['student_id']) ){
			
			echo '<form action="?student_id='.$_GET["student_id"].'" method="post" accept-charset="utf-8">'; 
		}else{
			
			echo '<form action="?add_student=new_student" method="post" accept-charset="utf-8">';
		}
		?>
				

		<input type="hidden" name="student_id" value="<?= $_GET['student_id'] ?>">
		
		<?php if( isset($_GET['add_student']) ){
			
			echo '<input type="hidden" name="add_student" value="<?=new_student ?>">';
		}
		?>
		

		<button type="submit" class="btn btn-primary button_save" name="action_click" value="save">Save</button>		
		  
		  
		<?php if( !isset($_GET['add_student']) ){
				
				echo '<button type="submit" class="btn btn-primary button_delete" data-toggle="confirmation" name="action_click" value="delete">Delete</button>';
		      }
		?>
		  
		  
	  	<div class="container_of_errors">		
		   	
		   	<div id="input_student_name_plus_label">		   
		    
			    <label class="p-2" for="name_input">Name :</label>

			    <input class="p-2" type="text" id="name_input" name="student_name"
			    value="<?= $student_details['name']; ?>">
		   	
		   	</div>		  
		    
		    <span class="message_errors student_error_name">
				  <?php foreach ($messages_errors as $message){
								
								echo $message['missing_name'];
								echo $message['same_student'];
						}
			  	  ?>
		    </span>
		
		</div>
		 
		  
        <div class="container_of_errors"> 	  
		    		  	
		  	<div id="input_student_phone_plus_label">

			  	<label class="p-2" for="phone_input">Phone :</label>
			  	
			  	<input class="p-2" type="text" id="phone_input" name="student_phone" value="<?= $student_details['phone']; ?>">
		  	
		  	</div> 		  	 
		  	
		  	<span class="message_errors student_error_phone">
		  	 <?php foreach ($messages_errors as $message){
						
						echo $message['missing_phone'];
			       }
			 ?>
			</span>
	    
	    </div>
		   
	    
	    <div class="container_of_errors">
		    
		   	<div id="input_student_email_plus_label">
		   	
			   	<label class="p-2" for="email_input">Email :</label>

			   	<input class="p-2" type="text" id="email_input" name="student_email"
			   	value="<?= $student_details['email']; ?>">
		   
		   </div>

		   	<span class="message_errors student_error_email">
		   	<?php foreach ($messages_errors as $message){
					
					echo $message['missing_email'];
					echo $message['email_exsist'];
					echo $message['validate_email'];
			      }
			?>
			</span>
		
		</div>
		   		
		<div class="message_errors mt-1">
             
	        <?php foreach ($messages_errors as $message){
		
					echo $message['no_change_in_update_input'];
			} ?>
		
		</div>

		    
		    <label class="p-2 mt-3" for="file">Choose file to upload :</label>
		    
		    <input type="file" name="input_file" id="input_student_image"
		    onchange="previewImage(this,'student');" accept=".jpg, .jpeg, .png">
 

		
		<p>Image :</p>
			
		<img src="<?= $student_details["image"];?>" id="avatar_image_id" alt="no student pic">
					 
					

		<input type="hidden" id="input_avatar_hidden_student" name="student_avatar_img" value="<?= $student_details['image']; ?>">
			

		<?php if( !isset($_GET['add_student']) ) :  ?>

 		
 		<p class="p-1" >Courses :</p>

		<div id="add_edit_student_courses_list">
							
			<?php

			$same_courses_name = []; 

			foreach($courses_of_student as $course){ 
			
				array_push($same_courses_name,$course['name']);

			}

			foreach($courses_details as $course){
		 	
		 	$checked = in_array($course['name'],$same_courses_name) ? 'checked' : '';  

			echo  "<div> <label class='container_checkboxs_and_label'>{$course['name']} <input type='checkbox' class='checkbox_input' name='courses_checked[]' value='{$course['name']}' ". $checked." >
			    <span class='checkmark'></span> </label> </div>";
			
			}?>  
		
		

		</div>

		<?php endif ?>			 
		
		
		
		
		
		

		  
				
		</form>








</body>



</html>