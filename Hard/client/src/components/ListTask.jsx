import React, { useEffect, useState } from "react";

export default function ListTask() {
  const [tasks, setTasks] = useState([]);

  function Task({ id, subject, description }) {
    const [show, setShow] = useState(false);

    function deleteTask() {
      const option = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      };

      fetch("/api/deleteTask", option)
        .then((res) => res.json())
        .then((data) => {
          setTasks(data.tasks);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    function editTask() {
      window.location.href = `/editTask/${id}`;
    }

    return (
      <li className="flex flex-col">
        <div className="w-full h-10 flex justify-between items-center border-b-2 border-gray-300">
          <span>{subject}</span>
          <div>
            <button
              className="text-white bg-green-500 rounded-lg px-2 mx-2 py-1"
              onClick={() => {
                editTask();
              }}
            >
              Edit
            </button>
            <button
              className="text-white bg-red-500 rounded-lg px-2 mx-2 py-1"
              onClick={() => {
                deleteTask();
              }}
            >
              Delete
            </button>
            <button
              className="text-white bg-blue-500 rounded-lg px-2 mx-2 py-1"
              onClick={() => {
                setShow(!show);
              }}
            >
              {show ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        {show && <span>{description}</span>}
      </li>
    );
  }

  function getTasks() {
    fetch("/api/listTask")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data.tasks);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="w-full h-full">
      <div className="flex justify-center items-center w-full h-full">
        <div className="w-96 h-96 bg-gray-100 rounded-lg flex flex-col justify-center items-center">
          <h1 className="text-2xl font-semibold">Task List</h1>
          <button
            className="w-3/4 h-10 bg-blue-500 text-white rounded-lg mt-4"
            onClick={() => {
              window.location.href = "/addTask";
            }}
          >
            Add Task
          </button>
          <ul id="taskHolder" className="w-3/4 mt-4 overflow-auto">
            {tasks.map((task, index) => {
              return (
                <Task
                  key={index}
                  id={index}
                  subject={task.subject}
                  description={task.description}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
