import React from "react";
import HomePage from "./home/HomePage";
import AboutPage from "./about/AboutPage";
import CoursesPage from "./courses/CoursesPage";
import ManageCoursePage from "./courses/ManageCoursePage";
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
				<Route path="/course/:slug" component={ManageCoursePage} />
				<Route path="/courses" component={ManageCoursePage} />
				<Redirect from="/about-page" to="/about" />
				<Route component={NotFoundPage} />
			</Switch>
		</div>
	);
}

export default App;
