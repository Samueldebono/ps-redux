import types from "./actionTypes";
import * as authorApi from "../../api/authorApi";
import { beginApiCall, apiCallError } from "./apiStatusAction";

export function loadAuthorsSuccess(authors) {
	return { type: types.LOAD_AUTHORS_SUCCESS, authors };
}

export function loadAuthors() {
	debugger;
	return function (dispatch) {
		dispatch(beginApiCall());
		return authorApi
			.getAuthors()
			.then((authors) => {
				dispatch(loadAuthorsSuccess(authors));
			})
			.catch((error) => {
				dispatch(apiCallError(error));
				throw error;
			});
	};
}
