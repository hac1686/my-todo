import React, { createContext, useState } from 'react'
import {
  BrowserRouter as Router,
   Switch,
    Route
   } from 'react-router-dom'
import TopMenu from './components/TopMenu'
import Home from './scenes/Home'
import Login from './scenes/Login'
import Signup from './scenes/Signup'
//import 'bootstrap/dist/css/bootstrap.min.css';
//import './App.css';

export const UserContext = createContext(null)


//putting menu outside the switch puts it on every page
function App() {
  const [user, setUser] = useState(null)
  return (
    <UserContext.Provider value={{ user, setUser }}>
   <Router>
     <TopMenu /> 
     <Switch>
       <Route path="/login" component={Login} />
       <Route path="/signup"  component={Signup}/>
       <Route path="/" component={Home} />
     </Switch>
   </Router>
   </UserContext.Provider>
  )
}

export default App;
