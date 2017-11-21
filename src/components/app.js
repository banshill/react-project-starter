import React from "react";
import LoginPage from "./login/loginPage";
import { Switch, Route } from "react-router-dom";

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <LoginPage />
        );
    }
}

export default App;
