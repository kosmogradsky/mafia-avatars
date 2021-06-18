import * as React from "react";
import {
  Reference,
  child,
  onValue,
  ref as dbRef,
  getDatabase,
  get,
} from "firebase/database";
import { ref, getStorage, getDownloadURL } from "firebase/storage";
import cx from "classnames";
import { Player } from "./Player";
import { PlayerRole } from "./PlayerRole";

const styles = require("./PlayerAvatar.css").default;
const mafiaPng = require("./mafia.png").default;
const sheriffPng = require("./sheriff.png").default;
const godfatherPng = require("./godfather.png").default;

export interface PlayerAvatarProps {
  index: number;
  firebaseRef: Reference;
}

interface PlayerAvatarState {
  downloadUrl: string;
  isDead: boolean;
  role: PlayerRole;
}

export class PlayerAvatar extends React.Component<
  PlayerAvatarProps,
  PlayerAvatarState
> {
  state: PlayerAvatarState = {
    downloadUrl: "",
    isDead: false,
    role: "civilian",
  };

  componentDidMount() {
    onValue(child(this.props.firebaseRef, "playerId"), (snapshot) => {
      get(child(dbRef(getDatabase(), "/profiles"), snapshot.val())).then(
        (doc) => {
          const player: Player = doc.val() as Player;

          getDownloadURL(ref(getStorage(), player.avatarUrl)).then(
            (downloadUrl) => {
              this.setState({ downloadUrl });
            }
          );
        }
      );
    });

    onValue(child(this.props.firebaseRef, "isDead"), (snapshot) => {
      this.setState({ isDead: !!snapshot.val() });
    });

    onValue(child(this.props.firebaseRef, "role"), (snapshot) => {
      this.setState({ role: snapshot.val() });
    });
  }

  render() {
    return this.state.downloadUrl === "" ? null : (
      <div
        className={cx(
          styles.playerAvatarContainer,
          this.state.isDead ? styles.playerDead : null
        )}
      >
        <div className={styles.playerIndex}>{this.props.index}</div>
        <img
          className={styles.playerAvatar}
          src={this.state.downloadUrl}
          alt=""
        />
        {this.state.role === "mafia" ? (
          <img className={styles.roleIcon} src={mafiaPng} alt="Mafia" />
        ) : null}
        {this.state.role === "godfather" ? (
          <img className={styles.roleIcon} src={godfatherPng} alt="Godfather" />
        ) : null}
        {this.state.role === "sheriff" ? (
          <img className={styles.roleIcon} src={sheriffPng} alt="Sheriff" />
        ) : null}
      </div>
    );
  }
}
