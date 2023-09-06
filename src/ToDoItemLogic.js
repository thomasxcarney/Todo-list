const ToDoItemArr = [];

const ToDoItem = (title, description, dueDate, priority) => {
    return { title, description, dueDate, priority }
};

function PushItemToArr(item){
    ToDoItemArr.push(item)
};

const item1 = ToDoItem('title', 'description', '9/11', 'high priority');
PushItemToArr(item1);


export { ToDoItemArr }