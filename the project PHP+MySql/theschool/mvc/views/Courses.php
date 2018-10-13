		
	<label class="mt-1">Courses</label>
	
	<?php if( $_SESSION['logged_admin']['role'] != 'sales' ): ?>
		
		<a href="http://mvc.com/Course/EditOrAdd?add_course=new_course"><img class="plus_button" src="/upload/button/plus_button.jpg"></a>
	 
	<?php endif; ?>

	
		
		
		
		<ul class="col mt-3">
		
			<?php foreach($courses_details as $course): ?>
						
			<li class="row p-3">
			
				<img src="<?= $course['image']; ?>" class="mr-2 course_avatar" alt="no course image" >
				
				<a href="http://mvc.com/Course/Display?course_id=<?php echo $course['id'] ?>"><?=  $course['name']; ?></a>
			
			</li>
			
			
				 
			<?php endforeach; ?>
		
		</ul>
		
	
	  	

