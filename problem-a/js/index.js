'use strict';

/* your code goes here! */

class Task {
  constructor(newDescription, newIsComplete) {
    this.description = newDescription; //assigning the field
    this.complete = newIsComplete;
  }

  render() {
    let elem = document.createElement('li');
    elem.textContent = this.description;
    if(this.complete) { //if this task is complete
      elem.classList.add('font-strike');
    }

    console.log("before call is defined,", this);
    elem.addEventListener('click', () => {
      console.log("you clicked me");
      console.log("inside the callback", this); //what am I ?
      this.toggleFinished(); //call function on myself
      elem.classList.toggle('font-strike');
    })

    return elem;
  }

  toggleFinished() {
    this.complete = !this.complete //make opposite of what it was
  }
}

class TaskList {
  constructor(taskArray) {
    this.tasks = taskArray; //remember that this.tasks is an array!!
  }

  addTask(descrString) {
    let newTask = new Task(descrString, false);
    this.tasks.push(newTask); //add to end of array
  }

  render() {
    let olElem = document.createElement('ol');
    this.tasks.forEach((aTask) => {
      let taskElem = aTask.render();
      olElem.appendChild(taskElem);
    })

    return olElem;
  }
}

class NewTaskForm {
  constructor(whatFunctionToCallWhenSubmitted) {
    this.submitCallback = whatFunctionToCallWhenSubmitted;
  }

  render() {
    let formElem = document.createElement('form');

    //children
    let inputElem = document.createElement('input');
    inputElem.classList.add('form-control', 'mb-3');
    inputElem.setAttribute('placeholder', "What else do you have to do?");
    formElem.appendChild(inputElem);
    let buttonElem = document.createElement('button');
    buttonElem.classList.add('btn', 'btn-primary');
    buttonElem.textContent = "Add task to list";
    formElem.appendChild(buttonElem);

    buttonElem.addEventListener('click', () => {
      //event.preventDefault();
      let inputValue = inputElem.value;

      //this.submitCallback()
      let whatToDo = this.submitCallback; //call him when submitted!
      whatToDo(inputValue); //do what is on the coversheet!
    })

    return formElem;
  }
}

class App {
  constructor(newParentElement, newTaskList) {
    this.parentElement = newParentElement;
    this.taskList = newTaskList;
  }

  //doesn't return, but attaches to the tree
  render() {
    let listElem = this.taskList.render();
    this.parentElement.appendChild(listElem);
    let whoYouGonnaCall = (arg) => this.addTaskToList(arg); //pass function, not result
    let formObj = new NewTaskForm(whoYouGonnaCall);
    this.parentElement.appendChild(formObj.render());
  }

  //aka "whatToDo"
  addTaskToList(descrString) {
    this.taskList.addTask(descrString);

    //refresh with new content 
    this.parentElement.innerHTML = ''; //clear old app
    this.render(); //rerender!
  }
}

// let aTask = new Task("Make some classes", true);
// let bTask = new Task("Arrow some functions", false);
let taskListObj = new TaskList([
  new Task("Make some classes", true), 
  new Task("Arrow some functions", false)
]);
// taskListObj.addTask("A second task");

let appElem = document.querySelector('#app');
let appObj = new App(appElem, taskListObj); //instantiates the app!
appObj.render();

//Make functions and variables available to tester. DO NOT MODIFY THIS.
if(typeof module !== 'undefined' && module.exports){
  /* eslint-disable */
  if(typeof Task !== 'undefined') 
    module.exports.Task = Task;
  if(typeof TaskList !== 'undefined') 
    module.exports.TaskList = TaskList;
  if(typeof NewTaskForm !== 'undefined') 
    module.exports.NewTaskForm = NewTaskForm;
  if(typeof App !== 'undefined') 
    module.exports.App = App;
}
