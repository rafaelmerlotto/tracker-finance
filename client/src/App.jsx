import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Overview from "./pages/Overview";
import Register from "./pages/Register";
import { useAuth } from "./auth/auth";
import CreateExpenses from "./components/CreateExpenses";
import CreateIncome from "./components/CreateIncome";
import RecentExpenses from "./components/RecentExpenses";
import Moviments from "./components/Moviments";

export default function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/overview" element={<PrivateRoute><Overview/> </PrivateRoute>} /> 
          <Route path="/createExpenses" element={<PrivateRoute><CreateExpenses/> </PrivateRoute>}/> 
          <Route path="/createIncome" element={<PrivateRoute><CreateIncome/> </PrivateRoute>}/> 
          <Route path="/moviments" element={<PrivateRoute><Moviments/> </PrivateRoute>}/> 
          <Route path="/" element={<Login/>} /> 
          <Route path="/register" element={<Register/>} /> 
        </Routes>
      </BrowserRouter>
    </>
  );
}


const PrivateRoute = ({ children }) => {
  let auth = useAuth()
  if (!auth.token) {
    return (
      <Navigate to={"/"} replace />
    )
  }
  return children
}