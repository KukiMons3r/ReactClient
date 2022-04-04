import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./App.css";

const socket = io.connect("https://bens-test-node-app.herokuapp.com/");

function App() {
  const [State, SetState] = useState({
    message: "",
    name: "",
  });

  const [Chat, SetChat] = useState([]);

  useEffect(() => {
    socket.on("message", ({ name, message }) => {
      SetChat([...Chat, { name, message }]);
    });
  });

  const onTextChange = (e) => {
    SetState({ ...State, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const { name, message } = State;
    socket.emit("message", { name, message });
    SetState({ message: "", name });
  };

  return (
    <div className="App">
      <div className="card">
        <form onSubmit={onSubmit}>
          <h1>MessengerTest</h1>
          <div className="name-field">
            <textarea
              name="name"
              onChange={(e) => onTextChange(e)}
              value={State.name}
            ></textarea>
          </div>
          <div>
            <textarea
              name="message"
              onChange={(e) => onTextChange(e)}
              value={State.message}
            ></textarea>
          </div>
          <button>Send Message</button>
        </form>
        <div className="render-chat">
          <h1>Chat Log</h1>
          {Chat.map(({ name, message }, index) => {
            return (
              <div key={index}>
                <h3>
                  {name}: <span>{message}</span>
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
