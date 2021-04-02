import React, { useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { useSpring, animated } from "react-spring";
import { closeModal } from "../../actions/modal_actions";
import LoginFormContainer from "../session/login_form_container";
import SignUpFromContainer from "../session/signup_form_container";
import "./modal.scss";

function Modal({ modal, closeModal }) {
  // const animation = useSpring({
  //   config: {
  //     duration: 250,
  //   },
  //   opacity: modal ? 1 : 0,
  //   transform: modal ? `translateY(0%)` : `translateY(-100%)`,
  // });

  // const escKeyPress = useCallback(
  //   (e) => {
  //     if (e.key === "Escape" && modal) {
  //       closeModal();
  //     }
  //   },
  //   [closeModal, modal]
  // );

  // useEffect(() => {
  //   document.addEventListener("keydown", escKeyPress);
  //   return () => document.removeEventListener("keydown", escKeyPress);
  // }, [escKeyPress]);

  if (!modal) {
    return null;
  }

  let component;
  switch (modal) {
    case "login":
      component = <LoginFormContainer />;
      break;
    case "signup":
      component = <SignUpFromContainer />;
      break;
    default:
      return null;
  }

  return (
    <div className="modal-background" onClick={closeModal}>
      <div className="modal-child" onClick={(e) => e.stopPropagation()}>
        {component}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    modal: state.ui.modal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
