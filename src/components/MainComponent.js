import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Library from './LibraryComponent';
import { fetchTags, fetchTasks } from '../redux/ActionCreator';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
	tags: state.tags,
	tasks: state.tasks
});

const mapDispatchToProps = dispatch => ({
	fetchTags: () => {dispatch(fetchTags())},
	fetchTasks: () => {dispatch(fetchTasks())}
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
				<div className="container" id="main">
					<Library tags={this.props.tags} tasks={this.props.tasks}/>
				</div>
				<Footer />
			</React.Fragment>
		);
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Main)