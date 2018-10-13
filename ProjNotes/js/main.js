/*********** Vars ****************/

var counter_elem_id = 0; // this var is for adding to the ids elements diffrent string every time MakeUniqueDataId function used.
var tasks =  [];

/*********** End Vars ****************/

    
/********* Init *************/

InitLoad();

document.getElementById("save_button").addEventListener("click", function(e){
    var is_user_wrote_description = IsUserWroteDescription();
    var is_user_wrote_date = IsUserWroteDate();
    var is_valide_date = IsValidDate()
    if(is_user_wrote_description&&is_user_wrote_date&&is_valide_date){ // if valdiation succeed get in and save the note.
        ClearErrorMessage();
        SaveTask();
    }else{
        ErrorDisplayText(is_user_wrote_description,is_user_wrote_date,is_valide_date); // if valdiation not succeed show proper message.
    }
    });

function InitLoad(afterDelete){ // the after delete bool true is to make the other notes to be shown and not dissapear.
    ClearDomTasks();  // clear the task because i want to genrate them every time from storage. 
    tasks = GetTasksFromLocalStorage();
    if(tasks==undefined) tasks=[];
    WriteNoteFromStorageToDom(afterDelete);
    
} 
   
function WriteNoteFromStorageToDom(afterDelete){
    for (var k = 0; k < tasks.length; k++){
        var data_delete_id = k;  // this is the id of data-deletid so when there is an event of delete note all the other notes data-deletid updated.
        var eids = MakeUniqueDataId();
        CreateNote(data_delete_id,eids.uid,eids.lid,afterDelete);
        document.getElementById(eids.uid).innerHTML = tasks[k].description;             
        document.getElementById(eids.lid).innerHTML = tasks[k].time;                
    }
}
  
/********* Init *************/


/********** Local Storage Operations *********/

function GetTasksFromLocalStorage(){
    var tasks = localStorage.getItem('tasks');
    tasks = JSON.parse(tasks);
    return tasks;
} 

function TaskSaveLocalStorage(){
    var tasks_json = JSON.stringify(tasks);
    localStorage.setItem('tasks',tasks_json);
}

/********** Local Storage Operations *********/


/********* Print Errors Operation *************/

function ErrorDisplayText(is_user_wrote_description,is_user_wrote_date,is_valide_date){
    var str = 'please try again.';
    var e_text = document.getElementById('error_message');
    if(is_user_wrote_description==false && is_user_wrote_date && is_valide_date==false){
    e_text.innerHTML = 'Description field is missing, '+ str;  
    }
    if(is_user_wrote_description && is_user_wrote_date==false && is_valide_date==false){  
    e_text.innerHTML = 'Date field is missing, '+ str;
    }
    if(is_user_wrote_description && is_user_wrote_date && is_valide_date==false){
    e_text.innerHTML = 'Invalid date pattern, '+ str;   
    }
    if((is_user_wrote_description==false && is_user_wrote_date==false && is_valide_date) || (is_user_wrote_description==false && is_user_wrote_date==false && is_valide_date==false)){
    e_text.innerHTML = 'Description field and Date field missing, ' + str;   
    }
}

function ClearErrorMessage(){
    document.getElementById('error_message').innerText = '';
}

/********* Print Errors Operation *************/



/********* Task Operations *************/

function ClearDomTasks(){
    var my_container_notes = document.querySelector('ul');  
    if(my_container_notes){
        while (my_container_notes.firstChild) {
            my_container_notes.removeChild(my_container_notes.firstChild);
        }
    }
}

function AddToTasks(eids){
    var task = {
        description:document.getElementById(eids.uid).innerText,
        time:document.getElementById(eids.lid).innerText
    };
    tasks.push(task); // add the task obj to our array tasks at the end.
}

function CleanInputTask(){
    document.getElementById('input_textarea').value = '';
    document.getElementById('input_date').value = '';
}


function SetElementText(elTextId,elId){
    document.getElementById(elId).innerHTML = document.getElementById(elTextId).value;
} 


function SaveTask(){
    var eids = MakeUniqueDataId(); // make unique id to upper and lower paragraphs that will show on the note.
    CreateNote(tasks.length,eids.uid,eids.lid);
    SetElementText('input_textarea',eids.uid);
    SetElementText('input_date',eids.lid);
    AddToTasks(eids);
    TaskSaveLocalStorage();
    CleanInputTask();
}

function MakeUniqueDataId(){
    var elementsid = ['upp_p_id','low_p_id'];
    for (var j = 0; j < 2; j++){      
    var idname = elementsid[j] + counter_elem_id;
    elementsid[j] = idname;
    }
    counter_elem_id++; // change the counter for every note.
    return {uid:elementsid[0],lid:elementsid[1]}; // hold the two stings in obj.
}

