
<html>
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"> 
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous">
</head> 

<body>

<header>
	 
	 <?php View::render('CourseDetailsHeader',$course_details); ?>	

</header>
	
		
	<div class="d-flex">
			
			<img src="<?= $course_details['image']; ?>" id="image_course_display" class="mr-4"  alt="no course image">	
		
			<div>
				
				<p class="row"> <?php echo "Course ".$course_details['name'].", ".count($students_details_in_course)." Students"; ?> <p/>   
							                
				<p class="row"> <?php echo $course_details['description']; ?><p/>

			</div>
	</div>

	<ul class="mt-5">
		
		<?php foreach($students_details_in_course as $student): ?>
					
		<li class="row mb-4">
		
			<img id="student_image_in_course" src="<?= $student['image']; ?>" alt="no course image">
			
			<div><?=  $student['name']; ?></div>
	    
	    </li>
						
		<?php endforeach; ?>

	</ul>

	
	
	<div class="message_success text-center">
			<?php foreach ($messages_success as $message){
				
					echo $message['edit_message'];
					echo $message['create_message'];
			}
			?>
	</div>








</body>



</html>