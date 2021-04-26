import { connect } from "react-redux";
import { logout } from "../../actions/session_actions";
import { openModal, closeModal } from "../../actions/modal_actions";
import NavBar from "./navbar";
import { getCurrUser, deleteUser } from "../../actions/user_actions";

const mapStateToProps = (state) => ({
  loggedIn: state.session.isAuthenticated,
  currentUser: state.session.user,
  user: state.rating,
});

const mapDispatchToProps = (dispatch) => ({
  getUser: (username) => dispatch(getCurrUser(username)),
  openModal: (type) => dispatch(openModal(type)),
  closeModal: () => dispatch(closeModal),
  logout: () => dispatch(logout()),
  resetRating: () => dispatch(deleteUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
