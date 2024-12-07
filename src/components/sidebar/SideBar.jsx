/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import "./SideBar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const SideBar = () => {
  const [sidebarExtended, setSidebarExtended] = useState(false);
  const { onSent, previousPrompts, setRecentPrompt, newChat } =
    useContext(Context);

  return (
    <div className="sidebar">
      <div className="top">
        <img
          src={assets.menu_icon}
          alt="menu icon"
          className="menu"
          onClick={() => setSidebarExtended((prev) => !prev)}
        />

        <div className="new-chat" onClick={() => newChat()}>
          <img src={assets.plus_icon} alt="new chat icon" />
          {sidebarExtended ? <p>New Chat</p> : null}
        </div>

        {sidebarExtended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {previousPrompts.map((item, idx) => {
              return (
                <div
                  className="recent-entry"
                  key={idx}
                  onClick={() => {
                    onSent(item);
                    console.log(item);
                  }}
                >
                  <img src={assets.message_icon} alt="message icon" />
                  <p>{item.slice(0, 15)} ...</p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>

      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="question icon" />
          {sidebarExtended ? <p>Help</p> : null}
        </div>

        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="question icon" />
          {sidebarExtended ? <p>Activity</p> : null}
        </div>

        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="question icon" />
          {sidebarExtended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
