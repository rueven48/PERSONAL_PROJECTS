<html>
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"> 
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head> 

<body>

<header>
		
	<?php

	if( isset($_GET['course_id']) ){
		 
		View::render('CourseEditHeader',$course_details);
	}else{

		View::render('CourseAddHeader');
	}
	 
    ?> 

</header>
		
		<?php if( isset($_GET['course_id']) ){
					
				echo '<form action="?course_id='.$_GET["course_id"].'" method="post" accept-charset="utf-8">';
			  }else{
				
				echo '<form action="?add_course=new_course" method="post" accept-charset="utf-8">';
			  }
		?>

		
		<input type="hidden" name="course_id" value="<?= $_GET['course_id'] ?>">
		
		<?php if( isset($_GET['add_course']) ){
				  
				  echo '<input type="hidden" name="add_course" value="<?=new_scourse ?>">';
		      }
		?>
				
		
		<button type="submit" class="btn btn-primary button_save" name="action_click" value="save">Save</button>	
				  
		<?php if( !isset($_GET['add_course']) && count($students_details_in_course)==0 ){
		  		 
		  		 echo '<button type="submit" class="btn btn-primary button_delete" data-toggle="confirmation" name="action_click" value="delete">Delete</button>';
		  	  }
		?>
		
		 

		  <div class="container_of_errors">
			  
			  <div id="input_course_name_plus_label"> 
			  
				  <label class="p-2" for="name_input">Name :</label>

				  <input class="p-2 input_course_name" type="text" id="name_input" name="course_name"
				  value="<?= $course_details['name']; ?>">
			  
			  </div>
			  
			  <span class="message_errors course_error_name">
				   <?php foreach ($messages_errors as $message){
							
							echo $message['missing_name'];
							echo $message['same_course'];
					    }
			      ?>
			  </span>
		  </div>

		  
		  <div class="container_of_errors_and_input_for_description">
			  	        
		      <div id="container_label_description">

		      	<label class="p-2" for="description_input">Description :</label>
  			  
  			  </div>	

  			  <div id="container_description_course">

		          <textarea class="p-2" type="text" id="description_input" name="course_description"
				  	value=""><?= $course_details['description']; ?></textarea>

			  </div>	
			  
			  <span class="message_errors course_error_description">
					  <?php foreach ($messages_errors as $message){
						      
						      echo $message['missing_description'];
					        }
					  ?>
			 </span>
		 </div>
		  	

			   		
		<label class="mt-3" for="file">Choose file to upload :</label>

		<input type="file" name="input_file" id="input_course_image"
		onchange="previewImage(this,'course');" accept=".jpg, .jpeg, .png" >
				
		
		<p class="p-2" >Image :</p>
		
		<img src="<?= $course_details["image"];?>" id="avatar_image_id" alt="no course pic">
				
		<input type="hidden" id="input_avatar_hidden_course" name="course_avatar_img" value="<?= $course_details['image']; ?>">
	

		<?php

			if( !isset($_GET['add_course']) ){
				
				echo "<div class='mt-3'> Total ". count($students_details_in_course)." Students taking this course </div>";
			}

		?>
		
		
		<div class="message_errors">
         
	    	<?php foreach ($messages_errors as $message){

				echo $message['no_change_in_update_input'];
			} ?>
		
		</div>
				

		</form>
	


</body>



</html>