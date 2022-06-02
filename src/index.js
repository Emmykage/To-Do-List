/* eslint-disable */
import '@fortawesome/fontawesome-free/js/all.js';
import './style.css';

const cont = document.querySelector('.small-container');

// addStoreList(mychore);

const todoList = [{
  index: '1',
  description: 'wash the car',
  completed: false,

}, {
  index: '2',
  description: 'take out the trash',
  completed: false,

},
{
  index: '3',
  description: 'get some javascript done',
  completed: true,

},
{
  index: '4',
  description: 'do the dishes',
  completed: false,

}];

for (let i = 0; i < todoList.length; i += 1) {
  const div = document.createElement('div');

  div.innerHTML = `
            <div class ="checkclass">
            <input class= "checklist" type="checkbox" id="${todoList[i].index}">
            <label for="${todoList[i].index}">${todoList[i].description}</label>
            </div>
           
           <i class="del-btn fa-solid fa-ellipsis-vertical">...</i> 
            `;

  div.classList.add('listItems');
  cont.appendChild(div);
}
