import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from "../Components/Registration";
import  Login from '../Components/Login'
import  AddTodo  from "../Components/AddTodo";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-task/:userId" element={<AddTodo />} /> 
      </Routes>
    </Router>
  );
};

export default AppRoutes;
