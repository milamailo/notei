import React, { useState } from "react";
import axios from "axios";

export default function TextAnalyze() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const HTTP = "http://localhost:8080/text-analyze";
  return <div>OpenAi</div>;
}
