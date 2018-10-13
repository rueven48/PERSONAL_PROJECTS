        
    <html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"> 
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">        
        <link rel="stylesheet" type="text/css" href="/css/mainschool.css"/>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous"> 
    </head> 
    <body>

              
        <div id="container_of_form_login" class="d-flex justify-content-center align-items-center">
                      
            <form action="?" method="post"  id="form_log_in"  accept-charset="utf-8" class="border border-dark shadow-lg bg-white rounded">
           
            <div class="container_all_login_form_elements">
          
                <div id="container_text_subject_login">

                    <h1 class="mb-5 login_h1_text">LOGIN</h1>
                
                </div>
                
                <div id="contaier_password_plus_username">   
                                                        
                    <label class="p-2" for="username_input">Username :</label>

                    <input type="text" id="username_input" name="username">
                                   
                <div>
                        
                
                <div class="message_errors login_error_name">
                       

                    <?php foreach ($messages_errors as $message){
                    
                                echo $message['missing_name'];
                                echo $message['validate_email'];
                           }
                    ?>
                    
                </div> 


                <div>

                    <label class="p-2 mt-3 ml-1" for="user_password">Password :</label>

                    <input type="password" id="user_password" name="password">
                
                </div>                               
                

                <div class="message_errors login_error_password">
                
                    <?php foreach ($messages_errors as $message){
                        
                                 echo $message['missing_password'];
                          }
                    ?>
                        
                </div> 

                <div id="container_login_input">

                    <input type="submit" class="btn btn-primary" id="login_input" value="Login">
                
                </div>

               
                <div class="message_errors wrong_error_name">
                
                  <?php foreach ($messages_errors as $message){
                        
                               echo $message['wrong_login_details'];
                        }
                  ?>
                        
                </div> 
            
           

            </div>

            

            </form>   
              
        </div>
       
       
    </body>



    </html>
