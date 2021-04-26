import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { resetChat } from "../../actions/chat_actions";
import "./mode_page.scss";
import { FaPlay } from "react-icons/fa";

class ModePage extends React.Component {
  componentDidMount() {
    this.props.resetChat();
  }
  render() {
    return (
      <section className="card-list">
        <article className="card">
          <header className="card-header">
            <h2>You vs you</h2>
          </header>

          <div className="card-logo">
            <img src="%PUBLIC_URL%/../single2.svg" width="250" height="250" />
          </div>

          <div className="card-button">
            <Link to="/local">
              <FaPlay />
            </Link>
          </div>
        </article>

        <article className="card">
          <header className="card-header">
            <h2>You vs AI</h2>
          </header>

          <div className="card-logo">
            <img src="%PUBLIC_URL%/../alien.svg" width="250" height="250" />
          </div>

          <div className="card-button">
            <Link to="/cpu">
              <FaPlay />
            </Link>
          </div>
        </article>

        <article className="card">
          <header className="card-header">
            <h2>Online Multiplayer</h2>
          </header>

          <div className="card-logo">
            <img src="%PUBLIC_URL%/../online1.svg" width="250" height="250" />
          </div>

          <div className="card-button">
            <Link to="/online">
              <FaPlay />
            </Link>
          </div>
        </article>
      </section>
    );
  }
}

const mDTP = (dispatch) => {
  return {
    resetChat: () => dispatch(resetChat()),
  };
};

export default connect(null, mDTP)(ModePage);
