import React from "react";
import './App.css'
import { Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Registration from "./components/Auth/Registration";
import Chatpage from "./pages/Chatpage"
import Profile from "./components/miscellaneous/Profile";
import NotFoundPage from "./pages/NotFoundPage";
function App() {
  return (
    <div className="App">
      <Routes>
      <Route path='*' element={<NotFoundPage/>} />
      <Route exact path ="/" Component={Login}/>
      <Route exact path ="/chat" Component={Chatpage}/>
      <Route exact path ="/Registration" Component={Registration}/>
      <Route exact path ="/Profile" Component={Profile}/>
      
     </Routes>     
     </div>
  );
}
export default App;
