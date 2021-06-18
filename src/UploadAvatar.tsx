import * as React from "react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { set, ref as dbRef, getDatabase, push } from "firebase/database";

const styles = require("./UploadAvatar.css").default;

interface UploadAvatarState {
  nickname: string;
  avatar: File | undefined;
  message: string;
}

export class UploadAvatar extends React.Component<{}, UploadAvatarState> {
  fileInputRef = React.createRef<HTMLInputElement>();
  state: UploadAvatarState = {
    nickname: "",
    avatar: undefined,
    message:
      "Здесь появится сообщение об успехе, после того как вы нажмете на кнопку.",
  };

  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (this.state.nickname === "") {
      this.setState({ message: "Ник игрока нельзя оставить пустым." });
      return;
    }

    if (this.state.avatar === undefined) {
      this.setState({
        message:
          "Вы не загрузили аварку игрока. Проверьте поле «Аватарка игрока».",
      });
      return;
    }

    try {
      const snapshot = await uploadBytes(
        ref(getStorage(), this.state.avatar.name),
        this.state.avatar
      );

      const downloadUrl = await getDownloadURL(snapshot.ref);

      await push(dbRef(getDatabase(), "/profiles"), {
        nickname: this.state.nickname,
        avatarUrl: downloadUrl,
      });

      this.setState({ nickname: "", message: "Вы успешно добавили игрока." });
      if (this.fileInputRef.current) {
        this.fileInputRef.current.value = "";
      }
    } catch (err) {
      console.error(err);

      this.setState({
        message:
          "Во время загрузки данных на сервер произошла ошибка. Попробуйте ещё раз.",
      });
    }
  };

  render() {
    return (
      <>
        <form action="" onSubmit={this.handleSubmit}>
          <label className={styles.label}>
            <span>Ник игрока: </span>
            <input
              type="text"
              value={this.state.nickname}
              onChange={(event) =>
                this.setState({ nickname: event.target.value })
              }
            />
          </label>
          <label className={styles.label}>
            <span>Аватарка игрока: </span>
            <input
              ref={this.fileInputRef}
              type="file"
              accept="image/png, image/jpeg"
              onChange={(event) =>
                this.setState({ avatar: event.target.files?.[0] })
              }
            />
          </label>
          <button type="submit">Добавить игрока</button>
        </form>
        <div className={styles.message}>{this.state.message}</div>
      </>
    );
  }
}
