				

		<label class="mb-5">Administrators</label>
		
		<a href="http://mvc.com/Admin/EditOrAdd?add_admin=new_admin"><img class="plus_button" src="/upload/button/plus_button.jpg"></a>
				
			
			<?php foreach($admins_details as $admin): ?>
			

			<ul class="d-flex justify-content-center p-2">
				
				<div>
				
					<img src="<?= $admin['image'];?>"  class="admin_avatar"  alt="no course image">
				
				</div>				

				<div class="mx-4">
				
					<?php if( (($_SESSION['logged_admin']['role'] == 'manager') &&  ($admin['role'] == 'owner')) || (($_SESSION['logged_admin']['role'] == 'manager') &&  ($admin['role'] == 'manager'))  ): ?>
					
					
					<li class="row">
					
						<a> <?=  $admin['name']; ?> </a>
						
						<?= ", ".$admin['role'] ?>
				    
				    </li>	

					<?php endif; ?>
					
					
					<?php if( ($_SESSION['logged_admin']['role'] == 'manager') &&  $admin['role'] == 'sales'):     ?>

					<li class="row">
					
						<a href="http://mvc.com/Admin/EditOrAdd?admin_id=<?php echo $admin['id'] ?>"><?=  $admin['name']; ?></a>
						
						<?= ", ".$admin['role'] ?>

				    </li>
					
					<?php endif; ?>

					
					<?php if( $_SESSION['logged_admin']['role'] == 'owner' ): ?>
					
					<li class="row">
					
						<a href="http://mvc.com/Admin/EditOrAdd?admin_id=<?php echo $admin['id'] ?>"><?=  $admin['name']; ?></a>
						
						<?= ", ".$admin['role'] ?>
				    
				    </li>
							
					<?php endif; ?>
					
					<li class="row">
					
						<?= $admin['phone']; ?>
					
					</li>
				
					<li class="row">
				
						<?= $admin['email']; ?>
				
					</li>

				</div>
				

			</ul>

			
			<?php endforeach; ?>
		
		
		
		


