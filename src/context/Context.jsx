/* eslint-disable no-unused-vars */
import { createContext, useState } from "react";
import runChat from "../config/gemini";
import DOMPurify from "dompurify";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [previousPrompts, setPreviousPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayParagraph = (idx, nextWord) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextWord);
    }, 20 * idx);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);

    let response;
    if (prompt !== undefined) {
      setRecentPrompt(prompt);
      response = await runChat(prompt);
    } else {
      setPreviousPrompts((prev) => [...prev, input]);
      setRecentPrompt(input);
      response = await runChat(input);
    }

    let formattedResponse = response.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>"); // Bold formatting
    formattedResponse = formattedResponse.replace(/\*\s/g, "<br>");
    const sanitizedResponse = DOMPurify.sanitize(formattedResponse);
    let responseArr = sanitizedResponse.split("");
    for (let idx = 0; idx < formattedResponse.length; idx++) {
      const nextWord = formattedResponse[idx];
      delayParagraph(idx, nextWord);
    }

    setLoading(false);
    setInput("");
  };

  const contextValue = {
    previousPrompts,
    setPreviousPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
    setShowResult,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
