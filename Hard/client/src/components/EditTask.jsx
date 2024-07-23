import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function buttonAnimation(e, func, loadText) {
  let element = e.target;
  if (element.classList.contains("disabled")) return;
  element.classList.add("disabled");
  element.style.animation = "shrink 0.25s forwards";
  element.innerHTML = loadText;
  setTimeout(() => {
    element.style.animation = "";
    func.callback(func.args);
  }, 250);
}

export default function EditTask() {
  const [task, setTask] = useState({ subject: "", description: "" });
  const [oldTask, setOldTask] = useState({ subject: "", description: "" });

  const [started, setStarted] = useState(false);

  function check() {
    if (!task.subject || !task.description) {
      return "Invalid request";
    }

    if (task.subject.length > 20) {
      return "Subject is too long";
    }

    if (task.description.length > 100) {
      return "Description is too long";
    }
    if (
      task.subject === oldTask.subject &&
      task.description === oldTask.description
    ) {
      return "No changes";
    }

    return "";
  }

  const handleDescription = (e) => {
    setTask({ ...task, description: e.target.value });
  };

  const handleSubject = (e) => {
    setTask({ ...task, subject: e.target.value });
  };

  const { id } = useParams();

  if (!id) {
    window.location.href = "/listTask";
  }

  function getTasks() {
    fetch("/api/listTask")
      .then((res) => res.json())
      .then((data) => {
        const tasks = data.tasks;
        const dataTask = tasks[id];
        setTask(dataTask);
        setOldTask(dataTask);
      })
      .catch((err) => {
        console.log(err);
        window.location.href = "/listTask";
      });
  }

  function edit(e) {
    const element = e.target;
    if (check()) {
      if (!started) setStarted(true);
      element.innerHTML = "Failed";
      setTimeout(() => {
        element.innerHTML = "Save";
        element.classList.remove("disabled");
      }, 500);
      return;
    }

    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, ...task }),
    };

    fetch("/api/editTask", option)
      .then((res) => res.json())
      .then((data) => {
        element.innerHTML = "Saved";
        setTimeout(() => {
          element.innerHTML = "Save";
          setTimeout(() => {
            window.location.href = "/listTask";
          }, 250);
        }, 500);
      })
      .catch((err) => {
        console.log(err);
        alert("Error");
        window.location.href = "/listTask";
      });
  }

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="w-full h-full">
      <div className="flex justify-center items-center w-full h-full">
        <div className="w-96 h-96 bg-gray-100 rounded-lg flex flex-col justify-center items-center">
          <h1 className="text-2xl font-semibold">Add Task</h1>
          <input
            type="text"
            placeholder="Subject"
            className="w-3/4 h-10 border-2 border-gray-300 rounded-lg mt-4 px-4"
            value={task.subject}
            onInput={handleSubject}
          />
          <input
            type="text"
            placeholder="Description"
            className="w-3/4 h-10 border-2 border-gray-300 rounded-lg mt-4 px-4"
            value={task.description}
            onInput={handleDescription}
          />
          {started && <p className="text-red-500 text-sm">{check()}</p>}
          <button
            className="w-3/4 h-10 bg-green-500 text-white rounded-lg mt-4"
            onClick={(e) => {
              buttonAnimation(e, { callback: edit, args: e }, "Saving");
            }}
          >
            Save
          </button>
          <button
            className="w-3/4 h-10 bg-yellow-500 text-white rounded-lg mt-4"
            onClick={() => {
              window.location.href = "/listTask";
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
