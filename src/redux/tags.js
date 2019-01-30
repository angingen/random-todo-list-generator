import * as ActionTypes from './ActionTypes';

export const Tags = (state = {
	isLoading: true,
	errMess: null,
	tags: []
	}, action) => {
	switch(action.type) {
		case ActionTypes.ADD_TAGS:
			return {...state, isLoading: false, errMess: null, tags: action.payload}

		case ActionTypes.TAGS_FAILED:
			return {...state, isLoading: false, errMess: action.payload, tags: []}

		case ActionTypes.TAGS_LOADING:
			return {...state, isLoading: true, errMess: [], tags: []}

		default:
			return state;
	}
}