//Select element
const clear = document.querySelector('.clear');
const date = document.getElementById('date');
const list = document.getElementById('list');
const addbtn = document.querySelector('.add-to-do');
const input = document.getElementById('input');

//Class name
const CHECK = 'fa-check-circle';
const UNCHECK = 'fa-circle-thin';
const LINETHROUGH = 'lineThrough';

let LIST, id;

//date
const options = {
  weekday: 'long',
  day: 'numeric',
  month: 'short',
  year: 'numeric'
};

const today = new Date();

date.innerHTML = today.toLocaleDateString('en-GB', options);

//AddTodo function
const addTodo = (todo, id, done, trash) => {
  if (trash) return;

  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINETHROUGH : '';

  const item = `
              <li class='item'>
                  <i class="fa ${DONE} co" job='complete' id=${id}></i>
                  <p class="text ${LINE}">${todo}</p>
                  <i class="fa fa-trash-o de" job='delete' id=${id}></i>
              </li>
  `;
  list.insertAdjacentHTML('beforeend', item);
};

//Eventlistener - Trigger
const trigger = () => {
  const todo = input.value;
  if (todo) {
    addTodo(todo, id, false, false);
    LIST.push({
      name: todo,
      id: id,
      done: false,
      trash: false
    });
    //Set item in local storage
    localStorage.setItem('TODO', JSON.stringify(LIST));
    id++;
    input.value = '';
  } else {
    return '';
  }
};

//Eventlistener - Add todo with enter
document.addEventListener('keyup', e => {
  if (e.keyCode === 13) {
    trigger();
  }
});

//Eventlistener - Add todo with plus sign
addbtn.addEventListener('click', () => {
  trigger();
});

//Complete todo function
const completeTodo = e => {
  e.classList.toggle(CHECK);
  e.classList.toggle(UNCHECK);
  e.parentNode.querySelector('.text').classList.toggle(LINETHROUGH);

  LIST[e.id].done ? (LIST[e.id].done = false) : (LIST[e.id].done = true);
};

//Remove todo function
const removeTodo = e => {
  e.parentNode.parentNode.removeChild(e.parentNode);

  LIST[e.id].trash = true;
};

//Eventlistener - To choose complete or remove
list.addEventListener('click', e => {
  const element = e.target;
  const elementJob = element.attributes.job.value;

  if (elementJob === 'complete') {
    completeTodo(element);
  } else if (elementJob === 'delete') {
    removeTodo(element);
  }
  //Set item in local storage
  localStorage.setItem('TODO', JSON.stringify(LIST));
});

//Local Storage
const loadList = array => {
  array.forEach(item => {
    addTodo(item.name, item.id, item.done, item.trash)
  })
};

const data = localStorage.getItem('TODO');

if (data) {
  LIST = JSON.parse(data);
  id = LIST.length;
  loadList(LIST);
} else {
  LIST = [];
  id = 0;
}


//Clear localStorage
clear.addEventListener('click', () => {
  localStorage.clear('TODO');
  location.reload();
})