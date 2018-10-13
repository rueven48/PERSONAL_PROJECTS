<html>
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"> 
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<link rel="stylesheet" type="text/css" href="/css/mainschool.css"/> 
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous">
</head> 

<body>

<header>

	<?php

	if(isset($_GET['admin_id']) ){
		
		View::render('AdminEditHeader',$admin_details);
	}else{

		View::render('AdminAddHeader');
	}

	?>	

</header>

				
		<?php if( isset($_GET['admin_id']) ){
			
				 echo '<form action="?admin_id='.$_GET["admin_id"].'" method="post" accept-charset="utf-8">';
			  }else{
			
				 echo '<form action="?add_admin=new_admin" method="post" accept-charset="utf-8">';
		      }
        ?>
		
	
		
		<?php if( isset($_GET['add_admin']) ){
			
				 echo '<input type="hidden" name="add_admin" value="<?=new_admin ?>">';
			  }else{
				 
				 echo '<input type="hidden" name="admin_id" value="'.$_GET["admin_id"].'">';
		      }	
		
		?>
							
		<button id="admin_save_button" type="submit" class="btn btn-primary button_save" name="action_click" value="save">Save</button>
					
		
		<?php

		$click_add = isset($_GET['add_admin']);
		
		$admin_owner_look_himself = $_SESSION['logged_admin']['role'] == 'owner'  &&  $admin_details['role'] == 'owner';
						
		if( (!$click_add && !$admin_owner_look_himself) ){
				
			echo '<button id="admin_delete_button" class="btn btn-primary button_delete" data-toggle="confirmation" type="submit" name="action_click" value="delete">Delete</button>';
		}
		?>
		  
		<div class="container_of_errors">  
						
			<div id="input_admin_name_plus_label">	
	
				<label class="p-2" for="name_input">Name :</label>

				<input class="p-2 input_admin_name" type="text" id="name_input" name="admin_name"
				value="<?= $admin_details['name']; ?>">
			
			</div>	
			
			<span class="message_errors admin_error_name">
			<?php foreach ($messages_errors as $message){
			        	
			        	echo $message['missing_name'];
			        	echo $message['same_admin'];
			      }
			?>
			</span>
		
		</div>
		
		
		 
		<div class="container_of_errors"> 
		   
		  	<div id="input_admin_phone_plus_label">

			  	<label class="p-2" for="phone_input">Phone :</label>

			  	<input class="p-2 input_admin_phone" type="text" id="phone_input" name="admin_phone"
			  	value="<?= $admin_details['phone']; ?>">
			
			</div>
		  	
		  	<span class="message_errors admin_error_phone">
	                 <?php foreach ($messages_errors as $message){
						echo $message['missing_phone'];
	 		} ?>
	 		</span>
		
		</div>  
		   
		
		<div class="container_of_errors">   
		   
		   	<div id="input_admin_email_plus_label">

			   	<label class="p-2" for="email_input">Email :</label>

			   	<input class="p-2 input_admin_email" type="text" id="email_input" name="admin_email"
			   	value="<?= $admin_details['email']; ?>">
		   	
		   	</div>
		   	
		   	<span class="message_errors admin_error_email">
		   	 <?php foreach ($messages_errors as $message){
				  
			         echo $message['missing_email'];
				     echo $message['validate_email'];
					 echo $message['email_exsist'];
			       }
			?> 
			</span>
		
		</div>
		    
			
			
		<?php if( ($_SESSION['logged_admin']['role'] == 'manager')  ): ?>

		<input type="hidden" name="admin_role" value="<?= 'sales' ?>">

		<div class="container_of_errors">
			
		   	<div id="input_admin_role_plus_label">

			   	<label class="p-2" for="role_input">Role :</label>

			   	<input class="p-2 input_admin_role" type="text" id="role_input" name="admin_role"
			   	value="<?= 'sales'?>">
		   	
		   	</div>
		   	
		   	<span class="message_errors admin_error_role">
			<?php foreach ($messages_errors as $message){
						
						echo $message['missing_role'];
						echo $message['authorize_role'];
			       }
			?>
			</span>

	    </div>
		
		<?php endif; ?>
		
					
		
		<?php if( $_SESSION['logged_admin']['role'] == 'owner'  &&  $admin_details['role'] == 'owner' ): ?>
		
		<input type="hidden" name="admin_role" value="<?= $admin_details['role']; ?>">
		
		<div class="container_of_errors">
			
		   	<div id="input_admin_role_plus_label">

			   	<label class="p-2" for="role_input">Role :</label>

			   	<input class="p-2 input_admin_role" type="text" id="role_input" name="admin_role"
			   	value="<?= $admin_details['role']; ?>">
		   	
		   	</div>
		   	
		   	<span class="message_errors admin_error_role">
	        <?php foreach ($messages_errors as $message){

				    echo $message['missing_role'];
					echo $message['authorize_role'];
				  }
			?>
			</span>
	    
	    </div>

		<?php endif; ?>


		<?php if( $_SESSION['logged_admin']['role'] == 'owner'  &&  $admin_details['role'] != 'owner' ): ?>

		<div class="container_of_errors">
			
		   	<div id="input_admin_role_plus_label">

			   	<label class="p-2" for="role_input">Role :</label>

			   	<input class="p-2 input_admin_role" type="text" placeholder="sales or manager" id="role_input" name="admin_role"
			   	value="<?= $admin_details['role']; ?>">
			   	
		   	</div>
		   	
		   	<span class="message_errors admin_error_role">
	        <?php foreach ($messages_errors as $message){
		
					echo $message['missing_role'];
					echo $message['authorize_role'];
			      }
			?>
			</span>
	    
	    </div>
	    

		<?php endif; ?>

			
			
		<?php if( isset($_GET['add_admin']) ) : ?>
		
		<div class="container_of_errors">
			
		   	<div id="input_admin_password_plus_label">

			   	<label class="p-2" for="password_input">Password :</label>

			   	<input class="p-2 input_admin_paasword" type="password" id="password_input" name="admin_password">
			   	
		   	</div>
		   	
		   	<span class="message_errors admin_error_password">
		   	<?php foreach ($messages_errors as $message){
	       					
	       			echo $message['missing_password'];
	              }
	        ?>
	        </span>
	    
	    </div> 
		
		<?php endif; ?>

		
		
		<label class="mt-5" for="file">Choose file to upload :</label>
		
		<input type="file" name="input_file" onchange="previewImage(this,'admin');" accept=".jpg, .jpeg, .png" >
				
		<p class="p-2" >Image :</p>
									
		<img src="<?= $admin_details["image"];?>" id="avatar_image_id" alt="no admin pic">
		
		<input type="hidden" id="input_avatar_hidden_admin" name="admin_avatar_img" value="<?= $admin_details['image']; ?>">
		

		<div class="message_errors">
             
	        <?php foreach ($messages_errors as $message){
		
					echo $message['no_change_in_update_input'];
				  }
			?>
		</div>

				
			
	

			

		</form>




<?php if( $_SESSION['logged_admin']['role'] == 'owner' && $admin_details['role'] == 'owner' ) : ?>

      <script type="text/javascript">

      document.getElementById("role_input").disabled = true;

      </script>	

<?php endif; ?>



<?php if( ($_SESSION['logged_admin']['role'] == 'manager')  ) : ?>

      <script type="text/javascript">

      document.getElementById("role_input").disabled = true;

      </script>	
	
<?php endif; ?>








</body>



</html>