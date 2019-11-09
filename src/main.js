class Task {
    constructor(name, description, color) {
        this.name = name;
        this.description = description;
        this.color=color;
    }
    newTaskFunction(){
        const newTask=document.createElement("li");
        const newTitle=document.createElement("h3");
        const newDescription=document.createElement("p");
        const removeTask=document.createElement("button");
        newTitle.innerText=this.name;
        newDescription.innerText=this.description;
        newTask.appendChild(newTitle);
        newTask.appendChild(newDescription);
        newTask.appendChild(removeTask)
        newTask.style.backgroundColor=this.color;
        removeTask.addEventListener("click",(e)=>{
         e.target.parentElement.parentElement.removeChild(e.target.parentElement)
        })
        return newTask;
    }
}
const formInputs={
    newTaskButton:document.querySelector("button[type='submit']"),
    title:document.querySelector("input[type='text']"),
    bgColor:document.querySelector("input[type='color']"),
    importantRange:document.querySelector("select"),
    description:document.querySelector("textarea"),
};

formInputs.newTaskButton.addEventListener("click",(e)=>{
    e.preventDefault()
    const {title,bgColor,importantRange,description}=formInputs;
  const Pop= new Task(title.value,description.value,bgColor.value);
switch(importantRange.value){
    case "1": {
        const list = document.querySelector("div.task_list > .important");
        const newListElement = Pop.newTaskFunction();
        list.appendChild(newListElement);
        break;
    }
    case "2": {
        const list = document.querySelector("body > div > div.task_list > .normal");
        const newListElement = Pop.newTaskFunction();
        list.appendChild(newListElement);
        break;
    }
    case "3": {
        const list = document.querySelector("body > div > div.task_list > .less");
        const newListElement = Pop.newTaskFunction();
        list.appendChild(newListElement);
        break;
    }
}
});
