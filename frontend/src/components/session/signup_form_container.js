import { connect } from "react-redux";
import { signup } from "../../actions/session_actions";
import { checkUsername } from "../../actions/user_actions";
import SignupForm from "./signup_form";
import { openModal } from "../../actions/modal_actions";

const mapStateToProps = (state) => {
  return {
    signedIn: state.session.isSignedIn,
    errors: state.errors.session,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signup: (user) => dispatch(signup(user)),
    openModal: (type) => dispatch(openModal(type)),
    checkUsername: (username) => dispatch(checkUsername(username)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
