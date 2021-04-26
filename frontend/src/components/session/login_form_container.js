import { connect } from "react-redux";
import { login, signup } from "../../actions/session_actions";
import { checkUsername } from "../../actions/user_actions";
import LoginForm from "./login_form";
import { openModal } from "../../actions/modal_actions";

const mapStateToProps = (state) => {
  return {
    errors: state.errors.session,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user) => dispatch(login(user)),
    signup: (user) => dispatch(signup(user)),
    openModal: (type) => dispatch(openModal(type)),
    checkUsername: (username) => dispatch(checkUsername(username)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
