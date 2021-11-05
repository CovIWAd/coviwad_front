import React from "react";
import logo from "../../logo.png";

export class Register extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="base-container" ref={this.props.containerRef}>
                <div className="content">
                    <div className="image">
                        <img src={logo} />
                    </div>
                    <div className="form">
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" name="username" placeholder="username" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="first_name">First name</label>
                            <input type="text" name="first_name" placeholder="first name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="last_name">Last name</label>
                            <input type="text" name="last_name" placeholder="last name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="text" name="email" placeholder="email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone_number">Phone number</label>
                            <input type="text" name="phone_number" placeholder="phone number name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="text" name="password" placeholder="password" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmation_password">Confirm password</label>
                            <input type="text" name="confirmation_password" placeholder="password" />
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <button type="button" className="btn">
                        Register
                    </button>
                </div>
            </div>
        );
    }
}