const ToDoItemArr = [];

const ToDoItem = (title, description, dueDate, priority) => {
    return { title, description, dueDate, priority }
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

const item1 = ToDoItem('title', 'description', '9/11', 'high priority');
PushItemToArr(item1);

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

submitNewTaskBtn.addEventListener('click', event => {
    event.preventDefault();
    newTaskDialog.close()
    let priority = document.querySelector('input[name="priority"]:checked').value;
    let title = document.querySelector('input[name="titleInput"]').value;
    let description = document.querySelector('input[name="desInput"]').value;
    let dueDate = document.querySelector('input[name="dueInput"]').value;
    let newTask = ToDoItem(title, description, dueDate, priority);
    clearInputs();
    newTaskDialog.close();
    PushItemToArr(newTask);
    sortItemsByDueDate();
});

const closeNewTaskDialogBtn = document.getElementById('closeNewTaskDialogBtn');

closeNewTaskDialogBtn.addEventListener('click', event => {
    event.preventDefault();
    clearInputs();
    newTaskDialog.close();
});


export { ToDoItemArr, submitNewTaskBtn, sortItemsByDueDate }