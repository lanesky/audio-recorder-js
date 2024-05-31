// hooks/useAudioRecorder.ts

import { useEffect, useRef, useState } from "react";

import {AudioRecorder}  from "@lanesky/audio-recorder-js"

const useAudioRecorder = (createVisualizers: (analyserNode: AnalyserNode) => (unknown)[], workletNodeProcessorUrl =  './recording-processor.js') => {
  const audioRecorderRef = useRef<AudioRecorder | null>(null);
  const [dataLen, setDataLen] = useState("0");
    const [isInitialized, setIsInitialized] = useState(false);
    const [isMaxLenReached, setIsMaxLenReached] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
    const [audioFileUrl, setAudioFileUrl] = useState("");


  console.log("workletNodeProcessorUrl", workletNodeProcessorUrl);
  
  useEffect(() => {
      const audioRecorder = new AudioRecorder(workletNodeProcessorUrl);
      audioRecorder.onCreateVisualizers = createVisualizers;

    audioRecorder.onRecordingLengthUpdated = (len:string) => {
      setDataLen(len);
    };

      audioRecorder.onRecordingStateChanged = (isRecording:boolean) => {
      setIsRecording(isRecording);
    };

    audioRecorder.onRecordingMaxLenReached = () => {
      setIsMaxLenReached(true);
    };

    audioRecorder.onDownloadReady = (url:string) => {
      setAudioFileUrl(url);
    };
      

    audioRecorderRef.current = audioRecorder;

    return () => {
      // Optional cleanup method if needed
      audioRecorderRef.current?.cleanup();
    };
  }, [createVisualizers, workletNodeProcessorUrl]);

  const startRecording = () => {
    if (audioRecorderRef.current) {
      if (!audioRecorderRef.current.isInitialized()) {
          audioRecorderRef.current.initContext();
          setIsInitialized(true);
        
      } else {
        audioRecorderRef.current.startRecording();
      }
    }
  };

  const stopRecording = () => {
    if (audioRecorderRef.current) {
      audioRecorderRef.current.stopRecording();
    }
  };

  return {
      dataLen,
      isInitialized,
    isRecording,
    isMaxLenReached,
    audioFileUrl,
    startRecording,
    stopRecording,
  };
};

export default useAudioRecorder;
