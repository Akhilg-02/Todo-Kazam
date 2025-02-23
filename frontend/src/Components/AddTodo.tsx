import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useApi } from "../Context/ApiContext";


interface Task {
  _id: string;
  title: string;
  status: "pending" | "completed";
}

const AddTodo = () => {

  const { userId } = useParams<{ userId: string }>(); 
  const { fetchTasks, addTask, editTask, deleteTask, toggleTaskStatus } = useApi();
  
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [editingTask, setEditingTask] = useState<{ id: string; title: string } | null>(null);

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

  const handleEditTask = async () => {
    if (!editingTask?.title.trim()) return;
    await editTask(editingTask.id, editingTask.title);
    setEditingTask(null);
    fetchTasks(userId!).then(setTasks);
  };

  const handleDeleteTask = async (taskId: string) => {
    await deleteTask(taskId);
    fetchTasks(userId!).then(setTasks);
  };

  const handleToggleStatus = async (taskId: string, currentStatus: "pending" | "completed") => {
    await toggleTaskStatus(taskId, currentStatus);
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
      <ul className="space-y-3">
        {tasks.map((task) => (
          <li key={task._id} className="flex justify-between items-center bg-gray-200 p-3 rounded-md">
            {editingTask?.id === task._id ? (
              <input
                type="text"
                value={editingTask.title}
                onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                className="flex-1 p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <span className={`text-sm ${task.status === "completed" ? "line-through text-gray-500" : "text-black"}`}>
                {task.title}
              </span>
            )}

            <div className="flex gap-2">
              {editingTask?.id === task._id ? (
                <button
                  onClick={handleEditTask}
                  className="px-3 py-1 text-xs bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => setEditingTask({ id: task._id, title: task.title })}
                  className="px-3 py-1 text-xs bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                >
                  Edit
                </button>
              )}

              <button
                onClick={() => handleToggleStatus(task._id, task.status)}
                className={`px-3 py-1 text-xs rounded-md ${
                  task.status === "pending"
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-gray-500 text-white hover:bg-gray-600"
                }`}
              >
                {task.status === "pending" ? "Complete" : "Undo"}
              </button>

              <button
                onClick={() => handleDeleteTask(task._id)}
                className="px-3 py-1 text-xs bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default AddTodo;
