<?php
class Router {
    //route requests to appropriate controllers
    //We agreed on this structure: /$controller/$action/

    private $controller, $action;

    public function __construct($controller_from_url,$action_from_url){
                
                if( !isset($controller_from_url) ){
                    $controller_from_url = $_GET['controller'];
                }
                if( !isset($action_from_url) ){
                    $action_from_url = $_GET['action'];
                }
           

                $this->controller = $controller_from_url;
                $this->action = $action_from_url;
 
    }

    
    private function normalize_name($name, $type) {
        
    
        if($type=='action') {
            return strtolower($name) . 'Action';
        }
    
        if($type=='controller'){
            return strtolower($name) . 'Controller';
        }
    }

    public function go() {
        
        $controller_name    = $this->normalize_name($this->controller, 'controller');
      
        $action_name  = $this->normalize_name($this->action, 'action');
        

        if( !class_exists($controller_name) ) {
          
          header("Location: /login/getlogin");  
          die();
        }

        
        
        $controller_instance = new $controller_name();
                

        $callable_param = [$controller_instance, $action_name];
        //
        if( !is_callable($callable_param) ) {
            
            header("Location: /login/getlogin");  
            die();
        }
        
        call_user_func_array($callable_param, []);
        
    }


}


?>