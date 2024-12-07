/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
    setPreviousPrompts,
    newChat,
    setShowResult,
  } = useContext(Context);

  const [currentUser, setCurrentUser] = useState(null);
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleSignOutClick = () => {
    closeModal();
    handleSignOut();
  };

  const handleSignIn = () => {
    if (email.trim()) {
      setCurrentUser(email.trim());
      localStorage.setItem("userEmail", email.trim());
      setEmail("");
      setShowModal(false); // Close modal after sign-in
    }
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    localStorage.removeItem("userEmail");

    setPreviousPrompts([]);
    setInput("");
    setShowResult(false);

    newChat();
    setShowModal(false); // Close modal after sign-out
  };

  const closeModal = () => {
    setShowModal(false); // Close modal
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setCurrentUser(storedEmail);
    }
  }, [setCurrentUser]);

  const handleCardClick = (prompt) => {
    setPreviousPrompts((prev) => [...prev, prompt]);
    onSent(prompt);
  };

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini 2.0</p>
        {currentUser ? (
          <div
            className="user-icon"
            onClick={() => setShowModal(true)}
            title={`Signed in as ${currentUser}`}
          >
            {currentUser[0].toUpperCase()}
          </div>
        ) : (
          <div
            className="user-icon"
            onClick={() => setShowModal(true)}
            title="Sign In"
          >
            U
          </div>
        )}
      </div>

      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, </span>
                <p>How can I help you today?</p>
              </p>
            </div>
            <div className="cards">
              {[
                {
                  prompt: "Suggest beautiful places to see on a upcoming trip",
                  icon: assets.compass_icon,
                },
                {
                  prompt: "Briefly summarize this concept: urban planning",
                  icon: assets.bulb_icon,
                },
                {
                  prompt:
                    "Brainstorm team bonding activities for our work retreat",
                  icon: assets.message_icon,
                },
                {
                  prompt: "Improve the reliability of the following code",
                  icon: assets.code_icon,
                },
              ].map((card, index) => (
                <div
                  className="card"
                  key={index}
                  onClick={() => handleCardClick(card.prompt)}
                >
                  <p>{card.prompt}</p>
                  <img src={card.icon} alt="icon" />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              {currentUser ? (
                <div
                  className="user-icon"
                  onClick={() => setShowModal(true)}
                  title={`Signed in as ${currentUser}`}
                >
                  {currentUser[0].toUpperCase()}
                </div>
              ) : (
                <div
                  className="user-icon"
                  onClick={() => setShowModal(true)}
                  title="Sign In"
                >
                  U
                </div>
              )}
              <p>{recentPrompt}</p>
            </div>

            <div className="result-data">
              <img src={assets.gemini_icon} alt="gemini icon" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              type="text"
              placeholder="Ask anything ..."
              onChange={(event) => setInput(event.target.value)}
              value={input}
            />
            <div>
              <img src={assets.gallery_icon} alt="gallery icon" />
              <img src={assets.mic_icon} alt="mic icon" />
              {input ? (
                <img
                  src={assets.send_icon}
                  alt="send icon"
                  onClick={() => onSent()}
                />
              ) : null}
            </div>
          </div>
          <p className="bottom-info">
            Gemini 2.0 may display inaccurate info, including about people, so
            double check its responses. Your privacy and Gemini Apps
          </p>
        </div>
      </div>

      {/* Modal for Sign In / Sign Out */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            {/* Close button at the top right */}

            {currentUser ? (
              <div className="sign-out">
                <img
                  src={assets.close_icon}
                  alt="close icon"
                  className="close-modal"
                  onClick={handleSignOutClick}
                />
                <h3>Signed in as {currentUser}</h3>
                <button onClick={handleSignOut}>Sign Out</button>
              </div>
            ) : (
              <div className="sign-in">
                <img
                  src={assets.close_icon}
                  alt="close icon"
                  className="close-modal"
                  onClick={closeModal}
                />
                <h3>Sign In</h3>
                <input
                  type="email"
                  placeholder="Enter your email..."
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <button onClick={handleSignIn}>Sign in</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
