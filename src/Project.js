import { createTODO, loadHisotry } from "./TODO";


class Project {
    constructor(name) {
        this.name = name;
        this.todos = [];
        this.history = [];
    }

    addTodo(project, todo) {
        const currentTodos = JSON.parse(localStorage.getItem(project.name)) || { todos: [], history: [] };
        currentTodos.todos.push(todo);
        localStorage.setItem(project.name, JSON.stringify(currentTodos));
        project.todos = currentTodos.todos;
        project.history = currentTodos.history;
    };



    static loadFromLocalStorage(name) {
        const data = JSON.parse(localStorage.getItem(name)) || {};
        const project = new Project(name);
        project.todos = data.todos || [];
        project.history = data.history || [];
        return project;
    };
};

var currentProject = Project.loadFromLocalStorage("Project");
//localStorage.setItem(currentProject.name, JSON.stringify({ todos: currentProject.todos, history: currentProject.history }));


const projects = [];
loadProjectsFromLocalStorage();
loadProjects();


function loadProjectsFromLocalStorage() {
    for (let i = 0; i < localStorage.length; i++) {
        let project = localStorage.key(i);
        if (!projects.includes(project)) {
            projects.push(project);
        }
    };
}

function createProject() {
    const name = prompt("Enter project name", "Project");
    if (name != null && name !== "") {
        let data = Project.loadFromLocalStorage(name);
        localStorage.setItem(name, JSON.stringify({ todos: data.todos, history: data.history }));
        loadProjectsFromLocalStorage();
        loadProjects();
    }
}


function loadProjects() {
    const projectsDiv = document.querySelector(".projects");
    projectsDiv.innerHTML = "";

    projects.forEach(project => {
        const heading = document.createElement('h2');
        heading.innerText = project;
        heading.classList.add('project-title');
        heading.addEventListener('click', () => {
            const headings = document.querySelectorAll('.project-title');
            headings.forEach(element => {
                element.classList.remove('active');
            });
            heading.classList.add('active');
            currentProject = Project.loadFromLocalStorage(heading.innerText);
            createTODO(currentProject);
            loadHisotry(currentProject);
        });
        projectsDiv.appendChild(heading);
    });

    const addProject = document.createElement('button');
    addProject.innerText = "+ Add";
    addProject.addEventListener('click', () => createProject());
    projectsDiv.append(addProject);
};


export { Project, loadProjects, currentProject };