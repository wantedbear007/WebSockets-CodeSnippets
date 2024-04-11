import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [mes, setMes] = useState<string>("");

  useEffect(() => {
    const socket: WebSocket = new WebSocket("ws://localhost:8080");

    socket.onopen = () => {
      console.log("Connected ");
    };

    socket.onmessage = (event: MessageEvent) => {
      console.log(event);
      console.log("message !" + event);

      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    setSocket(socket);

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div>
      {!socket ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <h1>Messages are</h1>
          {messages.map((msg, index) => (
            <h2 key={index}>Message is: {msg}</h2>
          ))}

          <label>Write your message </label>
          <input
            type="text"
            onChange={(e: any) => setMes(e.target.value)}
            placeholder="start typing your message"
          />
          <button onClick={() => socket.send(mes.toString())}>Send</button>
        </div>
      )}
    </div>
  );
}

export default App;
