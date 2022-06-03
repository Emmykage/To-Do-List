/* eslint-disable */
import '@fortawesome/fontawesome-free/js/all.js';
import './style.css';
import storageAvailable from '../module/storageAvailable';




const form = document.querySelector("form");
const cont = document.querySelector(".small-container");
// const inputbtn =document.querySelector('.listItems');


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
function removeStorage(){
    getListTask();
    const listId = +e.target.id.slice(5);
    const filteredList = listarr.filter((task)=>task.index !==listId);
    for (let i = 0; i < filteredList.length; i +=1){
        filteredList[i].index = i +1
    }
    saveTask(filteredList)
}
// ----------------------end storage-----------------------


function displayitems(chores){
    const div = document.createElement("div");
div.innerHTML = `
<div class ="checkclass">
<input class= "checklist" type="checkbox" id="inputId${chores.index}">
<input type="text" class="class-input" value="${chores.description}" readonly>
</div>
<div>
<button class="edit">edit</button><button class="del-btn"> del</button> <button id="btn-id-${chores.index} class="fa-solid fa-ellipsis-vertical">del</button> </div>


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

