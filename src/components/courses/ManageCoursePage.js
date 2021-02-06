import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseAction";
import * as authorActions from "../../redux/actions/authorAction";
import PropTypes, { func } from "prop-types";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";

function ManageCoursePage({
	authors,
	courses,
	loadCourses,
	loadAuthors,
	saveCourse,
	...props
}) {
	const [course, setCourse] = useState({ ...props.course });
	const [errors, setErrors] = useState({});

	useEffect(() => {
		if (courses.length === 0) {
			loadCourses().catch((error) => {
				alert("Loading course failed ---" + error);
			});
		} else {
			setCourse({ ...props.course });
		}

		if (authors.length === 0)
			loadAuthors().catch((error) => {
				alert("Loading authoers failed ---" + error);
			});
	}, [props.course]);

	function handleChange(event) {
		const { name, value } = event.target;
		setCourse((prevCourse) => ({
			...prevCourse,
			[name]: name === "authorId" ? parseInt(value, 10) : value,
		}));
	}

	function handleSubmit(event) {
		event.preventDefault();
		saveCourse(course).then(() => {
			history.push("/courses");
		});
	}

	return (
		<CourseForm
			course={course}
			errors={errors}
			authors={authors}
			onChange={handleChange}
			onSave={handleSubmit}
		/>
	);
}

ManageCoursePage.propTypes = {
	courses: PropTypes.array.isRequired,
	course: PropTypes.array.isRequired,
	authors: PropTypes.array.isRequired,
	loadAuthors: PropTypes.func.isRequired,
	loadCourses: PropTypes.func.isRequired,
	saveCourse: PropTypes.func.isRequired,
	errors: PropTypes.array,
	history: PropTypes.object.isRequired,
};

export function getCourseBySlug(course, slug) {
	return course.find((course) => course.slug === slug);
}

function mapStateToProps(state, ownProps) {
	const slug = ownProps.match.params.slug;
	const course =
		slug && state.courses.length > 0
			? getCourseBySlug(state.course, slug)
			: newCourse;

	return {
		course: course,
		courses: state.courses,
		authors: state.authors,
	};
}

const mapDispatchToProps = {
	loadCourses: courseActions.loadCourses,
	loadAuthors: authorActions.loadAuthors,
	saveCourse: courseActions.saveCourse,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
