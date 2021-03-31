import React, { useState, useEffect, useCallback } from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import { MdClose } from "react-icons/md";
import LoginFormContainer from "../session/login_form_container";
import SignUpFromContainer from "../session/signup_form_container";

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  width: 800px;
  height: 500px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 10;
  border-radius: 10px;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;
  p {
    margin-bottom: 1rem;
  }
  button {
    padding: 10px 24px;
    background: #141414;
    color: #fff;
    border: none;
  }
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;

export const Modal = ({ showModal, toggleModal }) => {
  const [formType, setFormType] = useState("login");

  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? `translateY(0%)` : `translateY(-100%)`,
  });

  const escKeyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showModal) {
        toggleModal(e);
      }
    },
    [toggleModal, showModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", escKeyPress);
    return () => document.removeEventListener("keydown", escKeyPress);
  }, [escKeyPress]);

  let renderForm;
  if (formType === "signup") {
    renderForm = (
      <>
        <SignUpFromContainer />
        <button onClick={() => setFormType("login")}>Login instead</button>
      </>
    );
  } else {
    renderForm = (
      <>
        <LoginFormContainer />
        <button onClick={() => setFormType("signup")}>Create account</button>
      </>
    );
  }

  return (
    <>
      {showModal ? (
        <Background onClick={toggleModal}>
          <animated.div style={animation}>
            <ModalWrapper>
              <ModalContent>{renderForm}</ModalContent>
              <CloseModalButton onClick={toggleModal} />
            </ModalWrapper>
          </animated.div>
        </Background>
      ) : null}
    </>
  );
};
