/* eslint-disable */
import '@fortawesome/fontawesome-free/js/all.js';
import './style.css';

// Check for availaible storage
const storageAvailable = (type) => {
    let storage;
    try {
      storage = window[type];
      const x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return (
        e instanceof DOMException
        // everything except Firefox
        && (e.code === 22
          // Firefox
          || e.code === 1014
          // test name field too, because code might not be present
          // everything except Firefox
          || e.name === 'QuotaExceededError'
          // Firefox
          || e.name === 'NS_ERROR_DOM_QUOTA_REACHED')
        // acknowledge QuotaExceededError only if there's something already stored
        && storage
        && storage.length !== 0
      );
    }
  };

const form = document.querySelector("form");
const cont = document.querySelector(".small-container");
// const inputbtn =document.querySelector('.listItems');
const inputfield = document.querySelector(".class-input");


class ListToDo{
    constructor(description=null, index = null,  completed = false){
        this.description = description;
        this.completed = completed;
        this.index = index;

    }
}
// replace with taskList
let listarr = [];

function getListTask(){
     listarr = JSON.parse(localStorage.getItem('listItem')) || [];
    return listarr;
}
function saveStorage(data = listarr){
    localStorage.setItem('listItem', JSON.stringify(data))
}
function addListTask(description){
    let listId = listarr.length + 1;
    let newTask = new ListToDo(description, listId );
    listarr.push(newTask);
    console.log(description)
    return newTask;
}
// function removeStorage(){
//     getListTask();
//     const listId = +e.target.id.slice(5);
//     const filteredList = taskList.filter((task)=>task.index !==listId);
//     for (let i = 0; i < filteredList.length; i +=1){
//         filteredList[i].index = i +1
//     }
//     saveTask(filteredList)
// }
// ----------------------end storage-----------------------


function displayitems(chores){
    const div = document.createElement("div");
div.innerHTML = `
<div class ="checkclass">
<input class= "checklist" type="checkbox" id="inputId${chores.index}">
<input type="text" class="class-input" value="${chores.description}" readonly>
</div>
<div>
<button class="edit">edit</button><button class="del-btn"> del</button> <button class="fa-solid fa-ellipsis-vertical">del</button> </div>


`;

div.classList.add("listItems");
cont.appendChild(div);
 
div.addEventListener('click', function(e){
if(e.target.classList.contains('edit')){
    console.log('it contains');
    // e.target.parentNode.parentNode.children[1].removeAttribute('readonly');
    let inputEdit = e.target.parentNode.parentNode.children[0].children[1];
    inputEdit.toggleAttribute('readonly') ;
    if (!inputEdit.hasAttribute('readonly')){
        e.target.innerHTML = "save";
    }
    else{
        e.target.innerHTML = "edit"

    }
}
})

}
// remove item function
function removelist(target){
if(target.classList.contains("del-btn")){
    target.parentNode.parentNode.remove();

}
// else if(target.classList.contains("edit"))
// {   
//     // inputfield.removeAttribute("readonly")
//             console.log(document.className);
//     }

}
// add item function/
if(storageAvailable('localStorage')){
    window.addEventListener('load', () =>{
        getListTask();
        listarr.forEach((task) =>displayitems(task))

    })
    form.addEventListener("submit", function(e){
        e.preventDefault();
        const input = document.getElementById("todo").value;
        const anotherTask = addListTask(input);
        displayitems(anotherTask)
        saveStorage();
    })
    
}


cont.addEventListener("click", function(e){
    removelist(e.target);
    // console.log("delete");
})

