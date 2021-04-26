import React from "react";
import { connect } from "react-redux";
import { getUser } from "../../actions/user_actions";
import "./leaderstyle.scss";
import { CgCrown } from "react-icons/cg";

import { RiVipCrownFill, RiVipCrownLine } from "react-icons/ri";

class Leaderboard extends React.Component {
  componentDidMount() {
    this.props.getUsers();
  }
  render() {
    let leaderboard = "";
    let n = 0;
    if (this.props.users) {
      let sorted = this.props.users.sort((a, b) => b.elo - a.elo);
      //    let sorted = {}
      //    this.props.users.forEach( user => {
      //        sorted[user.elo] = user
      //    })
      leaderboard = (
        <div>
          {sorted.map((user, idx) => {
            let leaderboardInfo =
              idx === 0
                ? "leaderboard-info-top1"
                : idx === 1
                ? "leaderboard-info-top2"
                : idx === 2
                ? "leaderboard-info-top3"
                : "leaderboard-info1";
            {
              n += 1;
            }
            return (
              <div
                key={idx}
                className={leaderboardInfo}
                style={{
                  display: "flex",
                  // justifyContent:'space-between',
                  marginTop: "5px",
                }}
              >
                <div className="rankers">
                  {idx === 0 ? (
                    <RiVipCrownFill className="crown" />
                  ) : idx === 1 ? (
                    <RiVipCrownLine className="crown" />
                  ) : idx === 2 ? (
                    <CgCrown className="crown" />
                  ) : (
                    ""
                  )}
                  <div className="ranks">{n}.</div>
                </div>
                <div className="usernames">{user.username}</div>
                <div className="ratings">{user.elo}</div>
              </div>
            );
          })}
        </div>
      );
    }

    return (
      <div className="outer-leaderboard">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontWeight: "bold",
          }}
        >
          <div className="LinfoI">Ranking</div>
          <div className="LinfoU"></div>
          <div className="LinfoR">Rating</div>
        </div>
        <div style={{ marginTop: "10px" }}>{leaderboard}</div>
      </div>
    );
  }
}

const mSTP = (state) => {
  return {
    users: Object.values(state.users),
  };
};

const mDTP = (dispatch) => {
  return {
    getUsers: () => dispatch(getUser()),
  };
};

export default connect(mSTP, mDTP)(Leaderboard);
