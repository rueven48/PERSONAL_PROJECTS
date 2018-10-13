			
		
		<nav id="main_nav">
			
			<div class="d-flex justify-content-between">
				
				<div>
				
					<img class="p-2" src="/upload/header/schoollogo.jpg" alt="school logo" id="img_header_logo">
					|
					<a href="http://mvc.com/HomeSchool/Display" class="p-2 links_of_header" >School</a> |
					
					<?php if( $_SESSION['logged_admin']['role'] != 'sales' ): ?>
									
					<a href="http://mvc.com/HomeAdmin/Display" class="p-2 links_of_header">Administration</a> |
					
					<?php endif; ?>
					
				</div>	
					
				<div>
					
					<?php
					
					echo $_SESSION['logged_admin']['name'].', '.$_SESSION['logged_admin']['role'];
					
					?>

					<img src="<?= $_SESSION['logged_admin']['image'];?>" alt="admin logo" class="admin_avatar">
					
					<div> <a href="http://mvc.com/logout/getlogout" class="links_of_header">Logout</a> </div>
				
				
				</div>
			
			</div>
		
		</nav>


	
<script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
crossorigin="anonymous"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>

<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T" crossorigin="anonymous"></script>

<script src="https://cdn.jsdelivr.net/npm/bootstrap-confirmation2/dist/bootstrap-confirmation.min.js"></script>
		
		
	  	
	
	





