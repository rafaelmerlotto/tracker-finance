import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Overview from "./pages/Overview";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/overview" element={<Overview/>} /> 
          <Route path="/" element={<Login/>} /> 
        </Routes>
      </BrowserRouter>


    </>
   
   
  );
}

