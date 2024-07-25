// ProjectSaver.js stores the projectList and Project objects to local storage.
import { ProjectList, Project, Task, Subtask } from "../Objects";


export function save(projectList) {
    const serializedProjectList = {
        projects: projectList.projects.map(project => ({
            id: project.id,
            title: project.title,
            _isCurrent: project._isCurrent,
            tasks: project.tasks.map(task => ({
                id: task.id,
                title: task.title,
                _isCurrent: task._isCurrent,
                _isCompleted: task._isCompleted,
                _isImportant: task._isImportant,
                dueDate: task.dueDate,
                notes: task.notes,
                subtasks: task.subtasks.map(subtask => ({
                    id: subtask.id,
                    title: subtask.title,
                    _isCompleted: subtask._isCompleted
                }))
            }))
        }))
    }
    localStorage.setItem('projectList', JSON.stringify(serializedProjectList));
}


export function loadSavedProjectList(serializedData) {
    
    const data = JSON.parse(serializedData);

    // Reconstruct ProjectList instance
    const projectList = new ProjectList();

    // Reconstruct Project instances and add them to the ProjectList
    data.projects.forEach(projectData => {
        const project = new Project(projectData.id, projectData.title);
        project._isCurrent = projectData._isCurrent;

        // Reconstruct Task instances and add them to the Project
        projectData.tasks.forEach(taskData => {
            const task = new Task(taskData.id, taskData.title, project.id);
            task._isCurrent = taskData._isCurrent;
            task._isCompleted = taskData._isCompleted;
            task._isImportant = taskData._isImportant;
            task.dueDate = taskData.dueDate;
            task.notes = taskData.notes;

            // Reconstruct Subtask instances and add them to the Task
            taskData.subtasks.forEach(subtaskData => {
                const subtask = new Subtask(subtaskData.id, subtaskData.title);
                subtask._isCompleted = subtaskData._isCompleted;

                task.addSubtask(subtask);
            });

            project.addTask(task);
        });

        projectList.addProject(project);
    });

    return projectList;
}