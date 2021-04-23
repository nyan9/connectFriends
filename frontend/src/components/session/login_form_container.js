import { connect } from "react-redux";
import { login } from "../../actions/session_actions";
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
    openModal: (type) => dispatch(openModal(type)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
