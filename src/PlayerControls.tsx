import * as React from "react";
import { Reference, child, set, onValue } from "firebase/database";
import { PlayerWithId } from "./Player";
import { PlayerRole } from "./PlayerRole";

const styles = require("./PlayerControls.css").default;

interface PlayerControlsState {
  selectedPlayer: string | null;
  role: PlayerRole;
  isDead: boolean;
}

export interface PlayerControlsProps {
  players: PlayerWithId[];
  index: number;
  firebaseRef: Reference;
}

export class PlayerControls extends React.Component<
  PlayerControlsProps,
  PlayerControlsState
> {
  state: PlayerControlsState = {
    selectedPlayer: null,
    role: "civilian",
    isDead: false,
  };

  onPlayerIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    set(child(this.props.firebaseRef, "playerId"), event.target.value);
  };

  onPlayerRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    set(child(this.props.firebaseRef, "role"), event.target.value);
  };

  onDeathToggle = () => {
    set(child(this.props.firebaseRef, "isDead"), !this.state.isDead);
  };

  componentDidMount() {
    onValue(child(this.props.firebaseRef, "playerId"), (snapshot) => {
      this.setState({ selectedPlayer: snapshot.val() });
    });

    onValue(child(this.props.firebaseRef, "role"), (snapshot) => {
      const value: PlayerRole = snapshot.val();

      if (
        value === "civilian" ||
        value === "godfather" ||
        value === "mafia" ||
        value === "sheriff"
      ) {
        this.setState({ role: value });
      }
    });

    onValue(child(this.props.firebaseRef, "isDead"), (snapshot) => {
      this.setState({ isDead: !!snapshot.val() });
    });
  }

  render() {
    return (
      <div className={styles.controlsContainer}>
        <div>Игрок {this.props.index}</div>
        {this.state.selectedPlayer === null ? null : (
          <label className={styles.controlLabel}>
            <span>Аватарка: </span>
            <select
              onChange={this.onPlayerIdChange}
              value={this.state.selectedPlayer}
            >
              {this.props.players.map((player) => (
                <option key={player.id} value={player.id}>
                  {player.nickname}
                </option>
              ))}
            </select>
          </label>
        )}
        <label className={styles.controlLabel}>
          <span>Роль: </span>
          <select onChange={this.onPlayerRoleChange} value={this.state.role}>
            <option value="mafia">Мафия</option>
            <option value="godfather">Дон</option>
            <option value="sheriff">Шериф</option>
            <option value="civilian">Мирный</option>
          </select>
        </label>
        <label className={styles.controlLabel}>
          <span>Мертв: </span>
          <input
            type="checkbox"
            checked={this.state.isDead}
            onChange={this.onDeathToggle}
          />
        </label>
      </div>
    );
  }
}
