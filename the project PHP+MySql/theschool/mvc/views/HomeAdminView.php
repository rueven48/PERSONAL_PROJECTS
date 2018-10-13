	
	                           
	<div class="border border-info shadow bg-white rounded">
		
		<p>The number of adiminstrators are : <?php echo $number_of_admins['number_of_admins']; ?><p/>	
	
	</div>
	
	<div class="message_success">
			
			<?php foreach ($messages_success as  $message){
				
					foreach ($message as $value){
						echo 	$value;
					}
			}
			?>
	</div>