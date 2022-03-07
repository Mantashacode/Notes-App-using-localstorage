'use Strict';


const btnAdd=document.querySelector('.add');
const noteTitle=document.getElementById('noteTitle');
const noteTxt=document.getElementById('newNote');
const searchNote=document.getElementById('search');


showNote();

//add function
btnAdd.addEventListener('click',function (){
    if(noteTitle.value == "" || noteTxt.value == "")
   {
    return  alert("Please add note title and details");
   }
   else if(noteTitle.value.charAt(0) == " " || noteTxt.value.charAt(0) == " ")
   {
    return  alert("Please add a valid note,avoid starting with space");
   }
   else{
      let notes =localStorage.getItem("notes");
       if(notes == null){
       notesObj=[];
       }
      else{
       notesObj =JSON.parse(notes);
       }
     let myObj={
       title: noteTitle.value,
       text:noteTxt.value
      }
      notesObj.push(myObj);
      localStorage.setItem("notes", JSON.stringify(notesObj));
      document.querySelector('.addPop').classList.remove('hidden');
     setTimeout(() => {
        document.querySelector('.addPop').classList.add('hidden');
      }, 2000);
     
     noteTitle.value="";
     noteTxt.value="";
     showNote();
    }
});

//show notes
function showNote(){
    let notes =localStorage.getItem("notes");
    if(notes == null){
       notesObj=[];
     }
    else{
     notesObj =JSON.parse(notes);
    }
    console.log(notesObj);
    let html= "";
    notesObj.forEach(function(element, index){
        html +=`  <div class="content2 container">
        <p id="note-counter">Note ${index + 1}</p>
        <h3 id="note-name">${element.title}</h3>
        <p id="note-text">${element.text}</p>
        <button id="${index}" onclick="deleteNote(this.id);{window.scrollTo(0,0)}" class="delete" >Delete Note</button>
        <button id="${index}" onclick="editNote(this.id); {window.scrollTo(0,0)}"  class="edit">Edit Note</button>
    </div> `
    });
    let noteElm = document.querySelector('.Add-Box');
    console.log(noteElm);
    if(notesObj.length !=0){
        noteElm.innerHTML= html;
    }
    else{
    document.querySelector('.note-empty').classList.remove('hidden');
    document.querySelector('.Add-Box').classList.add('hidden');
    }
}

//delete notes
function deleteNote(index)
{  let notes= localStorage.getItem("notes");
    notesObj =JSON.parse(notes);
    notesObj.splice(index,1);//to delete an item in array from starting index to number of item you want to delete
    localStorage.setItem("notes",JSON.stringify(notesObj));
    document.querySelector('.deletePop').classList.remove('hidden');
    setTimeout(() => {
       document.querySelector('.deletePop').classList.add('hidden');
     }, 2000);

    showNote();
}

//edit notes
function editNote(index)
{   let notes= localStorage.getItem("notes");
    notesObj =JSON.parse(notes);
    if(noteTitle.value !="" || noteTxt.value !="")
    {
        return alert("Please clear the form before Editing")
    }
    else 
    {
        notesObj.findIndex((element,index) => {
        noteTitle.value=element.title;
        noteTxt.value=element.text;
        })
        notesObj.splice(index,1);
       localStorage.setItem("notes",JSON.stringify(notesObj));
       showNote();
    }
}
// function top(){
//    window.scrollTo(0,0);
// }

searchNote.addEventListener('input',(e) =>{
 if(searchNote.value != " ")
 {
    let searchvalue=searchNote.value.toLowerCase();
    // console.log(searchvalue);
   let visibleNote= document.getElementsByClassName('content2 container');
   Array.from(visibleNote).forEach(function(element){
      let cardtitle = element.getElementsByTagName('h3')[0].innerText.toLowerCase();
       let cardtxt = element.getElementsByTagName('p')[1].innerText.toLowerCase();
       if(!(cardtitle.includes(searchvalue) || cardtxt.includes(searchvalue)))
       {
           element.classList.add('hidden');
          
       }
       
    //    console.log(cardtxt);
    //    console.log(cardtitle);
})
 }
});
searchNote.addEventListener('input',(e) =>{
    if(searchNote.value == "")
    { showNote();
    }
});




