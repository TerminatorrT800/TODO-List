import "./styles.css";
import createForm from "./Form";
import { Project, loadProjects, currentProject } from "./Project";
import { Todo, createTODO, loadHisotry } from "./TODO.js"

const newBTN = document.querySelector(".newBTN");
newBTN.addEventListener('click', () => createForm(currentProject));

window.addEventListener("load", loadPage);


function loadPage(){
    createTODO(currentProject);
    loadHisotry(currentProject);

}

console.log(currentProject);
console.log(JSON.parse(localStorage.getItem(currentProject.name)));
