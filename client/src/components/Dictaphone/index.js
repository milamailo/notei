import React, { useEffect, useRef, useState } from "react";
import { createSpeechlySpeechRecognition } from "@speechly/speech-recognition-polyfill";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "./index.css";
import Backdrop from "../Backdrop/";
import { QUERY_ANALYZE } from "../../utils/queries";
import { useQuery } from "@apollo/client";

const appId = "fdc5337d-095d-42be-b1b0-11b8833365f1";
const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);

const Dictaphone = ({ user, btnBack, setShowAddNote }) => {
  const [loadingQuery, setLoadingQuery] = useState(false);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true });

  const transcriptRef = useRef(null);

  const { loading, data } = useQuery(QUERY_ANALYZE, {
    variables: {
      transcript: transcript,
    },
  });
  const handleSummerizeClick = async () => {
    setLoadingQuery(true); // Start loading the query

    try {
      await data.refetch(); // Refetch the query to get the latest data
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    setLoadingQuery(false); // Query loading is done
  };

  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <>
      <Backdrop onClick={btnBack} />
      <div className="root-dictphone">
        <div className="d-flex flex-row bg-test">
          <div>
            <h5 className="card-header bg-primary text-light p-2 m-1">
              Microphone: {listening ? "on" : "off"}
            </h5>
          </div>
          <div className="ml-auto ">
            <button
              className="bg-primary text-light p-2 m-1"
              onClick={handleSummerizeClick} // Call the function when the button is clicked
              disabled={loadingQuery} // Disable the button while query is loading
            >
              Summerize
            </button>
            <button className="bg-primary text-light p-2 m-1">
              Transcript
            </button>
            <button className="bg-primary text-light p-2 m-1">Keep it!</button>
            <button
              className="bg-primary text-light p-2 m-1"
              onClick={resetTranscript}
            >
              Reset
            </button>
            <button className="bg-danger text-white p-2 m-1" onClick={btnBack}>
              X
            </button>
          </div>
        </div>
        <div className="d-flex flex-col bg-primary">
          <div className="p-2 hight-text-area" ref={transcriptRef}>
            <p className="text-light">{transcript}</p>
          </div>
          <div className="p-2">
            <button
              className="bg-primary text-light p-2 btn-noteit"
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
    </>
  );
};
export default Dictaphone;
