//App.tsx

import React, { useCallback } from "react";
import logo from "./logo.svg";
import "./App.css";
import useAudioRecorder from "./hooks/useAudioRecorder";

function App() {
  const createVisualizers = useCallback((analyserNode: AnalyserNode) => {
    return [];
  }, []);
  const {
    dataLen,
    isInitialized,
    isRecording,
    isMaxLenReached,
    audioFileUrl,
    startRecording,
    stopRecording,
  } = useAudioRecorder(createVisualizers, "./recording-processor.js");

  const recordText = isMaxLenReached
    ? "Reached the maximum length of"
    : isInitialized
    ? "Continue"
    : "Start";

  return (
    <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
      <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
        <h1>AudioWorklet Recorder</h1>
        <p>
          A simple audio recorder built with AudioWorkletNode that can record up
          to 5 minutes and stops automatically. Upon completion, it provides a
          downloadable link for the recorded audio file (PCM Wave). It may take
          a few seconds to build and preview the recording. Click Refresh to
          start a new recording.
        </p>

        <div className="demo-box">
          <div id="recording">
            <div>
              <p>
                Length: <span id="data-len">{dataLen}</span>
                sec
              </p>
              <button
                onClick={startRecording}
                disabled={isRecording}
                id="record"
              >
                <span id="record-text">{recordText}</span> Recording
              </button>
              <button onClick={stopRecording} disabled={!isRecording} id="stop">
                Stop Recording
              </button>
              <a id="download-link" href={audioFileUrl}>
                <button disabled={isRecording} id="download-button">
                  Download File
                </button>
              </a>
            </div>

            <div className="recording-display">
              <canvas id="recording-canvas"></canvas>
              <canvas id="vu-meter"></canvas>
            </div>

            <audio
              src={audioFileUrl}
              id="player"
              className="w-full"
              controls
            ></audio>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
