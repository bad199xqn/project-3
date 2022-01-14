import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector  } from "react-redux";

//AUTH related methods
import { getFirebaseBackend } from "../helpers/authUtils";

const AppRoute = ({
	component: Component,
	layout: Layout,
	isAuthProtected,
	...rest
}) => {
	const loginKey = useSelector((state) => state.Login.userKey)

		return(
			<Route
			{...rest}
			render={props => {

				if (isAuthProtected && (loginKey == undefined)) {
					return (
						<Redirect to={{ pathname: "/login", state: { from: props.location } }} />
					);
				}

				return (
					<Layout>
						<Component {...props} />
					</Layout>
				);
			}}
		/>
		)
		};

export default AppRoute;

