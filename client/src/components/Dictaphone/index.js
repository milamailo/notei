import React, { useEffect, useRef } from "react";
import { createSpeechlySpeechRecognition } from "@speechly/speech-recognition-polyfill";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "./index.css";

// appId MUST move to the .env file before repo being available to public
const appId = "fdc5337d-095d-42be-b1b0-11b8833365f1";
const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);

const Dictaphone = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true });

  const transcriptRef = useRef(null);

  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
      <div className="d-flex flex-row bg-test">
        <div>
          <h5 className="card-header bg-primary text-light p-2 m-1">
            Microphone: {listening ? "on" : "off"}
          </h5>
        </div>
        <div className="ml-auto ">
          <button className="bg-primary text-light p-2 m-1">keep it!</button>
          <button className="bg-primary text-light p-2 m-1">keep it!</button>
          <button className="bg-primary text-light p-2 m-1">keep it!</button>
          <button
            className="bg-primary text-light p-2 m-1"
            onClick={resetTranscript}
          >
            Reset
          </button>
        </div>
      </div>
      <div className="d-flex flex-col bg-primary">
        <div className="p-2 hight-text-area" ref={transcriptRef}>
          <p className="text-light">{transcript}</p>
        </div>
        <div className="p-2">
          <button
            className="bg-primary text-light p-2 p-test"
            onTouchStart={startListening}
            onMouseDown={startListening}
            onTouchEnd={SpeechRecognition.stopListening}
            onMouseUp={SpeechRecognition.stopListening}
          >
            Note it!
          </button>
        </div>
      </div>
    </div>
  );
};
export default Dictaphone;
