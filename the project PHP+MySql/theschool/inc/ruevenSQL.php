<?php
define('DB_HOST',       'localhost');
define('DB_USERNAME',   'root');
define('DB_PASSWORD',   '');
define('DB_NAME',       'the_school_db');


class ruevenSQL{
    
    
    static public function connect() {
        
        global $_mydb;
        $_mydb = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

    }
    
    static function query_2_array($query){
   
        global $_mydb;
        $results_assoc_array = [];
        $result = $_mydb->query( $query );
             
        while ( $row = $result->fetch_assoc() ) {
            array_push($results_assoc_array, $row);
        }
        return $results_assoc_array;
    }
     
    static function queryReturnId($query){
                
        global $_mydb;
        $result = $_mydb->query($query);
        while ( $row = $result->fetch_assoc() ) {
          $id = $row['id']; 
        }
        return $id;
    }   
    
    static function queryReturnTrueOrFalse($query){

        global $_mydb;
        $result = $_mydb->query($query);
         
            while ($row = $result->fetch_assoc()){
                return true;
            }
        return false;
    } 
    
    
    static function queryReturnOneArray($query){

        global $_mydb;
        $result = $_mydb->query($query);
                
        while ($row = $result->fetch_assoc()){
                $arr = $row;
        }
        return $arr;
    }
 
    static function q($query){
        
        global $_mydb;
        return $_mydb->query( $query );
    }

 
}

ruevenSQL::connect();


?>