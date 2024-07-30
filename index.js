document.addEventListener("DOMContentLoaded" , ()=>{
    const storedTasks = JSON.parse(localStorage.getItem('tasks'))

    if(storedTasks){
        storedTasks.forEach((task)=>tasks.push(task))
        updateTaskList();
        updateStats();
    }
})

let tasks = [];

const saveTasks = ()=>{
    localStorage.setItem('tasks',JSON.stringify(tasks))
}

const addTask = () => {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();

    if(text){
    tasks.push({text:text , completed :false});
    taskInput.value = '';
    updateTaskList();
    updateStats();
    saveTasks();
    }

    if(text == ""){
        alert("Please enter a text");
    }
};

const toggleTaskComplete = (index) =>{
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
    updateStats();
    saveTasks();
}

const deleteTask = (index) =>{
tasks.splice(index , 1);
updateTaskList();
updateStats();
basicDelete();
saveTasks();
}

const editTask = (index) => {
    const taskInput = document.getElementById("taskInput");
    taskInput.value = tasks[index].text;
    tasks.splice(index ,1);
    updateTaskList();
    updateStats();
    saveTasks();
}

const updateStats = () =>{
    const completedTask = tasks.filter((task)=> task.completed).length;
    const totalTask = tasks.length;
    const progress = (completedTask/totalTask)*100;
    const progressBar = document.getElementById('progress');
    progressBar.style.width = `${progress}%`;

    document.getElementById('numbers').innerText = `${completedTask} / ${totalTask}`;
    if(tasks.length && completedTask === totalTask){
        blaskConfetti();
    }
};



const updateTaskList = () => {
const taskList = document.getElementById('task-list');
taskList.innerHTML = "";

tasks.forEach((task, index) => {
    const listItems = document.createElement('li');

    listItems.innerHTML= `<div class="taskitem">
    <div class="task ${task.completed ? "completed" : ""}"> 
        <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""}>
        <p>${task.text}</p>
    </div>
    <div class="icons">
        <img src="./img/SVG-edit_logo.svg.png" onClick = "editTask(${index})"/>
        <img src="./img/delete 2.png" onClick = "deleteTask(${index})"/>
    </div>
</div> `;

listItems.addEventListener('change', ()=> toggleTaskComplete(index));
taskList.appendChild(listItems); 
});
};

document.getElementById('submit').addEventListener('click', function(event) {
event.preventDefault();

addTask();
});

const blaskConfetti = () => {
    const defaults = {
        spread: 360,
        ticks: 100,
        gravity: 0,
        decay: 0.94,
        startVelocity: 30,
        shapes: ["heart"],
        colors: ["FFC0CB", "FF69B4", "FF1493", "C71585"],
      };
      
      confetti({
        ...defaults,
        particleCount: 50,
        scalar: 2,
      });
      
      confetti({
        ...defaults,
        particleCount: 25,
        scalar: 3,
      });
      
      confetti({
        ...defaults,
        particleCount: 10,
        scalar: 4,
      });
};

const basicDelete =() => {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
};