import React, { useState } from "react";
import io from "socket.io-client";
import "./App.css";
import Chat from "./Chat";

const socket = io.connect("https://bens-test-node-app.herokuapp.com");

function App() {
  const [Username, SetUsername] = useState("");
  const [Room, Setroom] = useState("");
  const [showChat, SetshowChat] = useState(false);

  const JoinRoom = () => {
    if (Username !== "" && Room !== "") {
      socket.emit("join_room", Room);
      SetshowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Chat</h3>
          <input
            type={"text"}
            placeholder="Név..."
            onChange={(e) => {
              SetUsername(e.target.value);
            }}
          />
          <input
            type={"text"}
            placeholder="Szoba száma..."
            onChange={(e) => {
              Setroom(e.target.value);
            }}
          />
          <button onClick={JoinRoom}>Csatlakozás</button>
        </div>
      ) : (
        <Chat socket={socket} username={Username} room={Room} />
      )}
    </div>
  );
}

export default App;
