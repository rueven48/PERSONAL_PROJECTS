

function previewImage(input,user_entity_name) {
           
    if (input.files && input.files[0]){
        var reader = new FileReader();
        
           
        reader.onload = function(e){
            
            $('#avatar_image_id').attr('src', e.target.result);
            $('#input_avatar_hidden_' + user_entity_name).attr('value',e.target.result);    
        
            
        };

        reader.readAsDataURL(input.files[0]);
    }
}


$('[data-toggle=confirmation]').confirmation({
    rootSelector: '[data-toggle=confirmation]',
    // other options
});



