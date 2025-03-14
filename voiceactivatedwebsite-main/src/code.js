import React, { useState, useEffect } from "react";

const VoiceActivatedWebsite = () => {
  const [transcript, setTranscript] = useState("");
  const [listening, setListening] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Your browser does not support voice recognition.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          handleCommand(event.results[i][0].transcript.trim().toLowerCase());
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      setTranscript(interimTranscript);
    };

    recognition.onend = () => {
      setListening(false);
    };

    if (listening) {
      recognition.start();
    } else {
      recognition.stop();
    }

    return () => recognition.stop();
  }, [listening]);

  const handleCommand = (command) => {
    if (command.includes("scroll down")) {
      window.scrollBy({ top: 200, behavior: "smooth" });
    } else if (command.includes("scroll up")) {
      window.scrollBy({ top: -200, behavior: "smooth" });
    } else if (command.includes("name is")) {
      setName(command.replace("name is", "").trim());
    } else if (command.includes("email is")) {
      setEmail(command.replace("email is", "").trim());
    } else if (command.includes("message is")) {
      setMessage(command.replace("message is", "").trim());
    } else if (command.includes("submit form")) {
      alert("Form submitted successfully!");
    }
  };

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Voice-Activated Website</h1>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => setListening(!listening)}
      >
        {listening ? "Stop Listening" : "Start Listening"}
      </button>
      <p className="mt-2 text-gray-600">Say commands like "Scroll down", "Name is John"</p>
      <form className="mt-4">
        <input
          type="text"
          value={name}
          placeholder="Name"
          readOnly
          className="block border p-2 w-full mb-2"
        />
        <input
          type="email"
          value={email}
          placeholder="Email"
          readOnly
          className="block border p-2 w-full mb-2"
        />
        <textarea
          value={message}
          placeholder="Message"
          readOnly
          className="block border p-2 w-full mb-2"
        ></textarea>
      </form>
      <p className="mt-4 text-gray-500">Recognized Text: {transcript}</p>
    </div>
  );
};

export default VoiceActivatedWebsite;