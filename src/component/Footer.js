import React from "react";
import { AiFillTwitterCircle } from "react-icons/ai";
import {
  RiTelegramFill,
  RiDiscordFill,
  RiFacebookCircleFill,
  RiInstagramFill,
  RiRedditFill,
} from "react-icons/ri";
// import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div className="pp-footer">
      <div className="container">
        <div className="d-flex justify-content-between">
          <div className="text-muted">
            Copyright © 2023. All Rights Reserved by BSCPad
          </div>
          <div className="text-muted">v1.3.4</div>
          <div className="text-end pp-footer-link">
            <a target="_blank" href="#">
              Privacy Policy{" "}
            </a>
            <a target="_blank" href="#">
              Terms of Use
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
