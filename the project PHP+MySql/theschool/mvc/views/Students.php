		
	
	<label  class="mt-1">Students</label>
	
	<?php if( $_SESSION['logged_admin']['role'] != 'sales' ): ?>	

	<a href="http://mvc.com/Student/EditOrAdd?add_student=new_student"><img class="plus_button" src="/upload/button/plus_button.jpg"></a>  
	
	<?php endif; ?>

		
		<ul class="col">
			
			<?php foreach($students_details as $student): ?>
						
			<div class="row mt-4 p-1">
				
				<img src="<?= $student['image']; ?>" class="student_avatar" alt="no student image" >
			
				<div class="mx-4">

					<li class="row">
						
						<a href="http://mvc.com/Student/Display?student_id=<?php echo $student['id'] ?>"><?=  $student['name']; ?></a>

					</li>
					
					<li class="row"><?= $student['phone']; ?></li>
			
			 	</div>

			</div>

			<?php endforeach; ?>
		
		</ul>
		
		
		
	










