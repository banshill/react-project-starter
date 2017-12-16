import React from "react";
import { Switch, Route } from "react-router-dom";

import { authenticationService } from "./services/serviceAuthentication";

import { LoginPage } from "./login/loginPage";
import { MainPage } from "./common/mainPage";

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const isAuthenticated = authenticationService.isAuthenticated();

        if (isAuthenticated) {
            return <MainPage />;
        } else {
            return <LoginPage />;
        }
    }
}

export default App;
