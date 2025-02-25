import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useApi } from "../Context/ApiContext";
import "../App.css"



interface Task {
  _id: string;
  title: string;
  status: "pending" | "completed";
}

const AddTodo = () => {

  const { userId } = useParams<{ userId: string }>(); 
  const { fetchTasks, addTask} = useApi();
  
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskTitle, setTaskTitle] = useState<string>("");


  useEffect(() => {
    if (userId) {
      fetchTasks(userId).then(setTasks);
    }
  }, [userId]);

  const handleAddTask = async () => {
    if (!taskTitle.trim()) return;
    await addTask(taskTitle, userId!);
    setTaskTitle("");
    fetchTasks(userId!).then(setTasks);
  };


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
    <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-700 text-left mb-4">📝 Note App</h2>

      {/* Task Input */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="New Note..."
          className="flex-1 p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <button
          onClick={handleAddTask}
          className="px-4 py-2 bg-[#8f400d] text-white text-sm rounded-md hover:bg-[#732f09] transition duration-300"
        >
         + Add 
        </button>
      </div>

      {/* Task List */}
      <h6 className="text-xl font-bold text-gray-700 text-left mb-4">Notes</h6>
      <ul  className="space-y-3 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-[#e0322c78] scrollbar-track-[#695acd39]">
        {tasks.map((task, index) => (
          <>
            <li key={task._id}>
              <span className={`text-sm ${task.status === "completed" ? "line-through text-gray-500" : "text-black"}`}>
                {task.title}
              </span>
            </li>
            {index !== tasks.length - 1 && <hr className="border-t border-gray-300" />}
          </>
        ))}
      </ul>
    </div>
</div>
  );
};




export default AddTodo;
