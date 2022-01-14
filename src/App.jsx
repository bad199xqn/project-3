import React, { Component } from "react";
import { Switch, BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";

// Import Routes
import { authProtectedRoutes, publicRoutes, auth } from "./routes";
import AppRoute from "./routes/route";

// layouts
import VerticalLayout from "./components/VerticalLayout";
import HorizontalLayout from "./components/HorizontalLayout";
import NonAuthLayout from "./components/NonAuthLayout";


// Import scss
import "./assets/scss/theme.scss";

// Import Firebase Configuration file
import { initFirebaseBackend } from "./helpers/authUtils";
import ExportToast from "./components/CommonForBoth/ExportToast";

const firebaseConfig = {
	apiKey: "AIzaSyCAv_XfmqDbqjKPIwDc7qo7xSRfM--696Y",
	authDomain: "vnalert-3453c.firebaseapp.com",
	databaseURL: "https://vnalert-3453c.firebaseio.com",
	projectId: "vnalert-3453c",
	storageBucket: "vnalert-3453c.appspot.com",
	messagingSenderId: "341282844516",
	appId: "1:341282844516:web:f2f45bb83e4f07bee4d471",
	measurementId: "G-19B14892YB"
};

// init firebase backend
initFirebaseBackend(firebaseConfig);

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.getLayout = this.getLayout.bind(this);
	}

	/**
	 * Returns the layout
	 */
	getLayout = () => {
		let layoutCls = VerticalLayout;

		switch (this.props.layout.layoutType) {
			case "horizontal":
				layoutCls = HorizontalLayout;
				break;
			default:
				layoutCls = VerticalLayout;
				break;
		}
		return layoutCls;
	};

	render() {
		const Layout = this.getLayout();

		return (
			<React.Fragment>
				<ExportToast/>
				<Router>
					<Switch>
						{/* {publicRoutes.map((route, idx) => (
							<AppRoute
								path={route.path}
								layout={NonAuthLayout}
								component={route.component}
								key={idx}
								isAuthProtected={false}
							/>
						))} */}

												{auth.map((route, idx) => (
							<AppRoute
								path={route.path}
								layout={NonAuthLayout}
								component={route.component}
								key={idx}
								isAuthProtected={false}
							/>
						))}

												{publicRoutes.map((route, idx) => (
							<AppRoute
							exact
								path={route.path}
								layout={Layout}
								component={route.component}
								key={idx}
								isAuthProtected={false}
							/>
						))}

						{authProtectedRoutes.map((route, idx) => (
							<AppRoute
								path={route.path}
								layout={Layout}
								component={route.component}
								key={idx}
								isAuthProtected={true}
							/>
						))}
					</Switch>
				</Router>
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		layout: state.Layout
	};
};

export default connect(mapStateToProps, null)(App);
