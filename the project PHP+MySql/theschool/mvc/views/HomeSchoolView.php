		                          
	<div class="border border-info shadow bg-white rounded">
	
		<p>The number of students are : <?php echo $number_of_students['number_of_students']; ?><p/>	
		
		
		<p>The number of courses are : <?php echo $number_of_courses['number_of_courses']; ?> <p/>	
			

	</div>

	<div class="message_success ">
				<?php foreach ($messages_success as  $message){
					
						foreach ($message as $value){
							echo 	$value;
						}
				}
				?>
	</div>