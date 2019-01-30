import React, { Component } from 'react';
import { baseURL } from '../shared/baseURL';
import { Badge, Row,
	Button, ButtonGroup, ButtonToolbar,
	Card, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { Control, Form } from 'react-redux-form';

function RenderLibHeader ({toggleModal}) {
	return (
		<React.Fragment>
			<h2 className="flex-container mt-2">Library 
			<Button className="ml-auto" id="task-proposal" onClick={() => toggleModal()} >Propose my own task!</Button>
			</h2>
		</React.Fragment>
	)
}

function RenderTags({tags, tagSelector}) {
	if (tags != null) {
		const tag = tags.map((tagItem) => {
			return (
				
				<ButtonGroup key={tagItem.id}>
					<Badge color="warning" className="m-1 tags" onClick={() => tagSelector(tagItem.name)} pill>{tagItem.name}</Badge>
				</ButtonGroup>
				
			)
		})
		return (
			<React.Fragment>
				<ButtonToolbar>
					<span>Task categories: 
					{tag}</span>
				</ButtonToolbar>
			</React.Fragment>
		);

	}
	else {
		return (
			<div></div>
		)
	}
}

function TagsList({tags, tagSelector}) {
	if (tags.isLoading) {
		return (
			<div className="container">
				fetching tags informations ...
			</div>
		);
	}
	else if (tags.errMess) {
		return (
			<div className="container">
				<div className="row">
					<h4>{tags.errMess}</h4>
				</div>
			</div>
		);
	}
	else {
		return (
			<React.Fragment>
				<RenderTags tags={tags.tags} tagSelector={tagSelector}/>
			</React.Fragment>
		)
	}
}

function RenderTasks({tasks}) {
	if (tasks != null) {
		const task = tasks.map((taskItem) => {
			const TaskAuthor = () => {
				if (taskItem.author === "angingen") {
					return (
						<p></p>
					);
				} 
				else {
					return (
						<div className="flex-container"><p className="task-author mt-1">- proposed by {taskItem.author}</p></div>
					);
				}
			}

			const cardTags = taskItem.category.map((tag) => {
				return (
					<ButtonGroup key={taskItem.category.indexOf(tag)}>
						<Badge color="info" className="m-1 tags" pill>{tag}</Badge>
					</ButtonGroup>
				);
			});

			return (
				<div key={taskItem.id} className="col-12 col-md-6 col-lg-4 mt-3 mb-3 flexbox">
					<Card className="taskCard">
						<CardBody>
							<h5 className="flex-container"><div>{taskItem.name}</div><Badge color="danger" className="ml-auto">{taskItem.time}{taskItem.unit}</Badge></h5>
							<CardText>{taskItem.description}</CardText>
							<CardSubtitle><TaskAuthor /></CardSubtitle>
							<div className="space-filler"></div>
							<div><hr className="line-break"/>{cardTags}</div>

						</CardBody>
					</Card>
				</div>
			)
		})

		return (
			<Row>
				{task}
			</Row>
		);

	}
	else {
		return (
			<div></div>
		)
	}
}

function TaskCards({tasks,tagSelected}) {
	if (tasks.isLoading) {
		return (
			<div className="container">
				fetching tasks informations ...
			</div>
		);
	}
	else if (tasks.errMess) {
		return (
			<div className="container">
				<div className="row">
					<h4>{tasks.errMess}</h4>
				</div>
			</div>
		);
	}
	else {
		return (
			<React.Fragment>
				<RenderTasks tasks={tasks.tasks.filter(task => task.category.includes(tagSelected))} />
			</React.Fragment>
		)
	}
}



export default class Library extends Component {

	constructor(props) {
		super(props);
		this.tagSelector = this.tagSelector.bind(this)
		this.toggleModal = this.toggleModal.bind(this)

		this.state = {
			tagSelected: "all",
			modalOPen: false
		}

	}

	tagSelector(tag) {
		this.setState({
			tagSelected: tag
		})
	}

	toggleModal() {
		this.setState({
			modalOPen: !this.state.modalOPen
		})
	}

	render() {
		return (
			<div className="container">
				<RenderLibHeader toggleModal={this.toggleModal} />
				<TagsList tags={this.props.tags} tagSelector={this.tagSelector}/>
				<TaskCards tasks={this.props.tasks} tagSelected = {this.state.tagSelected}/>
			</div>
		);
	}
}