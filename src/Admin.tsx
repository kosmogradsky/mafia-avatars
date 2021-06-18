import * as React from "react";
import { getDatabase, ref, get } from "firebase/database";
import { PlayerWithId } from "./Player";
import { PlayerControls } from "./PlayerControls";

const styles = require("./Admin.css").default;

interface AdminState {
  players: PlayerWithId[];
}

export class Admin extends React.Component<{}, AdminState> {
  state: AdminState = { players: [] };
  firstFirebaseRef = ref(getDatabase(), "/players/first");
  secondFirebaseRef = ref(getDatabase(), "/players/second");
  thirdFirebaseRef = ref(getDatabase(), "/players/third");
  fourthFirebaseRef = ref(getDatabase(), "/players/fourth");
  fifthFirebaseRef = ref(getDatabase(), "/players/fifth");
  sixthFirebaseRef = ref(getDatabase(), "/players/sixth");
  seventhFirebaseRef = ref(getDatabase(), "/players/seventh");
  eighthFirebaseRef = ref(getDatabase(), "/players/eighth");
  ninthFirebaseRef = ref(getDatabase(), "/players/ninth");
  tenthFirebaseRef = ref(getDatabase(), "/players/tenth");

  componentDidMount() {
    get(ref(getDatabase(), "/profiles")).then((snapshot) => {
      const players: PlayerWithId[] = [];

      snapshot.forEach((doc) => {
        players.push({
          id: doc.key,
          ...doc.val(),
        } as PlayerWithId);
      });

      this.setState({ players });
    });
  }

  render() {
    return (
      <div className={styles.adminContainer}>
        <PlayerControls
          index={1}
          firebaseRef={this.firstFirebaseRef}
          players={this.state.players}
        />
        <PlayerControls
          index={2}
          firebaseRef={this.secondFirebaseRef}
          players={this.state.players}
        />
        <PlayerControls
          index={3}
          firebaseRef={this.thirdFirebaseRef}
          players={this.state.players}
        />
        <PlayerControls
          index={4}
          firebaseRef={this.fourthFirebaseRef}
          players={this.state.players}
        />
        <PlayerControls
          index={5}
          firebaseRef={this.fifthFirebaseRef}
          players={this.state.players}
        />
        <PlayerControls
          index={6}
          firebaseRef={this.sixthFirebaseRef}
          players={this.state.players}
        />
        <PlayerControls
          index={7}
          firebaseRef={this.seventhFirebaseRef}
          players={this.state.players}
        />
        <PlayerControls
          index={8}
          firebaseRef={this.eighthFirebaseRef}
          players={this.state.players}
        />
        <PlayerControls
          index={9}
          firebaseRef={this.ninthFirebaseRef}
          players={this.state.players}
        />
        <PlayerControls
          index={10}
          firebaseRef={this.tenthFirebaseRef}
          players={this.state.players}
        />
      </div>
    );
  }
}
