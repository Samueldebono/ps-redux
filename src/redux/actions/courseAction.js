import types from "./actionTypes";
import * as courseApi from "../../api/courseApi";

export function loadCourseSuccess(courses) {
	return { type: types.LOAD_COURSES_SUCCESS, courses };
}
//Create course and save same thing
export function saveCourseSuccess(course) {
	return { type: types.CREATE_COURSE_SUCCESS, course };
}

export function updateCourseSuccess(course) {
	return { type: types.UPDATE_COURSE_SUCCESS, course };
}

export function loadCourses() {
	debugger;
	return function (dispatch) {
		return courseApi
			.getCourses()
			.then((courses) => {
				dispatch(loadCourseSuccess(courses));
			})
			.catch((error) => {
				throw error;
			});
	};
}

export function saveCourse(course) {
	debugger;
	return function (dispatch, getState) {
		return courseApi
			.saveCourse(course)
			.then((savedCourse) => {
				course.id
					? dispatch(updateCourseSuccess(savedCourse))
					: dispatch(saveCourseSuccess(savedCourse));
			})
			.catch((error) => {
				throw error;
			});
	};
}
