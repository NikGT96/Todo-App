import { useState, useEffect } from "react";

const Body = () => {
  const [task, setTask] = useState([]);
  const [newTask, setNewTask] = useState("");
  useEffect(() => {
    getItems();
  }, []);

  const getItems = () => {
    if (!localStorage.getItem("key")) return;
    const allTasks = JSON.parse(localStorage.getItem("key"));
    setTask(allTasks);
    console.log(task);
  };

  const handleAdd = () => {
    if (newTask.trim()) {
      const updatedTasks = [
        ...task,
        { text: newTask.trim(), isCompleted: false },
      ];
      setTask(updatedTasks);
      localStorage.setItem("key", JSON.stringify(updatedTasks));
      setNewTask("");
    } else {
      alert("Cannot be empty");
    }
    // newTask ? (setTask([...task, newTask]), setNewTask("")) : <p>Cannot be empty</p>;
  };

  const handleEdit = (index) => {
    setNewTask(task[index].text);
    const filteredItems = task.filter((_, i) => {
      return i !== index;
    });
    setTask(filteredItems);
  };

  const handleDelete = (index) => {
    const itemsNotDeleted = task.filter((_, i) => {
      return i !== index;
      //   return item !== task[index];
    });
    setTask(itemsNotDeleted);
    localStorage.setItem("key", JSON.stringify(itemsNotDeleted));
  };

  const toggleCheckBox = (index) => {
    // const copyTask = [...task]
    // copyTask[index].isCompleted = !copyTask[index].isCompleted;
    // setTask(copyTask);
    // localStorage.setItem('key', JSON.stringify(copyTask));

    const copyTask = task.map((item, i) => {
      return i === index ? {...item, isCompleted: !item.isCompleted}: item
    })
    setTask(copyTask);
    localStorage.setItem('key', JSON.stringify(copyTask));
  };

  return (
    <div className="flex justify-center">
      <div className="w-1/2 border-2 p-12">
        <h1 className="font-bold text-2xl text-center pb-5">MY TODO APP</h1>
        <div>
          <input
            onChange={(e) => setNewTask(e.target.value)}
            value={newTask}
            type="text"
            className="border-2"
            placeholder="Enter your task"
          />
          <button
            onClick={handleAdd}
            className="bg-gray-500 p-1 rounded-sm ml-6"
          >
            ADD
          </button>
          <ul className="flex-col">
            {task.map((task, index) => (
              <li className="flex justify-between w-1/2 p-1" key={index}>
                <div>
                  <input
                    onChange={() => toggleCheckBox(index)}
                    checked={task.isCompleted}
                    type="checkbox"
                  />
                  <span className={ task.isCompleted ? "line-through" : " " }>
                    {task.text}
                  </span>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(index)}
                    className="bg-blue-400"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-blue-400"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
            {/* {task.map((task) => {
              return <li>{task}</li>;
            })} */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Body;
