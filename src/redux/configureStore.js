import { createStore, combineReducers, applyMiddleware} from 'redux';
import { createForms } from 'react-redux-form'
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Tags } from './tags';
import { Tasks } from './tasks';
import { InitialProposal } from './proposalForm';
import { InitialPreference } from './preferenceForm';
import { InitialListSample } from './listSampleForm';

export const ConfigureStore = () => {
	const store = createStore(
		combineReducers({
			tags: Tags,
			tasks: Tasks,
			...createForms({
				proposalForm: InitialProposal,
				preferenceForm: InitialPreference,
				listSampleForm: InitialListSample
			})
		}),
		applyMiddleware(thunk,logger)
	);

	return store;
}