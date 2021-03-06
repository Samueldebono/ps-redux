import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseAction";
import * as authorActions from "../../redux/actions/authorAction";
import PropTypes, { func } from "prop-types";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

function ManageCoursePage({
	authors,
	courses,
	loadCourses,
	loadAuthors,
	saveCourse,
	history,
	...props
}) {
	const [course, setCourse] = useState({ ...props.course });
	const [errors, setErrors] = useState({});
	const [saving, setSaving] = useState(false);

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

	function formIsValid() {
		const { title, authorId, category } = course;
		const errors = {};

		if (!title) errors.title = "Title is required.";
		if (!authorId) errors.author = "Author is required";
		if (!category) errors.category = "Category is required";

		setErrors(errors);
		// Form is valid if the errors object still has no properties
		return Object.keys(errors).length === 0;
	}

	function handleSubmit(event) {
		event.preventDefault();
		if (!formIsValid) return;
		setSaving(true);
		saveCourse(course)
			.then(() => {
				toast.success("Course Saved.");
				history.push("/courses");
			})
			.catch((error) => {
				setSaving(false);
				setErrors({ onSave: error.message });
			});
	}

	return authors.length === 0 || courses.length === 0 ? (
		<Spinner />
	) : (
		<CourseForm
			course={course}
			errors={errors}
			authors={authors}
			onChange={handleChange}
			onSave={handleSubmit}
			saving={saving}
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

export function getCourseBySlug(courses, slug) {
	return courses.find((course) => course.slug === slug) || null;
}

function mapStateToProps(state, ownProps) {
	const slug = ownProps.match.params.slug;
	const course =
		slug && state.courses.length > 0
			? getCourseBySlug(state.courses, slug)
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
