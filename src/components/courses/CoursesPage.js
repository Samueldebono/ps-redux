import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseAction";
import * as authorActions from "../../redux/actions/authorAction";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";
import { Redirect } from "react-router-dom";

class CoursesPage extends React.Component {
	state = {
		redirectToAddCoursePage: false,
	};

	componentDidMount() {
		const { authors, courses, actions } = this.props;

		if (courses.length === 0)
			actions.loadCourses().catch((error) => {
				alert("Loading course failed ---" + error);
			});

		if (authors.length === 0)
			actions.loadAuthors().catch((error) => {
				alert("Loading authoers failed ---" + error);
			});
	}
	render() {
		return (
			<>
				{this.state.redirectToAddCoursePage && <Redirect to="/course" />}
				<h2>Courses</h2>
				<button
					style={{ marginBottom: 20 }}
					className="btn btn-primary add-course"
					onClick={() => this.setState({ redirectToAddCoursePage: true })}
				>
					ADD COURSE
				</button>

				<CourseList courses={this.props.courses} />
			</>
		);
	}
}

CoursesPage.propTypes = {
	courses: PropTypes.array.isRequired,
	authors: PropTypes.array.isRequired,
	actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
	return {
		courses:
			state.authors.length === 0
				? []
				: state.courses.map((course) => {
						return {
							...course,
							authorName: state.authors.find((a) => a.id === course.authorId)
								.name,
						};
						// eslint-disable-next-line no-mixed-spaces-and-tabs
				  }),
		authors: state.authors,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: {
			loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
			loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
