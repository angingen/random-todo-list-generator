import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Library from './LibraryComponent';
import Home from './HomeComponent';
import Generator from './GeneratorComponent';
import Preference from './PreferenceComponent';
import { fetchTags, fetchTasks, postProposal } from '../redux/ActionCreator';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { actions } from 'react-redux-form';

const mapStateToProps = state => ({
	tags: state.tags,
	tasks: state.tasks,
	preferenceForm: state.preferenceForm

});

const mapDispatchToProps = dispatch => ({
	fetchTags: () => {dispatch(fetchTags())},
	fetchTasks: () => {dispatch(fetchTasks())},
	resetProposalForm: () => {dispatch(actions.reset('proposalForm'))},
	postProposal: (proposal) => {dispatch(postProposal(proposal))},
	toggleTagsIn: (tag) => {dispatch(actions.xor('preferenceForm.taskInclude',tag))},
	toggleTagsEx: (tag) => {dispatch(actions.xor('preferenceForm.taskExclude',tag))}


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
						<Route exact path="/generator/preference" component={() => <Preference tags={this.props.tags}
							tasks={this.props.tasks} 
							preferenceForm={this.props.preferenceForm} 
							toggleTagsIn={this.props.toggleTagsIn}
							toggleTagsEx={this.props.toggleTagsEx}/> } />
						<Redirect to="/home" />
					</Switch>
				</div>
				<Footer />
			</React.Fragment>
		);
	}
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));