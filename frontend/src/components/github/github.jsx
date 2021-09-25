import React from "react";
import "./github.scss";
import { FaGithub } from "react-icons/fa";
import { DiGithubFull } from "react-icons/di";

const Github = () => {
  return (
    <div className='github'>
      <div className='github__bg'></div>
      <div className='github__button'>
        <a
          href='https://github.com/nyan9/connectFriends#readme'
          target='_blank'
        >
          <DiGithubFull className='github__icon' />
        </a>
      </div>
    </div>
  );
};

export default Github;
