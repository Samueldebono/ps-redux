import React from "react";
import HomePage from "./home/HomePage";
import AboutPage from "./about/AboutPage";
import CoursesPage from "./courses/CoursesPage";
import NotFoundPage from "./NotFoundPage";
import Header from "./common/Header";
import { Route, Switch, Redirect } from "react-router-dom";

function App() {
	return (
		<div className="container-fluid">
			<Header />
			<Switch>
				<Route path="/" exact component={HomePage} />
				<Route path="/about" component={AboutPage} />
				<Route path="/courses" component={CoursesPage} />
				<Redirect from="/about-page" to="/about" />
				<Route component={NotFoundPage} />
			</Switch>
		</div>
	);
}

export default App;
