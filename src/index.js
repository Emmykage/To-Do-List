/* eslint-disable */
import '@fortawesome/fontawesome-free/js/all.js';
import './style.css';
import storageAvailable from '../module/storageAvailable.js';
import { listarr, getListTask, saveStorage, addListTask, removeStorage} from '../module/storagefunction.js';
// import { cont, displayitems} from '../module/displayitems.js';


export const cont = document.querySelector(".small-container");
const clrBtn = document.querySelector(".clear");

const form = document.querySelector("form");




function displayitems(chores){
    const div = document.createElement("div");
div.innerHTML = `
<div class ="checkclass">
<button class= "checkbox" id="check${chores.index}"></button>
<input type="text" id="${chores.index}" class="class-input inputBox${chores.index}" value="${chores.description}" readonly>
</div>
<div>
<button class="del-btn del-btn-${chores.index} del-display" id="trash-${chores.index}"><i  class="delIcon fa-solid fa-trash-can"></i></button>
<span class="edit-btn editbtn${chores.index} "><i id="edit-id" class=" trashIcon fa-solid fa-ellipsis-vertical"></i></span>
 </div>


`;
div.classList.add("listItems");
cont.appendChild(div); 
// -------------------------table buttons-------------------------
 const editBtn = document.querySelector(`.editbtn${chores.index}`);
 const divInput = document.querySelector(`.inputBox${chores.index}`)
 const trashCan = document.querySelector(`.del-btn-${chores.index}`);




const checkbox = document.querySelector(`#check${chores.index}`);
if(checkbox.textContent === '\u2714'){
    checkbox.nextElementSibling.classList.add('crossinput');
}
checkbox.addEventListener('click', function(e){
//    const btnindex = e.target.id.slice(5);
   editBtn.classList.toggle('edit-display');
   trashCan.classList.toggle('del-display');

   if(e.target.textContent === '\u2714'){
       
       e.target.textContent= ' ';
       divInput.classList.remove('crossinput');
       chores.completed = false;
       const localData = JSON.parse(localStorage.getItem('listItem'));
       localData[chores.index -1].completed = false;
       localStorage.setItem('listItem', JSON.stringify(localData));
     
       console.log(chores.completed)
       
   }else{
    e.target.textContent= '\u2714';
    divInput.classList.add('crossinput');
    chores.completed = true;
    const localData = JSON.parse(localStorage.getItem('listItem'));
    localData[chores.index - 1].completed = true;
    localStorage.setItem('listItem', JSON.stringify(localData))

    console.log(chores.completed)
   }
})
editBtn.addEventListener('click',()=>{
    if(divInput.hasAttribute('readonly', true)){
        divInput.parentElement.parentElement.classList.add('activebg');
        divInput.removeAttribute('readonly');
        divInput.addEventListener('keypress', (e)=>{

                 if(e.key === 'Enter'){
                    console.log("attribute removed")
                    divInput.removeAttribute('readonly');
                    divInput.parentElement.parentElement.classList.remove('activebg');

                    const localData = JSON.parse(localStorage.getItem('listItem'));
                    console.log(divInput.value, chores.index)
                    localData[chores.index - 1].description = divInput.value;
                    localStorage.setItem('listItem', JSON.stringify(localData))
                    divInput.removeAttribute('readonly');
                
                            
            }
        })
        console.log("yea")
    }
    else{
        divInput.setAttribute('readonly', true)
        console.log("attribute removed");

    }
   
        
} )

// -------------------------clear btn-----------------

clrBtn.addEventListener('click', ()=>{

    console.log("clear botton clicked")
    if(checkbox.textContent === '\u2714'){
        checkbox.parentNode.parentNode.remove();

    }
    const localData = JSON.parse(localStorage.getItem('listItem'));
    const deletedLocalData = localData.filter((item) => {
        if (item.completed) {
          return null;
        }
        return item;
      });
      localStorage.setItem('listItem', JSON.stringify(deletedLocalData))

    
})

// ----------------------end clear btn ----------------

}
// remove item function
function removelist(target){
    
if(target.classList.contains("del-btn")){
   


    console.log('second hey')

    target.parentNode.parentNode.remove();
    

}

}
// add item function/
if(storageAvailable('localStorage')){
    window.addEventListener('load', () =>{
        getListTask();
        listarr.forEach((task) =>displayitems(task))

    })
    form.addEventListener("submit", function(e){
        e.preventDefault();

       const inputkey = document.getElementById("todo");
         const input = inputkey.value;
        const anotherTask = addListTask(input);
        displayitems(anotherTask)
        saveStorage();

        inputkey.value = " ";
        
        
    })
    
}


cont.addEventListener("click", function(e){
    removelist(e.target);
    removeStorage(e);
})
