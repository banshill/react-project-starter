import React from "react";

import { Link } from "react-router-dom";

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.initState();
        this.bindEventHandlers();

    }

    initState(){
        return{
            fullName: "",
            email: "",
            password: ""
        };

    }

    bindEventHandlers() {
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            [name]: value
        });
    }

    register() {
        event.preventDefault();
        
    }

    render() {
        return (
            <main>
                <div>
                    <Link to="/login"><button>Login</button></Link>
                    <Link to="/register"><button>Register</button></Link>
                </div>
                <form>
                    <input type="text" name="fullName" placeholder="Full Name" value={this.state.fullName} onChange={this.handleInputChange} />
                    <input type="email" name="email" placeholder="Email Address" value={this.state.email} onChange={this.handleInputChange} />
                    <input type="password" name="password" placeholder="Min 6 characters" value={this.state.password} onChange={this.handleInputChange} />
                    <input type="submit" value="Register" onClick={this.register} />
                </form>
            </main>
        );


    }



}

export default RegisterForm;