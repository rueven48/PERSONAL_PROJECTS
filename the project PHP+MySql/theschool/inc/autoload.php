<?php
error_reporting(E_ALL & ~E_NOTICE & ~E_WARNING);

spl_autoload_register(function($class_name){

    if( strpos($class_name, 'Model')!==false ){
        
        $path = sprintf('../mvc/models/%s.php', $class_name);
    	
    }elseif( strpos($class_name, 'Controller')!==false ) {
        
        $path = sprintf('../mvc/controllers/%s.php', $class_name);
     
    }else{
        $path = sprintf('../inc/%s.php', $class_name);
    }


   
   if(file_exists($path)){

        require_once($path);

    }
});

?>