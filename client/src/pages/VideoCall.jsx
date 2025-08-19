import { useState, useRef } from "react";
import "./VideoCall.css";

function VideoCall() {
  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);

  const localVideo = useRef();
  const remoteVideo = useRef();

  const joinRoom = () => {
    if (!room) return;
    setJoined(true);
  };

  const leaveRoom = () => {
    setJoined(false);
    setRoom("");
  };

  return (
    <div className="videocall-container">
      {!joined ? (
        <div className="join-box">
          <h1>Join a Room</h1>
          <input
            type="text"
            placeholder="Enter Room ID"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <button onClick={joinRoom}>Join</button>
        </div>
      ) : (
        <div className="call-screen">
          {/* Videos */}
          <div className="video-section">
            <video ref={localVideo} autoPlay playsInline muted />
            <video ref={remoteVideo} autoPlay playsInline />
          </div>

          {/* Controls */}
          <div className="controls">
            <button onClick={() => setMicOn(!micOn)}>
              {micOn ? "Mute Mic" : "Unmute Mic"}
            </button>
            <button onClick={() => setCamOn(!camOn)}>
              {camOn ? "Turn Off Camera" : "Turn On Camera"}
            </button>
            <button className="leave" onClick={leaveRoom}>
              Leave Call
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoCall;
