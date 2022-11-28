import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './Container/Login';
import Signup from './Container/Signup';
import TeacherDisplay from './Container/TeacherDisplay';
import StudentDisplay from './Container/StudentDisplay';
import Home from './Container/Home';
import StudentIndivisual from './Container/StudentIndivisual';
import TeacherIndivisual from './Container/TeacherIndivisual';
import AddTeacher from './Container/AddTeacher';
import AddStudent from './Container/AddStudent';
function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" exact element={<Home/>} />
      <Route path="/home" exact element={<Home/>} />
      <Route path="/login" exact element={<Login/>} />
      <Route path="/signup" exact element={<Signup/>}/>
      <Route path="/teacher" exact element={<TeacherDisplay/>}/>
      <Route path="/particularteacher/:id" exact element={<TeacherIndivisual/>}/>
      <Route path="/particularstudent/:id" exact element={<StudentIndivisual/>}/>
      <Route path="/student" exact element={<StudentDisplay/>}/>
      <Route path='/addteacher' exact element={<AddTeacher/>}/>
      <Route path='/addstudent' exact element={<AddStudent/>}/>

    </Routes>
  </Router>
  );
}

export default App;
