import React, { createContext, useState } from 'react'
import {
  BrowserRouter as Router,
   Switch,
    Route
   } from 'react-router-dom'
import firebase from 'firebase'
import TopMenu from './components/TopMenu'
import Home from './scenes/Home'
import Login from './scenes/Login'
import Signup from './scenes/Signup'
import { firebaseConfig } from './fbConfig'
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
//import './App.css';

firebase.initializeApp(firebaseConfig) //using method from library and pass it our config
const fbAuth = firebase.auth()


export const UserContext = createContext(null)


//putting menu outside the switch puts it on every page
function App() {
  const [user, setUser] = useState(null)
  return (
                                //fbAuth is available anywhere in the application from here
    <UserContext.Provider value={{ user, setUser, fbAuth }}> 
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
