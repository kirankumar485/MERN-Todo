import React from "react";
import axios from "axios";

class Task extends React.Component {
  state = {
    tasks: [],
    description: "",
  };

  componentDidMount() {
    this.getTasks();
  }

  getTasks = async () => {
    const response = await axios.get("http://localhost:5000/api/tasks");
    this.setState({ tasks: response.data });
  };

  handleInputChange = (e) => {
    this.setState({ description: e.target.value });
  };

  handleAddTask = async () => {
    await axios.post("http://localhost:5000/api/tasks", {
      description: this.state.description,
    });
    this.getTasks();
  };

  handleUpdateTask = async (id) => {
    await axios.put(`http://localhost:5000/api/tasks/${id}`, {
      description: this.state.description,
    });
    this.getTasks();
  };

  handleDeleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    this.getTasks();
  };

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.description}
          onChange={this.handleInputChange}
        />
        <button onClick={this.handleAddTask}>Add Task</button>
        <ul>
          {this.state.tasks.map((task) => (
            <li key={task._id}>
              {task.description}{" "}
              <button onClick={() => this.handleUpdateTask(task._id)}>
                Update
              </button>{" "}
              <button onClick={() => this.handleDeleteTask(task._id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Task;
