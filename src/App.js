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

  return (
    <div className="App">
      <header className="App-header">
        <LoginButton setUser={user => setUser(user)} />
        {user != null && (
          <p>
            Welcome, {user.displayName} ({user.email})
          </p>
        )}
        <h1> Boggle </h1>
        <Boggle></Boggle>
      </header>
    </div>
  );
}

export default App;
