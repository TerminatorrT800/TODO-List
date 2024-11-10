import { createTODO, Todo } from "./TODO";
import { Project } from "./Project";
const createForm = function (project) {
    const popupContainer = document.querySelector('.popup-container');
    const formHTML = `
    <div id="popup" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: white; padding: 20px; border: 1px solid black; z-index: 1000;">
        <form id="todo-form">
            <input type="text" id="title" required maxlength="20" placeholder="title"><br><br>
            <textarea id="desc" type="text" required maxlength="200" rows="5" id="desc" required placeholder="Description"></textarea><br><br>
            <input type="date" id="date" required><br><br>
            <select type="text" id="priority" required>
                <option value="" disabled selected>Select priority</option>
                <option value="low">Low</option>
                <option value="mid">Mid</option>
                <option value="high">High</option>
            </select>
            <button type="submit">Submit</button>
            <button type="button" id="close-popup">Close</button>
        </form>
    </div>
`;
    popupContainer.innerHTML = formHTML;

    document.getElementById('close-popup').addEventListener('click', () => {
        popupContainer.innerHTML = '';
    });

    document.getElementById("todo-form").addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const desc = document.getElementById('desc').value;
        const date = document.getElementById('date').value;
        const priority = document.getElementById('priority').value;
        const todo = new Todo(project.todos.length, title, desc, new Date(date), priority);
        project.addTodo(project, todo);
        popupContainer.innerHTML = '';
        createTODO(project);
    });
    
};

export default createForm;


