import checkSVG from "./images/check.png";
import cancelSVG from "./images/cancel.png";
import { Project } from "./Project";

class Todo {
    constructor(id, title, desc, date, priority) {
        this.id = id;
        this.title = title;
        this.desc = desc;
        this.date = new Date(date);
        this.priority = priority;
    }
};

const createTODO = function (project) {

    const innerContent = document.querySelector(".inner-content");
    innerContent.innerText = "";
    project.todos.forEach(todo => {
        const toDO = document.createElement('div');

        toDO.classList.add('to-do');
        toDO.insertAdjacentHTML("beforeend", "<h2>TO DO</h2>");

        const titleP = document.createElement("h3");
        titleP.innerText = "Title: " + todo.title;

        const descP = document.createElement("p");
        descP.innerText = "Description: " + todo.desc;

        const dateP = document.createElement("p");
        const formattedDate = new Date(todo.date);
        dateP.innerText = "Date: " + (formattedDate.toLocaleDateString("sr-RS"));

        const priorityP = document.createElement("p");
        priorityP.innerText = "Priority: " + todo.priority;

        const check = document.createElement('img');
        check.classList.add('todoBTNS', "check");
        check.id = todo.id;
        const cancel = document.createElement('img');
        cancel.classList.add('todoBTNS', "cancel");
        cancel.id = todo.id;
        check.src = checkSVG;
        cancel.src = cancelSVG;

        const btnsDiv = document.createElement("div");
        btnsDiv.classList.add("btns");
        btnsDiv.append(cancel, check);
        cancel.addEventListener('click', () => {
            var data = JSON.parse(localStorage.getItem(project.name));
            var filteredTodos = data.todos;
            filteredTodos = filteredTodos.filter(item => item.id !== todo.id);
            project.todos = filteredTodos;
            localStorage.setItem(project.name, JSON.stringify({ todos: filteredTodos, history: data.history }));
            createTODO(project);
            console.log(JSON.parse(localStorage.getItem(project.name)));
        }
        );
        check.addEventListener('click', () => {
            var data = JSON.parse(localStorage.getItem(project.name));
            var historyTodos = data.todos.filter(item => item.id == todo.id);
            project.history.push(historyTodos[0]);
            var filteredTodos = data.todos.filter(item => item.id !== todo.id);
            project.todos = filteredTodos;
            localStorage.setItem(project.name, JSON.stringify({ todos: project.todos, history: project.history }));
            createTODO(project);
            loadHisotry(project);
            console.log(JSON.parse(localStorage.getItem(project.name)));
        })
        toDO.append(titleP, descP, dateP, priorityP, btnsDiv);
        innerContent.appendChild(toDO);

    });

};

const loadHisotry = function (project) {
    const historyDiv = document.querySelector(".history");
    historyDiv.innerText = "";

    project.history.forEach(element => {
        const toDO = document.createElement('div');

        toDO.classList.add('to-do');
        toDO.insertAdjacentHTML("beforeend", "<h2>TO DO</h2>");

        const titleP = document.createElement("h3");
        titleP.innerText = "Title: " + element.title;

        const descP = document.createElement("p");
        descP.innerText = "Description: " + element.desc;

        const dateP = document.createElement("p");
        const formattedDate = new Date(element.date);
        dateP.innerText = "Date: " + (formattedDate.toLocaleDateString("sr-RS"));

        const priorityP = document.createElement("p");
        priorityP.innerText = "Priority: " + element.priority;

        toDO.append(titleP, descP, dateP, priorityP);
        historyDiv.appendChild(toDO);

    });

}


export { Todo, createTODO, loadHisotry };