function DeleteTask(delete_button,my_note){
    my_note.style.opacity="0"; // the delete note opactity will changed from 1 to 0 and will dissapear.
    setTimeout(function(){
    var my_container_notes = document.querySelector('ul');  
    my_container_notes.removeChild(my_note); 
    var index = delete_button.getAttribute("data-deletid");
    tasks.splice(index,1);
    TaskSaveLocalStorage();
    InitLoad(true); 
    },1000);
}

/********** Task Operations *************/


/********* Validations Operation *************/

function IsUserWroteDescription(){
    var input_textarea = document.getElementById('input_textarea').value;
    return (!input_textarea == undefined || !input_textarea == "" || !input_textarea.length==0);
    
}

function IsUserWroteDate(){
    var input_date = document.getElementById('input_date').value;
    return (!input_date == undefined || !input_date == "" || !input_date.length==0);
    
}

function IsValidDate(){
    var input_date_string = document.getElementById('input_date').value;
    var regular_date_pattern =  /^(0[1-9]|[12][0-9]|3[01])[//](0[1-9]|1[012])[//](19|20)\d\d$/;
    var res = regular_date_pattern.test(input_date_string);
    return res;
}

/********* Validations Operation *************/


/****** Create Note In Dom ******/

function CreateNoteImage(){
    var note_image = document.createElement('img');
    note_image.setAttribute('src','my_images/notebg.png');
    note_image.setAttribute('alt','Note with a task');
    return note_image;
}

function CreateUpperP(upp_p_id){
    var upper_p = document.createElement('p');
    upper_p.setAttribute('id',upp_p_id); 
    return upper_p;
}

function CreateLowerP(low_p_id){
    var lower_p = document.createElement('p');
    lower_p.setAttribute('id',low_p_id);
    lower_p.setAttribute('class','low-par');
    return lower_p;
}

function CreateDivContainUpperP(){
    var div_c_upp_p = document.createElement('div');
    return div_c_upp_p;
} 

function CreateDeleteIcon(){
    var delete_icon = document.createElement('span');
    delete_icon.setAttribute('class','glyphicon glyphicon-trash'); // in order to use bootstrap icon.
    delete_icon.innerHTML = ' Delete';
    return delete_icon;
}

function CreateDeleteButton(data_delete_id,my_note){
    var delete_button = document.createElement('button');
    delete_button.setAttribute('type','button');
    delete_button.setAttribute('data-deletid',data_delete_id); // data delete id at creation is id that passed by the length of array, in every delete it will be updated again.
    delete_button.addEventListener("click",function(e){ DeleteTask(this,my_note); }); 
    return delete_button;
}

function CreateDivContainLowerP(){
    var div_c_low_p = document.createElement('div');
    return div_c_low_p;
}

function CreateLi(){
    var my_note = document.createElement('li');
    my_note.setAttribute('class','li-after-delete');
    return my_note;
}

function CreateNote(data_delete_id,upp_p_id,low_p_id,afterDelete){
    var note_image = CreateNoteImage();
    var upper_p = CreateUpperP(upp_p_id);
    var lower_p = CreateLowerP(low_p_id);
    var div_c_upp_p = CreateDivContainUpperP();
    var delete_icon = CreateDeleteIcon();  
    var my_note = CreateLi();
    var delete_button = CreateDeleteButton(data_delete_id,my_note);
    var div_c_low_p = CreateDivContainLowerP();
    AppendAllTheChildsToUnorderList(upper_p,lower_p,div_c_upp_p,div_c_low_p,delete_icon,my_note,delete_button,note_image);
    if(!afterDelete){
        my_note.setAttribute('class','li-reg');
        setTimeout(function(e){ my_note.style.opacity="1"; }, 100);
    }
}

/****** Create Note In Dom ******/



/****** Attach All Childs Created To Unorder List ******/

function AppendAllTheChildsToUnorderList(upper_p,lower_p,div_c_upp_p,div_c_low_p,delete_icon,my_note,delete_button,note_image){
    ParagraphsAttachToDivs(upper_p,lower_p,div_c_upp_p,div_c_low_p);
    DeleteIconAttachToDeleteButton(delete_icon,delete_button);
    ChildsOfNoteAttachToHim(delete_button,note_image,div_c_upp_p,div_c_low_p,my_note);
    NoteAttachToUnorderList(my_note);
}

function ParagraphsAttachToDivs(upper_p,lower_p,div_c_upp_p,div_c_low_p,delete_icon){
    div_c_upp_p.appendChild(upper_p);
    div_c_low_p.appendChild(lower_p);
}

function DeleteIconAttachToDeleteButton(delete_icon,delete_button){
    delete_button.appendChild(delete_icon);
}


function ChildsOfNoteAttachToHim(delete_button,note_image,div_c_upp_p,div_c_low_p,my_note){
    my_note.appendChild(delete_button);
    my_note.appendChild(note_image);
    my_note.appendChild(div_c_upp_p);
    my_note.appendChild(div_c_low_p);
}

function NoteAttachToUnorderList(my_note){
    var my_container_notes = document.querySelector('ul');
    my_container_notes.appendChild(my_note);
    
}
/****** Attach All Childs Created To Unorder List ******/

  
















