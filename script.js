//setting us available
const form = document.querySelector('#todoForm');
const input = document.querySelector('#todoInput');
const output = document.querySelector('#output');
const errorMsgs = document.querySelector("#errorMsg")



// bring data (tasks) from Json ul with use fetch
let todos = []

const fetchTodos = async () => {
  let url = 'https://jsonplaceholder.typicode.com/todos';

  const res = await fetch(url);
  const _todos = await res.json();

  todos = _todos;
  

  listTodos(todos);
}
fetchTodos();

const listTodos = (todos) => {
  output.innerHTML = '';

  todos.forEach(todo => {

    output.innerHTML += newTodo(todo);
  })
}




const newTodo = todo => {

  let template = todo.completed ? `
  <div id="${todo.id}" class="todo completed ">
    <h5 class="title">${todo.title}</h5>
    <button class="btn btn-danger ">delete</button>
  </div>
  `
  : `
  <div id="${todo.id}" class="todo">
    <h5 class="title">${todo.title}</h5>
    <button class="btn btn-danger ">delete</button>
  </div>
  `
  return template
}

const createTodo = async title => {
  let url = 'https://jsonplaceholder.typicode.com/todos';

  const _todo = {
    title,
    completed: false
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(_todo)
  })

  const todo = await res.json()

  console.log(todo);
  todo.id = Date.now();

  todos.unshift(todo)
  listTodos(todos);
}

form.addEventListener('submit', e => {
  e.preventDefault();

  if (input.value === '') {
  console.log = ('No value')
  errorMsgs.innerHTML =   " You must write somthing";
  }
  else {

  createTodo(input.value);
  input.value = '';
  errorMsgs.remove()
  }
})

//delete tasks
output.addEventListener('click', e => {

    if(e.target.classList.contains('btn-danger'))
    deleteTodo(e.target.parentNode.id)

})

const deleteTodo = id => {
  todos = todos.filter(todo => todo.id != id);
  listTodos(todos);
}



output.addEventListener('click', ev => {

    
  
    if(ev.target.classList.contains('completed'))
     toggleTodo(e.target.parentNode.id)
  
  })
  
  const completedTodo = id => {
    todos = todos.filter(todo => todo.completed != completed);
    listTodos(todos);
  }
  