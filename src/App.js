import React, { useState } from "react";
//import logo from './logo.svg';
import "./App.css";
//import TextInput from './TextInput.js';
import LoginButton from "./LoginButton.js";
import Boggle from "./boggle.js";

//import firebase from "firebase";

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1> Boggle </h1>
//         <Boggle></Boggle>
//       </header>
//     </div>
//   );
// }

function App() {
  const [user, setUser] = useState(null);

  if (user == null) {
    return (
      <div className="App">
        <header className="App-header">
          <h1> Boggle </h1>

          <LoginButton setUser={user => setUser(user)} />
        </header>
      </div>
    );
  } else {
    return (
      <div className="App">
        <header className="App-header">
          <h1> Playing Boggle as :{user.displayName}</h1>
          <div>
            <Boggle></Boggle>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
