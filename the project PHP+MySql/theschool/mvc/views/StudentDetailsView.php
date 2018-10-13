<html>
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"> 
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous"> 
</head> 

<body>

<header>
	
	<?php View::render('StudentDetailsHeader',$student_details);  ?>	

</header>

			
		<div class="d-flex flex-row p-8">
				
				
				<img src="<?= $student_details['image']; ?>" class="mr-4" id="image_student_display" alt="no course image">	
				
				<div>
					
					<p class="row"> <?php echo $student_details['name']; ?><p/>	
					
					<p class="row"> <?php echo $student_details['phone']; ?><p/>
					
					<p class="row"> <?php echo $student_details['email']; ?><p/>

				</div>
		</div>
	

		<ul class="p-8 mt-5">
			
			<?php foreach($courses_of_student as $course): ?>
						
			<li class="row mb-4">
			
				<img src="<?= $course['image']; ?>" id="course_image_in_student" alt="no course image">
				
				<span class="ml-3"><?=  $course['name']; ?></span>
			
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