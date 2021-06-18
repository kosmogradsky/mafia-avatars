import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Admin } from "./Admin";
import { Avatars } from "./Avatars";
import { UploadAvatar } from "./UploadAvatar";

export class Main extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/upload-avatar">
            <UploadAvatar />
          </Route>
          <Route path="/">
            <Avatars />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}
