import React, { useEffect, useState } from "react";

const App = () => {
  const [task, setTask] = useState({});
  const [taskList, setTaskList] = useState([]);
  const [taskId, setTaskId] = useState(-1);

  useEffect(() => {
    let oldTask = JSON.parse(localStorage.getItem("Tasks")) || [];
    setTaskList(oldTask);
  }, []);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name == "skill") {
      let skill = task.skill || [];
      checked
        ? skill.push(value)
        : (skill = skill.filter((item) => item != value));
      // if (checked) {
      //   skill.push(value);
      // } else {
      //   skill = skill.filter((item) => item != value);
      // }
      setTask({ ...task, skill });
    } else {
      const tsk = { ...task, [name]: value };
      setTask(tsk);
    }
  };
  console.log(task);

  const handleSubmit = (e) => {l
    e.preventDefault();
    let updatedTaskList;
    if (taskId === -1) {
      const newTask = { id: Date.now(), ...task };
      updatedTaskList = [...taskList, newTask];
    } else {
      updatedTaskList = taskList.map((val) =>
        val.id === taskId ? { ...task, id: taskId } : val
      );
      setTaskId(-1);
    }

    setTaskList(updatedTaskList);
    localStorage.setItem("Tasks", JSON.stringify(updatedTaskList));
    setTask({});
  };

  const handleDelete = (id) => {
    let newTaskList = taskList.filter((task) => task.id != id);
    setTaskList(newTaskList);
    localStorage.setItem("Tasks", JSON.stringify(newTaskList));
  };

  const handleEdit = (id) => {
    const task = taskList.find((task) => task.id == id);
    setTask({...task,skill:[...task.skill || []]});
    setTaskId(id);
  };

  return (
    <>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            {/* Card layout */}
            <div className="card shadow-lg">
              <div className="card-body">
                <h3 className="text-center mb-4">📝 Task Manager</h3>

                {/* Form starts here */}
                <form>
                  <div className="input-group mb-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your task"
                      name="task"
                      value={task.task || ""}
                      onChange={handleChange}
                    />
                    <button
                      className="btn btn-primary"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  </div>
                </form>
                {/* Form ends here */}

                {/* Task Checkboxes */}
                <h5 className="mb-3">Select Skills</h5>
                <div className="row g-2 mb-4">
                  <div className="col-6">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="htmlCss"
                        name="skill"
                        value="HTML-CSS"
                        checked={
                          task.skill ? task.skill.includes("HTML-CSS") : false
                        }
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="htmlCss">
                        HTML / CSS
                      </label>
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="bootstrap"
                        name="skill"
                        value="Bootstrap"
                        checked={
                          task.skill ? task.skill.includes("Bootstrap") : false
                        }
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="bootstrap">
                        Bootstrap
                      </label>
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="javascript"
                        name="skill"
                        value="JavaScript"
                        checked={
                          task.skill ? task.skill.includes("JavaScript") : false
                        }
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="javascript">
                        JavaScript
                      </label>
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="react"
                        name="skill"
                        value="React.js"
                        checked={
                          task.skill ? task.skill.includes("React.js") : false
                        }
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="react">
                        React.js
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-8 mx-auto">
            {/* Table starts here */}
            <h5 className="mb-3">📋 Task List</h5>
            <div className="table-responsive shadow-lg w-100">
              <table className="table table-bordered text-center ">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>Task Name</th>
                    <th>Skill</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {taskList.map((val, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{val.task}</td>
                      <td>
                        {val.skill.map((s, i) => {
                          let color = "";
                          if (s === "HTML-CSS") color = "bg-primary";
                          else if (s === "Bootstrap")
                            color = "bg-warning text-dark";
                          else if (s === "JavaScript") color = "bg-success";
                          else if (s === "React.js") color = "bg-danger";

                          return (
                            <span key={i} className={`badge ${color} me-1`}>
                              {s}
                            </span>
                          );
                        })}
                      </td>

                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(val.id)}
                        >
                          Delete
                        </button>{" "}
                        <button
                          className="btn btn-primary"
                          onClick={() => handleEdit(val.id)}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Table ends here */}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;

// 🔑 Why key important?
// React ne fast rendering karvi hoy che, so jo koi item delete/add thay to:
// key na adhar par React compare kare che
// Old vs new virtual DOM ne efficiently manage kare che
