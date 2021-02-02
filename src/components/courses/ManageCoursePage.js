import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseAction";
import * as authorActions from "../../redux/actions/authorAction";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";

function ManageCoursePage({
	authors,
	courses,
	loadCourses,
	loadAuthors,
	...props
}) {
	const [course, setCourse] = useState({ ...props.course });
	const [errors, setErrors] = useState({});

	useEffect(() => {
		if (courses.length === 0)
			loadCourses().catch((error) => {
				alert("Loading course failed ---" + error);
			});

		if (authors.length === 0)
			loadAuthors().catch((error) => {
				alert("Loading authoers failed ---" + error);
			});
	}, []);

	return <CourseForm course={course} errors={errors} authors={authors} />;
}

ManageCoursePage.propTypes = {
	courses: PropTypes.array.isRequired,
	course: PropTypes.array.isRequired,
	authors: PropTypes.array.isRequired,
	loadAuthors: PropTypes.func.isRequired,
	loadCourses: PropTypes.func.isRequired,
	errors: PropTypes.array,
};

function mapStateToProps(state) {
	return {
		courses: state.courses,
		authors: state.authors,
	};
}

const mapDispatchToProps = {
	loadCourses: courseActions.loadCourses,
	loadAuthors: authorActions.loadAuthors,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
