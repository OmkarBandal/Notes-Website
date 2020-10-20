console.log("Welcome to notes app. This is app.js");
showNotes();
// If user adds a note, add it to the localStorage


let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function(e) {
    var addTxt = document.getElementById("addTxt");
  var addTitle = document.getElementById("addTitle");
  
  var notes = localStorage.getItem("notes");
    
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let myObj = {
    title: addTitle.value,
    text: addTxt.value
  }
   
  if (addTitle.value.length === 0){
    var titleError=document.getElementById('titleError');
    titleError.innerHTML="Title Must Be Filled..... ";

  }
  else if(addTitle.value.length  < 4 ){
    var titleError=document.getElementById('titleError');
    titleError.innerHTML="Title Must Be More Than 4 Characters Long.....";
  }


  else if(addTxt.value.length  === 0 ){
    var titleError=document.getElementById('titleError');
      titleError.innerHTML="";

    var noteError=document.getElementById('noteError');
    noteError.innerHTML="Note Must Be Filled..........";
  }

  else if(addTxt.value.length  < 20 ){
    
      
    var noteError=document.getElementById('noteError');
    noteError.innerHTML="Note Must Be More Than 20 Characters Long.....";
  }
  
  
  

    else{
      notesObj.unshift(myObj);
      localStorage.setItem("notes", JSON.stringify(notesObj));
      addTxt.value = "";
      addTitle.value = "";
      var noteError=document.getElementById('noteError');
      noteError.innerHTML="";

  
     popUp()
      
}

//   console.log(notesObj);
  showNotes();
});

// Function to show elements from localStorage
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function(element, index) {
    html += `
            <div class="noteCard my-2 mx-2 card" style="width: 100%;">
                    <div class="card-body">
                        <h5 class="card-title text-center">${element.title}</h5>
                        <hr>
                        <p class="card-text"> ${element.text}</p>
                        <hr>
                        <div class="d-flex justify-content-center align-item-center"> 
                        <button id="${index}" onclick=" popDown();  deleteNote(this.id); " class="">Delete Note</button>
                        </div>
                    </div>
                </div>`;
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
  }
}

// Function to delete a note
function deleteNote(index) {
//   console.log("I am deleting", index);

  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}


let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){

    let inputVal = search.value.toLowerCase();
    // console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("h5")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    
    })
})

const popUp = ()=> {
    swal({
        title: "Done!",
        text: "Your Note Has Been Added!",
        icon: "success",
        button: "OK",
      });
}

const popDown=()=>{
    swal({
        title: "Done!",
        text: "Your Note Has Been Deleted!",
        icon: "success",
        button: "OK",
      });
    
}
