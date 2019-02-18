import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Library from './LibraryComponent';
import Home from './HomeComponent';
import Generator from './GeneratorComponent';
import Preference from './PreferenceComponent';
import TodoListSample from './TodoListSampleComponent';
import TodoList from './TodoListComponent';
import Challenge from './ChallengeComponent'

import { fetchTags, fetchTasks, postProposal } from '../redux/ActionCreator';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { actions } from 'react-redux-form';

const mapStateToProps = state => ({
	tags: state.tags,
	tasks: state.tasks,
	preferenceForm: state.preferenceForm,
	listSampleForm: state.listSampleForm

});

const mapDispatchToProps = dispatch => ({
	fetchTags: () => {dispatch(fetchTags())},
	fetchTasks: () => {dispatch(fetchTasks())},
	resetProposalForm: () => {dispatch(actions.reset('proposalForm'))},
	resetpreferenceForm: () => {dispatch(actions.reset('preferenceForm'))},
	resetListSampleForm: () => {dispatch(actions.reset('listSampleForm'))},
	postProposal: (proposal) => {dispatch(postProposal(proposal))},
	toggleTagsIn: (tag) => {dispatch(actions.xor('preferenceForm.taskInclude',tag))},
	toggleTagsEx: (tag) => {dispatch(actions.xor('preferenceForm.taskExclude',tag))},
	toggleSelect: (modelname) => {dispatch(actions.toggle(modelname))}

})

class Main extends Component {

	componentDidMount() {
		this.props.fetchTags();
		this.props.fetchTasks();
	}

	render(){
		return (
			<React.Fragment>
				<Header />
				<div id="main">
					<Switch>
						<Route exact path="/library" component={() => <Library tags={this.props.tags} tasks={this.props.tasks} 
						postProposal={this.props.postProposal} resetProposalForm={this.props.resetProposalForm}/>} />
						<Route path="/home" component={Home} />
						<Route exact path="/home" component={Home} />
						<Route exact path="/generator" component={Generator} />
						<Route exact path="/generator/listpreference" component={() => <Preference tags={this.props.tags}
							tasks={this.props.tasks} 
							preferenceForm={this.props.preferenceForm} 
							toggleTagsIn={this.props.toggleTagsIn}
							toggleTagsEx={this.props.toggleTagsEx}
							location={this.props.location} /> } />
						<Route exact path="/generator/listpreference/listsample" component={() => <TodoListSample tasks={this.props.tasks} 
							preferenceForm={this.props.preferenceForm}
							listSampleForm={this.props.listSampleForm}
							toggleSelect={this.props.toggleSelect}/> } />
						<Route exact path="/generator/listpreference/listsample/todolist" component={() => <TodoList tasks={this.props.tasks}
							preferenceForm={this.props.preferenceForm} 
							listSampleForm={this.props.listSampleForm}
							resetpreferenceForm={this.props.resetpreferenceForm}
							resetListSampleForm={this.props.resetListSampleForm} /> } />
						<Route exact path="/generator/challengepreference" component={() => <Preference tags={this.props.tags}
							tasks={this.props.tasks} 
							preferenceForm={this.props.preferenceForm} 
							toggleTagsIn={this.props.toggleTagsIn}
							toggleTagsEx={this.props.toggleTagsEx}
							location={this.props.location} /> } />
						<Route exact path="/generator/challengepreference/challenge" component={() => <Challenge tasks={this.props.tasks}
							preferenceForm={this.props.preferenceForm} 
							resetpreferenceForm={this.props.resetpreferenceForm}
							resetListSampleForm={this.props.resetListSampleForm} /> } />
						<Redirect to="/home" />
					</Switch>
				</div>
				<Footer />
			</React.Fragment>
		);
	}
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));