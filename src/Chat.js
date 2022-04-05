import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({ socket, username, room }) {
  const [CurrentMessage, SetCurrentMessage] = useState("");
  const [MessageList, SetMessageList] = useState([]);

  const SendMessage = async () => {
    if (CurrentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: CurrentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      SetMessageList((list) => [...list, messageData]);
      SetCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive-message", (data) => {
      SetMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {MessageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type={"text"}
          value={CurrentMessage}
          placeholder="Hello..."
          onChange={(e) => {
            SetCurrentMessage(e.target.value);
          }}
          onKeyPress={(e) => {
            e.key === "Enter" && SendMessage();
          }}
        />
        <button onClick={SendMessage}>&#9658;</button>
      </div>
    </div>
  );
}
export default Chat;
