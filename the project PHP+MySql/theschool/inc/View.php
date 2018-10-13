<?php
class View {
    const PATH = '../mvc/views/';

    public static function render($view_name, $data) {
        $view_filename  = sprintf("%s.php", $view_name);
        

        $view_path = self::PATH . $view_filename;
        //../mvc/views/profile.php

        if(!file_exists($view_path)) {
            die("Missing View: $view_name");
        }
        
                        
        
        extract($data);

        
        
        
        include($view_path);
    }
}

?>

