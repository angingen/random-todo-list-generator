import * as ActionTypes from './ActionTypes';
import { baseURL } from '../shared/baseURL';

export const fetchTags = () => (dispatch) => {
	dispatch(tagsLoading());

	return fetch(baseURL + 'tags')
		.then(response => {
			if (response.ok) {
				return response;
			}
			else {
				var error = new Error('Error ' + response.status + ': ' + response.statusText);
				error.message = response;
				throw error;
			}
		},
		error => {
			var errmess = new Error(error.message);
			throw errmess;
		})
		.then(response => response.json())
		.then(tags => dispatch(addTags(tags)))
		.catch(error => dispatch(tagsFailed(error.message)));
}

export const addTags = (tags) => ({
	type: ActionTypes.ADD_TAGS,
	payload: tags
});

export const tagsFailed = (errmess) => ({
	type: ActionTypes.TAGS_FAILED,
	payload: errmess
});

export const tagsLoading = () => ({
	type: ActionTypes.TAGS_LOADING
});
 
export const fetchTasks = () => (dispatch) => {
	dispatch(tasksLoading());

	return fetch(baseURL + 'tasks')
		.then(response => {
			if (response.ok) {
				return response;
			}
			else {
				var error = new Error('Error ' + response.status + ': ' + response.statusText);
				error.message = response;
				throw error;
			}
		},
		error => {
			var errmess = new Error(error.message);
			throw errmess;
		})
		.then(response => response.json())
		.then(tags => dispatch(addTasks(tags)))
		.catch(error => dispatch(tasksFailed(error.message)));
}

export const addTasks = (tags) => ({
	type: ActionTypes.ADD_TASKS,
	payload: tags
});

export const tasksFailed = (errmess) => ({
	type: ActionTypes.TASKS_FAILED,
	payload: errmess
});

export const tasksLoading = () => ({
	type: ActionTypes.TASKS_LOADING
});

export const postProposal = (proposal) => (dispatch) => {
	const newproposal = {...proposal};
	newproposal.date = new Date().toISOString();
	(newproposal.estimatedTime <= 1)
		? newproposal.unit='hr'
		: newproposal.unit='hrs';
	return fetch(baseURL + 'proposals', {
		method: 'POST',
		body: JSON.stringify(newproposal),
		headers:{
			'Content-Type': 'application/json'
		},
		credentials: 'same-origin'
	})
		.then(response => {
			if (response.ok) {
				return response;
			}
			else {
				var error = new Error('Error ' + response.status + ': ' + response.statusText);
				error.response = response;
				throw error;
			}
		},
		error => {
			var errmess = new Error(error.message);
			throw errmess;
		})
		.then(response => response.json())
		.then(() => alert('Thank you. Your proposed task will be added to the Task Library soon.'))
		.catch(error => alert('Sorry, your submission failed: ' + error))

}