import './style.css';
import { ToDoItemArr, sortItemsByDueDate, submitNewTaskBtn, editBtn, addEditSubmitBtnListener } from './ToDoItemLogic';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

const contentContainer = document.getElementById('content');

function PopulateList() {
    for(let i = 0; i < ToDoItemArr.length; i++){
        contentContainer.appendChild(CreateToDoItemCard(ToDoItemArr[i]));
    }
};

function CreateToDoItemCard(item){
    let container = document.createElement('div');
    container.classList.add('to-do-item');
    let checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.classList.add('item-checkbox');
    let title = document.createElement('h4');
    title.innerHTML = item.title;
    let dueDate = document.createElement('p');
    dueDate.innerHTML = format(parseISO(item.dueDate), 'Pp');
    let priority = document.createElement('p');
    priority.innerHTML = item.priority;
    let detailsBtn = document.createElement('button');
    detailsBtn.innerHTML = 'Details';
    detailsBtn.classList.add('expand');
    let expandedContainer = document.createElement('div');
    let description = document.createElement('p');
    description.innerHTML = item.description;
    let category = document.createElement('p');
    category.innerHTML = item.category;
    let deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = 'Remove item';
    let editBtn = document.createElement('button');
    editBtn.innerHTML = 'Edit';
    expandedContainer.append(description, category, deleteBtn, editBtn);
    expandedContainer.classList.add('hidden');
    container.append(checkbox, title, detailsBtn, dueDate, priority, expandedContainer);
    addExpandEventListener(detailsBtn, expandedContainer);
    addDeleteEventListener(deleteBtn, item);
    editBtnEventListener(editBtn, item);
    addEditSubmitBtnListener(item);
    addCheckBoxEventListener(container, checkbox);
    return container;
};

function addExpandEventListener(btn, container) {
    btn.addEventListener('click', () => {
        if(container.classList.contains('hidden')){
            container.classList.remove('hidden');
        } else container.classList.add('hidden');
    })
};

function removeItem(item) {
    let index = ToDoItemArr.indexOf(item);
    ToDoItemArr.splice(index, 1);
    clearItems();
    PopulateList();
};

function addDeleteEventListener(btn, item){
    btn.addEventListener('click', () => {
        removeItem(item)
    })
};

function clearItems() {
    contentContainer.innerHTML = ''
};

submitNewTaskBtn.addEventListener('click', () => {
    clearItems();
    PopulateList();
});

const editDialog = document.getElementById('editDialog');

function fillEditDialog(item){
    const titleInput = document.getElementById('editTitleInput');
    const descriptionInput = document.getElementById('editDesInput');
    const dueInput = document.getElementById('editDueInput');
    const lowPrioritySelect = document.getElementById('editLow');
    const normalPrioritySelect = document.getElementById('editNormal');
    const highPrioritySelect = document.getElementById('editHigh');
    titleInput.value = item.title;
    descriptionInput.value = item.description;
    dueInput.value = item.dueDate;
    const itemPriority = (item.priority).toLowerCase();
    if(itemPriority == highPrioritySelect.value){
        highPrioritySelect.checked = true;
    } else if(itemPriority == normalPrioritySelect.value){
        normalPrioritySelect.checked = true;
    } else if(itemPriority == lowPrioritySelect.value){
        lowPrioritySelect.checked = true;
    };
}

function editBtnEventListener(btn, item){
    btn.addEventListener('click', () => {
        fillEditDialog(item);
        editDialog.showModal();
    })
}

const categories = document.getElementsByClassName('category');
const homeBtn = document.getElementById('homeBtn');

homeBtn.addEventListener('click', event => {
    clearItems();
    PopulateList();
})

function addCategoryEventListeners(){
    for(let i = 0; i < categories.length; i++){
        categories[i].addEventListener('click', event => {
            let category = categories[i].classList[0];
            clearItems();
            populateCategoryView(category);
        })
    }
};

function populateCategoryView(category){
    for(let i = 0; i < ToDoItemArr.length; i++){
        if(ToDoItemArr[i].category.toLowerCase() == category){
            contentContainer.appendChild(CreateToDoItemCard(ToDoItemArr[i]));
        };
    };
};

const editDialogCategories = document.getElementById('editCategory');
const newDialogCategories = document.getElementById('category');
const sidebar = document.getElementById('sidebar');

function newCategoryHTML(newCategory){
    editDialogCategories.innerHTML += newCategory;
    newDialogCategories.innerHTML += newCategory;
    let newSidebarElement = document.createElement('h4');
    newSidebarElement.innerHTML = newCategory;
    newSidebarElement.classList.add(newCategory);
    newSidebarElement.classList.add('category');
    sidebar.appendChild(newSidebarElement);
};

let categoryArray = ToDoItemArr.map(a => a.category);

function createNewCategory(newCategory){
    if(!categoryArray.includes(newCategory.toLowerCase())){
        newCategoryHTML(newCategory);
        addCategoryEventListeners();
    };
};

function addCheckBoxEventListener(container, checkbox) {
    checkbox.addEventListener('change', () => {
        if(checkbox.checked){
            container.classList.add('completed')
        } else container.classList.remove('completed')
    })
};

addCategoryEventListeners();
PopulateList();

export { clearItems, PopulateList, createNewCategory }