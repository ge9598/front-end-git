const input = document.getElementById("input");
const form = document.getElementById("form");
const todos = document.getElementById('todos')

const td = JSON.parse(localStorage.getItem('todos'));
if(td){
    td.forEach(t =>{
        addTodo(t);
    });
}
form.addEventListener('submit', (e) =>{
    e.preventDefault();
    addTodo();
    
})

function addTodo(t){
    let todoText = input.value;
    if(t){
        todoText = t.text;
    }
    
    if(todoText){
        const todoEl = document.createElement('li');
        if(t && t.completed){
            todoEl.classList.add('completed');
        }
        todoEl.innerHTML = todoText;
        todos.appendChild(todoEl);
        todoEl.addEventListener('click', () =>{
            todoEl.classList.toggle('completed');
            updateLS();
        })
        todoEl.addEventListener('contextmenu', (e) =>{
            e.preventDefault();
            todoEl.remove();
            updateLS();
        });

        input.value = "";

        updateLS();
    }
}

function updateLS(){
    const todoEl = document.querySelectorAll('li');
    const todos = [];
    todoEl.forEach(todoEl =>{
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains('completed'),
        });
    });

    localStorage.setItem("todos", JSON.stringify(todos));
}

function retrieveLS(){

}