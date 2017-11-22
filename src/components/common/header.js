import React from "react";

import {authenticationService} from "../services/serviceAuthentication";
 
class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    logOut() {
        authenticationService.logOut();
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">BitBook</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Main <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Feed</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Contact</a>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-outline-success my-2 my-sm-0 " onClick={this.logOut} >Logout</button>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Header;