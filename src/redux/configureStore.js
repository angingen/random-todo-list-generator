import { createStore, combineReducers, applyMiddleware} from 'redux';
import { createForms, combineForm } from 'react-redux-form'
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Tags } from './tags';
import { Tasks } from './tasks';
import { InitialProposal } from './proposalForm';

export const ConfigureStore = () => {
	const store = createStore(
		combineReducers({
			tags: Tags,
			tasks: Tasks,
			...createForms({
				proposalForm: InitialProposal
			})
		}),
		applyMiddleware(thunk,logger)
	);

	return store;
}