import { createContext, useContext } from "react";
import axios from "axios";

interface Task {
  _id: string;
  title: string;
  status: "pending" | "completed";
}

interface AuthResponse {
  token: string;
  userId: string;
}


interface RegisterData {
  username: string;
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface ApiContextProps {
  fetchTasks: (userId: string) => Promise<Task[]>;
  addTask: (title: string, userId: string) => Promise<void>;
  editTask: (taskId: string, title: string) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  registerUser: (userData: RegisterData) => Promise<AuthResponse>;
  loginUser: (credentials: LoginData) => Promise<AuthResponse>;
  toggleTaskStatus: (taskId: string, status: "pending" | "completed") => Promise<void>;
}

const API_URL: string = "https://todo-kazam.onrender.com"

const ApiContext = createContext<ApiContextProps | undefined>(undefined);

export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const authToken = localStorage.getItem("authToken");

  const config = {
    headers: { Authorization: `Bearer ${authToken}` },
  };

    // Register User
    const registerUser = async (userData: RegisterData): Promise<AuthResponse> => {
      const { data } = await axios.post(`${API_URL}/Registration`, userData);
      return data;
    };
  
    // Login User
    const loginUser = async (credentials: LoginData): Promise<AuthResponse> => {
      const { data } = await axios.post(`${API_URL}/login`, credentials);
      return data;
    };

  const fetchTasks = async (userId: string): Promise<Task[]> => {
    try {
      const { data } = await axios.get(`${API_URL}/getAllTheTask/${userId}`, config);
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return [];
    }
  };

  const addTask = async (title: string, userId: string) => {
    try {
      await axios.post(`${API_URL}/input`, { title, userId }, config);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const editTask = async (taskId: string, title: string) => {
    try {
      await axios.patch(`${API_URL}/EditTask/${taskId}`, { title }, config);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      await axios.delete(`${API_URL}/DeleteTask/${taskId}`, config);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const toggleTaskStatus = async (taskId: string, currentStatus: "pending" | "completed") => {
    try {
      const newStatus = currentStatus === "pending" ? "completed" : "pending";
      await axios.patch(`${API_URL}/MarkTask/${taskId}`, { status: newStatus }, config);
    } catch (error) {
      console.error("Error toggling task status:", error);
    }
  };

  return (
    <ApiContext.Provider value={{ fetchTasks, addTask, editTask, deleteTask, toggleTaskStatus, registerUser, loginUser }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = (): ApiContextProps => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApi must be used within an ApiProvider");
  }
  return context;
};
