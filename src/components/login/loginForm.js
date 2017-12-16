import React from "react";

import { Link } from "react-router-dom";

import { authenticationService } from "../services/serviceAuthentication";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initState();

        this.bindEventHandlers();
    }

    initState() {
        return {
            email: "",
            password: "",
            error: false
        };
    }

    bindEventHandlers() {
        this.handleInputChange = this.handleInputChange.bind(this);
        this.logIn = this.logIn.bind(this);
    }

    handleInputChange(event) {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            [name]: value,
            error: false
        });
    }

    handleNetworkRequestError(error) {
        if (error.response) {
            this.setState({ error: error.response.data.error.message });
        } else if (error.request) {
            this.setState({ error: "There is no response from server." });
        }
    }

    logIn(event) {
        event.preventDefault();

        const isValid = this.validateInput();

        if (isValid) {
            const { email, password } = this.state;

            const data = {
                username: email,
                password: password
            };

            authenticationService.logIn(data, error => this.handleNetworkRequestError(error));
        }
    }

    validateInput() {
        const { email, password } = this.state;

        if (!email) {
            this.setState({ error: "Please enter your email address." });
            return false;
        } else if (!email.includes("@")) {
            this.setState({ error: "A valid email address contains \"@\"." });
            return false;
        } else if (!password) {
            this.setState({ error: "Please enter your password." });
            return false;
        } else {
            return true;
        }
    }

    render() {
        return (
            <div className="form mx-auto p-4" style={{ width: 90 + "%" }}>
                <div>
                    <Link to="/login">
                        <button className="btn btn-dark mr-2 mb-2 active">Login</button>
                    </Link>
                    <Link to="/register">
                        <button className="btn btn-dark mb-2">Register</button>
                    </Link>
                </div>

                <form>
                    <div className="form-group">
                        <label>Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleInputChange}
                        />
                        <small
                            id="emailHelp"
                            className="form-text">
                            We will never share your email with anyone else.
                        </small>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleInputChange}
                        />
                    </div>

                    <div className="error">
                        {this.state.error
                            ? <p>{this.state.error}</p>
                            : <p></p>
                        }
                    </div>

                    <button type="submit" className="btn buttonDark" onClick={this.logIn}>Login</button>
                </form>
            </div>
        );
    }
}

export default LoginForm;