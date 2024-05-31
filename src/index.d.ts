// src/index.d.ts
declare module '@lanesky/audio-recorder-js' {
    export class AudioRecorder {
      constructor(workletNodeProcessorUrl: string);
      onCreateVisualizers: (analyserNode: AnalyserNode) => unknown[];
      onRecordingLengthUpdated: (len: string) => void;
      onRecordingStateChanged: (isRecording: boolean) => void;
      onRecordingMaxLenReached: () => void;
      onDownloadReady: (url: string) => void;
      initContext(): void;
      startRecording(): void;
      stopRecording(): void;
      isInitialized(): boolean;
      cleanup(): void;
    }
  
    export enum RecorderStates {
      IDLE,
      RECORDING,
      PAUSED,
      STOPPED
    }
  
    export interface RecordingProperties {
      sampleRate: number;
      channels: number;
      bitsPerSample: number;
    }
  }