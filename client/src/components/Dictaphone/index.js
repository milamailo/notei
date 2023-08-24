import React, { useEffect, useRef, useState } from "react";
import { createSpeechlySpeechRecognition } from "@speechly/speech-recognition-polyfill";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "./index.css";
import Backdrop from "../Backdrop/";
import { QUERY_ANALYZE } from "../../utils/queries";
import { MUTATION_ADD_NOTE } from "../../utils/mutations";
import { useLazyQuery, useMutation } from "@apollo/client";
import  Auth  from "../../utils/auth";

const appId = "fdc5337d-095d-42be-b1b0-11b8833365f1";
const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);

const Dictaphone = ({ user, btnBack, setShowAddNote }) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true });

  const [dictphoneContainar, setDictphoneContainar] = useState(true);
  const [note, setNote] = useState({});

  const transcriptRef = useRef(null);
  const [addNote, { error }] = useMutation(MUTATION_ADD_NOTE, {
    context: {
      headers: {
        authorization: Auth.getToken() ? `Bearer ${Auth.getToken()}` : "",
      },
    },
  });

  const [getSummary, { called, loading, data }] = useLazyQuery(QUERY_ANALYZE, {
    variables: { transcript: transcript },
  });

  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  if (called && loading) {
    return <p>Loading ...</p>;
  }

  const summarizeTranscriptHandler = async (event) => {
    event.preventDefault();
    try {
      getSummary();
      const t = await data;
      console.log(t);
      setDictphoneContainar(false);
      return t;
    } catch (error) {
      throw new Error(`summarizeTranscriptHandler -> ${error}`);
    }
  };

  const resetTranscriptHandler = async (event) => {
    event.preventDefault();
    resetTranscript();
  };

  const transcriptHandler = async (event) => {
    event.preventDefault();
    setDictphoneContainar(true);
  };
  const saveTranscriptHandler = async (event) => {
    event.preventDefault();
    // setNote(await data.analyzer);
    // console.log(typeof data.analyzer, data.analyzer, note);
    try {
      const {
        data: {
          addNote: { _id },
        },
      } = await addNote({
        variables: {
          title: "data.analyzer.title",
          text: "data.analyzer.text",
          summery: "data.analyzer.summery",
        },
      });
      console.log("saveTranscriptHandler-> " + data);
    } catch (err) {
      console.error(err);
    }
  };

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
            {/* B start */}
            {called ? (
              // Show this button if the query has been called
              <button className="bg-primary text-light p-2 m-1">Summary</button>
            ) : (
              // Show this button if the query has not been called
              <button
                className="bg-primary text-light p-2 m-1"
                onClick={summarizeTranscriptHandler}
              >
                Summarize
              </button>
            )}
            <button
              className="bg-primary text-light p-2 m-1"
              onClick={transcriptHandler}
            >
              Transcript
            </button>
            <button
              className="bg-primary text-light p-2 m-1"
              onClick={saveTranscriptHandler}
            >
              Keep it!
            </button>
            <button
              className="bg-primary text-light p-2 m-1"
              onClick={resetTranscriptHandler}
            >
              Reset
            </button>
            <button className="bg-danger text-white p-2 m-1" onClick={btnBack}>
              X
            </button>
          </div>
        </div>
        {dictphoneContainar ? (
          <div>
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
        ) : (
          <div>
            <div className="d-flex flex-col bg-primary">
              <div className="p-2 hight-text-area">
                <p className="text-light">{data && data.analyzer.summery}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default Dictaphone;
