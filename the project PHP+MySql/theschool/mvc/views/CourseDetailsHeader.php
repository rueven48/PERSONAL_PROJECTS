
	<nav id="course_details_nav" >
								
				
			<div class="d-flex flex-row justify-content-between ">
				
				<p class="p-2">Course <?= $name ?> </p> 
				
				<?php if($_SESSION['logged_admin']['role'] != 'sales'): ?>
								
					  <a href="http://mvc.com/Course/EditOrAdd?course_id=<?php echo $_GET['course_id'] ?>" id="edit_button">Edit</a>
				
				<?php endif;  ?>

			</div>
			
	</nav>