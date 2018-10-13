
<html>
<head>
	<title>Student Details</title>
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"> 
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<link rel="stylesheet" type="text/css" href="/css/mainschool.css"/> 
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous"> 
</head> 

<body>

<header>
	
	<?php View::render('mainHeader');  ?>	

</header>

	



	<div class="d-flex column container mh-100">
	
		<div class="flex-grow-0 border-right">
			
			 <?php View::render('Courses',$more_data);  ?>
		
		</div>
	
		<div class="flex-grow-0 border-right">
			
			<?php View::render('Students',$more_data);  ?>
		
		</div>

		<div class="flex-grow-1 border-right">
			
			<?php View::render('StudentDetailsView',$more_data); ?>
		
		</div>


	</div>




	








</body>



</html>