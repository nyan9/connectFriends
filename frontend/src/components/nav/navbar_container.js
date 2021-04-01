import { connect } from "react-redux";
import { logout } from "../../actions/session_actions";
import NavBar from "./navbar";
import {getCurrUser} from "../../actions/user_actions"
const mapStateToProps = (state) => ({
  loggedIn: state.session.isAuthenticated,
  currentUser:state.session.user,
  user: state.rating
});

const mDTP = (dispatch) => ({
  getUser: (username) => dispatch(getCurrUser(username)),
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mDTP)(NavBar);
