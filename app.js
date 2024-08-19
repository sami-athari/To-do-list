document.addEventListener('DOMContentLoaded', () => {
  const todoInput = document.querySelector('.todo-input');
  const todoButton = document.querySelector('.todo-button');
  const todoList = document.querySelector('.todo-list');
  const filterSelect = document.getElementById('filterSelect');

  // Load todos from localStorage
  loadTodos();

  todoButton.addEventListener('click', addTodo);
  todoList.addEventListener('click', deleteCheck);
  filterSelect.addEventListener('change', filterTasks);

  function addTodo(event) {
    event.preventDefault();

    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo-item');

    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-text');
    todoDiv.appendChild(newTodo);

    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);

    saveLocalTodos(todoInput.value);

    todoInput.value = '';
  }

  function deleteCheck(event) {
    const item = event.target;

    if (
      item.classList.contains('trash-btn') ||
      item.parentElement.classList.contains('trash-btn')
    ) {
      const todo = item.closest('.todo-item');
      removeLocalTodos(todo);
      todo.remove();
    }

    if (
      item.classList.contains('complete-btn') ||
      item.parentElement.classList.contains('complete-btn')
    ) {
      const todo = item.closest('.todo-item');
      todo.classList.toggle('completed');
      updateLocalTodos(todo);
    }
  }

  function filterTasks(event) {
    const filter = event.target.value;
    const todos = todoList.childNodes;
    todos.forEach((todo) => {
      switch (filter) {
        case 'all':
          todo.style.display = 'flex';
          break;
        case 'completed':
          if (todo.classList.contains('completed')) {
            todo.style.display = 'flex';
          } else {
            todo.style.display = 'none';
          }
          break;
        case 'uncompleted':
          if (!todo.classList.contains('completed')) {
            todo.style.display = 'flex';
          } else {
            todo.style.display = 'none';
          }
          break;
      }
    });
  }

  function saveLocalTodos(todo) {
    let todos = localStorage.getItem('todos')
      ? JSON.parse(localStorage.getItem('todos'))
      : [];
    todos.push({ text: todo, completed: false });
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  function removeLocalTodos(todo) {
    let todos = localStorage.getItem('todos')
      ? JSON.parse(localStorage.getItem('todos'))
      : [];
    const todoText = todo.children[0].innerText;
    todos = todos.filter((t) => t.text !== todoText);
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  function updateLocalTodos(todo) {
    let todos = localStorage.getItem('todos')
      ? JSON.parse(localStorage.getItem('todos'))
      : [];
    const todoText = todo.children[0].innerText;
    todos.forEach((t) => {
      if (t.text === todoText) {
        t.completed = todo.classList.contains('completed');
      }
    });
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  function loadTodos() {
    let todos = localStorage.getItem('todos')
      ? JSON.parse(localStorage.getItem('todos'))
      : [];
    todos.forEach((t) => {
      const todoDiv = document.createElement('div');
      todoDiv.classList.add('todo-item');
      if (t.completed) {
        todoDiv.classList.add('completed');
      }

      const newTodo = document.createElement('li');
      newTodo.innerText = t.text;
      newTodo.classList.add('todo-text');
      todoDiv.appendChild(newTodo);

      const completedButton = document.createElement('button');
      completedButton.innerHTML = '<i class="fas fa-check"></i>';
      completedButton.classList.add('complete-btn');
      todoDiv.appendChild(completedButton);

      const trashButton = document.createElement('button');
      trashButton.innerHTML = '<i class="fas fa-trash"></i>';
      trashButton.classList.add('trash-btn');
      todoDiv.appendChild(trashButton);

      todoList.appendChild(todoDiv);
    });
  }
});
