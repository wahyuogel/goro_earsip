import React, { Component } from "react";
import { authService } from "../services/auth";
import {
	Col,
	Row,
	Form,
	Card,
	Button,
	FormCheck,
	Container,
	InputGroup,
} from "@themesberg/react-bootstrap";
import BgImage from "../assets/img/illustrations/signin.svg";

class SignIn extends Component {
	constructor(props) {
		super(props);

		authService.logout();

		this.state = {
			username: "",
			password: "",
			submitted: false,
			loading: false,
			error: "",
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	}

	handleSubmit(e) {
		e.preventDefault();

		this.setState({ submitted: true });
		const { username, password } = this.state;
		// stop here if form is invalid
		if (!(username && password)) {
			return;
		}

		this.setState({ loading: true });
		authService.login(username, password).then(
			(user) => {
				const { from } = this.props.location.state || {
					from: { pathname: "/cari-dokumen" },
				};
				this.props.history.push(from);
			},
			(error) => this.setState({ error, loading: false })
		);
	}

	render() {
		const { username, password, submitted, loading, error } = this.state;
		return (
			<section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
				<Container>
					<Row
						className="justify-content-center form-bg-image"
						style={{ backgroundImage: `url(${BgImage})` }}
					>
						<Col
							xs={12}
							className="d-flex align-items-center justify-content-center"
						>
							<div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
								<div className="text-center text-md-center mb-4 mt-md-0">
									<h3 className="mb-0">
										Login ke Sistem Informasi Manajemen E-Arsip Bidang
										Preservasi BBPJN Kaltim
									</h3>
								</div>
								<form name="form" onSubmit={this.handleSubmit}>
									<div
										className={
											"form-group" +
											(submitted && !username ? " has-error" : "")
										}
									>
										<label htmlFor="username">Username</label>
										<input
											type="text"
											className="form-control"
											name="username"
											value={username}
											onChange={this.handleChange}
										/>
										{submitted && !username && (
											<div className="help-block">Username is required</div>
										)}
									</div>
									<div
										className={
											"form-group" +
											(submitted && !password ? " has-error" : "")
										}
									>
										<label htmlFor="password">Password</label>
										<input
											type="password"
											className="form-control"
											name="password"
											value={password}
											onChange={this.handleChange}
										/>
										{submitted && !password && (
											<div className="help-block">Password is required</div>
										)}
									</div>
									<br />
									<div className="form-group">
										<button className="btn btn-primary" disabled={loading}>
											Login
										</button>
										{loading && (
											<img
												alt="loading"
												src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
											/>
										)}
									</div>
									{error && <div className={"alert alert-danger"}>{error}</div>}
								</form>
							</div>
						</Col>
					</Row>
				</Container>
			</section>
		);
	}
}

export default SignIn;
