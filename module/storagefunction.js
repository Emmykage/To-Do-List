/* eslint-disable */

import ListToDo from './ListToDo.js';

export let listarr = [];

export function getListTask() {
  listarr = JSON.parse(localStorage.getItem('listItem')) || [];
  return listarr;
}
export function saveStorage(data = listarr) {
  localStorage.setItem('listItem', JSON.stringify(data));
}
export function addListTask(description) {
  const listId = listarr.length + 1;
  const newTask = new ListToDo(description, listId);
  listarr.push(newTask);
  console.log(description);
  return newTask;
}
export function removeStorage(e) {
  getListTask();

  const listId = parseInt(e.target.id.slice(6));

  const filteredList = listarr.filter((task) => task.index !== listId);
  for (let i = 0; i < filteredList.length; i += 1) {
    filteredList[i].index = i + 1;
  }
  localStorage.setItem('listItem', JSON.stringify(filteredList));

}
