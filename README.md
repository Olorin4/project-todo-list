# Advanced To-Do List Application


**Description**:
This project is an advanced to-do list application designed to help users manage their tasks efficiently. The application allows users to create, read, update, and delete tasks and projects. It includes features like setting due dates, prioritizing tasks, categorizing tasks into projects, and persistent data storage. The main goal of the project is to provide a user-friendly interface and enhance productivity through effective task management.

**Features**:
1. **Task Management**:
   - Create, edit, delete, and prioritize tasks.
   - Set due dates and reminders for tasks.
   - Mark tasks as completed or important.
   - Add detailed notes and subtasks to each task.

2. **Project Management**:
   - Create, rename, and delete projects.
   - Switch between projects to view and manage tasks within each project.
   - Set a project as the current project to focus on specific tasks.

3. **Persistent Storage**:
   - Use local storage to save tasks and projects, ensuring data is not lost on page refresh.

4. **User Interface**:
   - Responsive design that works on both mobile and desktop devices.
   - Interactive elements for adding, editing, and deleting tasks and projects.
   - Real-time updates of task and project lists.

5. **Additional Features**:
   - Input validation to prevent empty tasks or projects.
   - Dynamic rendering of tasks and projects to the user interface.
   - Event listeners for interactive elements to enhance user experience.

**Technologies Used**:
1. **JavaScript**: Used for DOM manipulation, event handling, and managing application logic.
2. **HTML**: Provides the structure of the application, including input fields, buttons, and containers.
3. **CSS**: Styles the application, ensuring a visually appealing and responsive design.
4. **Date-fns**: A JavaScript library for handling date and time operations, used to manage task due dates.

### Detailed Implementation

**ProjectList Class**:
- Manages an array of Project instances.
- Methods include adding, removing, and retrieving projects by ID and current status.
- Manages project count and keeps track of the current project.

**Project Class**:
- Represents a project containing multiple tasks.
- Methods for adding, removing, and retrieving tasks by ID and current status.
- Manages task count and keeps track of the current task.

**Task Class**:
- Represents an individual task within a project.
- Properties include title, due date, importance, completion status, notes and subtasks.
- Methods for managing subtasks and updating task properties.

**Subtask Class**:
- Represents a subtask under a main task.
- Properties include description and completion status.

**ProjectManager.js**:
- Handles logic for creating, deleting, renaming, and setting projects as current.
- Integrates with ProjectList to manage project-related actions.

**TaskManager.js**:
- Handles logic for creating, removing, renaming, and updating tasks.
- Integrates with ProjectManager to manage task-related actions within the current project.

**TaskRenderer.js**:
- Manages the user interface for tasks, including rendering task lists and handling task operations through user input.

**Dashboard.js**:
- Initializes the dashboard and all its menu-items, like Projects, Important, My Day etc.
- Loads the 3 default projects.

**MainContent.js**:
- Initializes the main content section by loading the current project and its tasks ensuring the application is ready for user interaction.

**Example Usage**:
Upon loading the application, default projects and tasks are created. Users can add new tasks by typing into the input field and pressing Enter. Tasks are dynamically displayed under the current project. Users can switch between projects, and the application remembers the current state using local storage, ensuring a seamless user experience.
