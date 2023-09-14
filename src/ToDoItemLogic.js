import { clearItems, createNewCategory, PopulateList } from ".";
import format from 'date-fns/format';

let ToDoItemArr = [];

const ToDoItem = (title, description, dueDate, priority, category) => {
    return { title, description, dueDate, priority, category }
};

function PushItemToArr(item){
    ToDoItemArr.push(item)
};

function sortItemsByDueDate() {
    ToDoItemArr.sort((a,b) => {
    if (a.dueDate > b.dueDate) return 1
    if (a.dueDate < b.dueDate) return -1
    return 0
    })
};

const item1 = ToDoItem('Go to work', 'I have to go to work :(', '2023-09-07T17:12', 'high priority', 'work');
const item2 = ToDoItem('Go to class', 'Be on time to class', '2023-09-11T08:00', 'normal priority', 'school');
PushItemToArr(item1);
PushItemToArr(item2);

const NewTaskBtn = document.getElementById('NewTaskBtn');
const newTaskDialog = document.getElementById('newTaskDialog');

NewTaskBtn.addEventListener('click', () => {
    newTaskDialog.showModal(); 
});

const allInputs = document.querySelectorAll('input');

function clearInputs() {
    allInputs.forEach(singleInput => singleInput.value = '');
    document.getElementById('normal').checked = true;
};

const submitNewTaskBtn = document.getElementById('submitNewTask');
const submitEditTaskBtn = document.getElementById('submitEditBtn');

submitNewTaskBtn.addEventListener('click', event => {
    event.preventDefault();
    newTaskDialog.close()
    let priority = document.querySelector('input[name="priority"]:checked').value;
    let title = document.querySelector('input[name="titleInput"]').value;
    let description = document.querySelector('input[name="desInput"]').value;
    let dueDate = document.querySelector('input[name="dueInput"]').value;
    let category = document.querySelector('input[name="category"]').value;
    let newTask = ToDoItem(title, description, dueDate, priority, category);
    createNewCategory(category)
    clearInputs();
    newTaskDialog.close();
    PushItemToArr(newTask);
    sortItemsByDueDate();
});

function addEditSubmitBtnListener(item){
    submitEditTaskBtn.addEventListener('click', event => {
        event.preventDefault();
        let inputs = getEditInputs();
        editItem(item, inputs);
        editDialog.close();
        clearItems();
        PopulateList();
    }, {once : true})
};

function getEditInputs() {
    let title = document.getElementById('editTitleInput').value;
    let description = document.getElementById('editDesInput').value;
    let dueDate = document.getElementById('editDueInput').value;
    let category = document.getElementById('editCategoryInput').value;
    let priority;
    if(document.getElementById('editHigh').checked == true){
        priority = 'High priority';
    }else if(document.getElementById('editNormal').checked == true) {
        priority = 'Normal priority';
    }else if(document.getElementById('editLow').checked == true) {
        priority = 'Low priority';
    };
   return [title, description, dueDate, priority, category];
}

function editItem(item, inputs){
    item.title = inputs[0];
    item.description = inputs[1];
    item.dueDate = inputs[2];
    item.priority = inputs[3];
    item.category = inputs[4];
};

const closeNewTaskDialogBtn = document.getElementById('closeNewTaskDialogBtn');
const closeEditDialogBtn = document.getElementById('closeEditDialogBtn');
const editDialog = document.getElementById('editDialog');

function addDialogCloseBtnListeners(btn, dialog){
    btn.addEventListener('click', event => {
        event.preventDefault();
        clearInputs();
        dialog.close();
    });
}

addDialogCloseBtnListeners(closeNewTaskDialogBtn, newTaskDialog);
addDialogCloseBtnListeners(closeEditDialogBtn, editDialog);

export { ToDoItemArr, submitNewTaskBtn, sortItemsByDueDate, addEditSubmitBtnListener }