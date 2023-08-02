import React, { useState } from "react";
import axios from "axios";
import "./TextAnalyze.css";

export default function TextAnalyze() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const HTTP = "http://localhost:8080/text-analyze";

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${HTTP}`, { prompt })
      .then((res) => {
        setResponse(res.data);
        console.log(prompt);
      })
      .catch((error) => {
        console.log(error);
      });

    setPrompt("");
  };

  const handlePrompt = (e) => {
    setPrompt(e.target.value);
  };

  const nextLine = (res) => {
    const resArray = res.split(" ");
    const output = resArray.map((element) => {
      return <il>{element}</il>;
    });
    return res;
  };
  return (
    <div className="container container-sm p-1">
      {" "}
      <h1 className="title text-center text-darkGreen">Text Analyzer</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="">Past a Paragraph/ text to sumerize</label>
          <input
            className="shadow-sm"
            type="text"
            placeholder="Enter text"
            value={prompt}
            onChange={handlePrompt}
          />
        </div>{" "}
        <button className="btn btn-accept w-100" type="submit">
          Go
        </button>
      </form>
      <div className="bg-darkGreen  mt-2 p-1 border-5">
        <p className="text-light">
          <ul>{response ? nextLine(response) : <il>"waiting..."</il>}</ul>
        </p>
      </div>
    </div>
  );
}
