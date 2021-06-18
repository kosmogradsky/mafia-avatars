import * as React from "react";
import { ref, getDatabase } from "firebase/database";
import { PlayerAvatar } from "./PlayerAvatar";

const styles = require("./Avatars.css").default;

export class Avatars extends React.Component {
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

  render() {
    return (
      <div className={styles.avatarsContainer}>
        <PlayerAvatar index={1} firebaseRef={this.firstFirebaseRef} />
        <PlayerAvatar index={2} firebaseRef={this.secondFirebaseRef} />
        <PlayerAvatar index={3} firebaseRef={this.thirdFirebaseRef} />
        <PlayerAvatar index={4} firebaseRef={this.fourthFirebaseRef} />
        <PlayerAvatar index={5} firebaseRef={this.fifthFirebaseRef} />
        <PlayerAvatar index={6} firebaseRef={this.sixthFirebaseRef} />
        <PlayerAvatar index={7} firebaseRef={this.seventhFirebaseRef} />
        <PlayerAvatar index={8} firebaseRef={this.eighthFirebaseRef} />
        <PlayerAvatar index={9} firebaseRef={this.ninthFirebaseRef} />
        <PlayerAvatar index={10} firebaseRef={this.tenthFirebaseRef} />
      </div>
    );
  }
}
