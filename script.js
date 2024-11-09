// Selecting elements
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
let todos = [];

// Load tasks from local storage on page load
window.addEventListener('load', () => {
    loadTodos();
    renderTodos();
});

// Event listener for adding tasks
todoForm.addEventListener('submit', function(e) {
    e.preventDefault();
    addTodo(todoInput.value);
    todoInput.value = '';
});

// Function to add a new task
function addTodo(task) {
    const todo = {
        id: Date.now(),
        task: task,
        completed: false
    };
    todos.push(todo);
    saveTodos(); // Save tasks to local storage
    renderTodos();
}

// Function to render tasks
function renderTodos() {
    todoList.innerHTML = ''; // Clear the current list in the UI

    todos.forEach(todo => {
        const li = document.createElement('li');
        li.classList.toggle('completed', todo.completed);
        
        li.innerHTML = `
            <span onclick="toggleComplete(${todo.id})">${todo.task}</span>
            <button class="delete-btn" onclick="deleteTodo(${todo.id})">Delete</button>
        `;
        
        todoList.appendChild(li);
    });
}

// Function to mark a task as completed or pending
function toggleComplete(id) {
    todos = todos.map(todo => {
        if (todo.id === id) {
            return { ...todo, completed: !todo.completed };
        }
        return todo;
    });
    saveTodos(); // Save updated tasks to local storage
    renderTodos();
}

// Function to render tasks based on filter
function renderTodos(filter = 'all') {
    todoList.innerHTML = ''; // Clear the current list in the UI
    let filteredTodos = todos;
    
    if (filter === 'completed') {
        filteredTodos = todos.filter(todo => todo.completed);
    } else if (filter === 'pending') {
        filteredTodos = todos.filter(todo => !todo.completed);
    }

    filteredTodos.forEach(todo => {
        const li = document.createElement('li');
        li.classList.toggle('completed', todo.completed);
        
        li.innerHTML = `
            <span onclick="toggleComplete(${todo.id})">${todo.task}</span>
            <button class="delete-btn" onclick="deleteTodo(${todo.id})">Delete</button>
        `;
        
        todoList.appendChild(li);
    });
}

// Function to mark a task as completed or pending
function toggleComplete(id) {
    todos = todos.map(todo => {
        if (todo.id === id) {
            return { ...todo, completed: !todo.completed };
        }
        return todo;
    });
    saveTodos(); // Save updated tasks to local storage
    renderTodos();
}



// Function to delete a task
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos(); // Save updated tasks to local storage
    renderTodos();
}

// Function to save tasks to local storage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Function to load tasks from local storage
function loadTodos() {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
        todos = JSON.parse(storedTodos);
    }
}