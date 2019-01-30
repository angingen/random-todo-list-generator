import { createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Tags } from './tags';
import { Tasks } from './tasks';

export const ConfigureStore = () => {
	const store = createStore(
		combineReducers({
			tags: Tags,
			tasks: Tasks
		}),
		applyMiddleware(thunk,logger)
	);

	return store;
}