import React, { useEffect, useState } from "react";

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

export default function AddTask() {
  const [task, setTask] = useState({ subject: "", description: "" });
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

    return "";
  }

  function add(e) {
    const element = e.target;
    if (check()) {
      if (!started) setStarted(true);
      element.innerHTML = "Failed";
      setTimeout(() => {
        element.innerHTML = "Add Task";
        element.classList.remove("disabled");
      }, 500);
      return;
    }

    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    };

    fetch("/api/addTask", option)
      .then((res) => res.json())
      .then((data) => {
        element.innerHTML = "Added";
        setTimeout(() => {
          element.innerHTML = "Add Task";
          element.classList.remove("disabled");
        }, 500);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="w-full h-full">
      <div className="flex justify-center items-center w-full h-full">
        <div className="w-96 h-96 bg-gray-100 rounded-lg flex flex-col justify-center items-center">
          <h1 className="text-2xl font-semibold">Add Task</h1>
          <input
            type="text"
            placeholder="Subject"
            className="w-3/4 h-10 border-2 border-gray-300 rounded-lg mt-4 px-4"
            onInput={(e) => {
              setTask({ ...task, subject: e.target.value });
            }}
          />
          <input
            type="text"
            placeholder="Description"
            className="w-3/4 h-10 border-2 border-gray-300 rounded-lg mt-4 px-4"
            onInput={(e) => {
              setTask({ ...task, description: e.target.value });
            }}
          />
          {started && <p className="text-red-500 text-sm">{check()}</p>}
          <button
            className="w-3/4 h-10 bg-blue-500 text-white rounded-lg mt-4"
            onClick={(e) => {
              buttonAnimation(e, { callback: add, args: e }, "Adding");
            }}
          >
            Add Task
          </button>
          <button
            className="w-3/4 h-10 bg-red-500 text-white rounded-lg mt-4"
            onClick={() => {
              window.location.href = "/listTask";
            }}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
