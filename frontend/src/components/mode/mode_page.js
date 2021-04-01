import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { resetChat } from "../../actions/chat_actions";
import "./mode_page.scss";

class ModePage extends React.Component {
  componentDidMount() {
    this.props.resetChat();
  }
  render() {
    return (
      <section class="card-list">
        <article class="card">
          <header class="card-header">
            <h2>2 Player</h2>
          </header>

          <div class="card-logo">
            <img src="%PUBLIC_URL%/../single2.svg" width="300" height="300" />
          </div>

          <div class="card-button">
            <Link to="/local">Play</Link>
          </div>
        </article>

        <article class="card">
          <header class="card-header">
            <h2>1 Player vs AI</h2>
          </header>

          <div class="card-logo">
            <img src="%PUBLIC_URL%/../alien.svg" width="300" height="300" />
          </div>

          <div class="card-button">
            <Link to="/cpu">Play</Link>
          </div>
        </article>

        <article class="card">
          <header class="card-header">
            <h2>Online Multiplayer</h2>
          </header>

          <div class="card-logo">
            <img src="%PUBLIC_URL%/../online1.svg" width="300" height="300" />
          </div>

          <div class="card-button">
            <Link to="/online">Play</Link>
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
