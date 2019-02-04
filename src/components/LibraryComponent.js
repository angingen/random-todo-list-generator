import React, { Component } from 'react';
import { baseURL } from '../shared/baseURL';
import { Badge, Row, Col,
	Button, ButtonGroup, ButtonToolbar,
	Card, CardText, CardBody, CardTitle, CardSubtitle,
	Modal, ModalHeader, ModalBody,
	Label} from 'reactstrap';
import { Control, Form, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val)
const maxWords = (len) => (val) => !(val) || (val.split(/\W+/).length <= len)
const taskTimeRange = (min,max) => (val) => (val>min) && (val<=max);

class RenderLibHeader extends Component {
	constructor(props) {
		super(props);
		this.toggleModal = this.toggleModal.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this)
		this.state = {
			modalOpen: false
		}
	}

	toggleModal() {
		this.setState({
			modalOpen: !this.state.modalOpen
		})
	}

	handleSubmit(values) {
		this.props.postProposal(values);
		this.props.resetProposalForm();
		this.toggleModal();
	}

	render() {
		return (
			<React.Fragment>
				<h2 className="flex-container mt-2">Library 
				<Button className="ml-auto" id="task-proposal" onClick={this.toggleModal} >Propose my own task!</Button>
				</h2>
				<Modal isOpen={this.state.modalOpen} toggle={this.toggleModal}>
					<ModalHeader toggle={this.toggleModal}>Task Proosal</ModalHeader>
					<ModalBody>
						<Form model="proposalForm" onSubmit={(values) => this.handleSubmit(values)} >
							<Row className="form-group">
								<Label htmlFor="author" md={12}>Name</Label>
								<Col md={12}>
									<Control.text model=".author" id="author" name="author" 
									placeholder="" className="form-control" 
									validators = {{
										minLength: minLength(3), maxLength: maxLength(30)
									}} 
									/>
									<Errors
										className="text-danger" 
										model=".author" 
										show={{touched: true, focus: false}}
										messages={{
											minLength: 'Must be 3 character or more',
											maxLength: 'Must be 30 character or less'
										}}
									/>
								</Col>
							</Row>

							<Row className="form-group">
								<Label htmlFor="taskName" md={12}>Task title</Label>
								<Col md={12}>
									<Control.text model=".taskName" id="taskName" name="taskName" 
									placeholder="" className="form-control" 
									validators = {{required, maxWords: maxWords(10)}} 
									/>
									<Errors
										className="text-danger" 
										model=".taskName" 
										show={{touched: true, focus: false}}
										messages={{
											required: 'Required',
											maxWords: 'Must be 10 words or less'
										}}
									/>
								</Col>
							</Row>

							<Row className="form-group">
								<Label htmlFor="estimatedTime" md={12}>Estimated time</Label>
								<Col md={10}>
									<Control.text model=".estimatedTime" id="estimatedTime" name="estimatedTime" 
									placeholder="" 
									className="form-control" 
									validators = {{isNumber, taskTimeRange:taskTimeRange(0,12)}} 
									/>
									<Errors
										className="text-danger" 
										model=".estimatedTime" 
										show={{touched: true, focus: false}}
										messages={{
											isNumber: 'Plese enter a number. ',
											taskTimeRange: 'Estimated Time of task must not exceed 12 hours or less than 0 hour. '
										}}
									/>
								</Col>
								<Label htmlFor="estimatedTime" md={2}>hour</Label>
							</Row>
							
							<Row className="form-group">
								<Label htmlFor="taskDescript" md={12}>Task description</Label>
								<Col md={12}>
									<Control.textarea model=".taskDescript" id="taskDescript" name="taskDescript" 
									placeholder="" 
									rows="4" className="form-control" 
									validators = {{required, maxWords: maxWords(50)}} 
									/>
									<Errors
										className="text-danger" 
										model=".taskDescript" 
										show={{touched: true, focus: false}}
										messages={{
											required: 'Required',
											maxWords: 'Must be 50 words or less'
										}}
									/>
								</Col>
							</Row>


							<Row className="form-group">
								<Label htmlFor="email" md={12}>Email</Label>
								<Col md={12}>
									<Control.text model=".email" id="email" name="email" 
									placeholder="" 
									className="form-control" 
									validators = {{validEmail}} 
									/>
									<Errors
										className="text-danger" 
										model=".taskDescript" 
										show={{touched: true, focus: false}}
										messages={{
											validEmail: 'Please enter a valid email address'
										}}
									/>
								</Col>
							</Row>

							<Row className="form-group">								
								<Col md={12}>
									<div className="form-check">
										<Label checked>
											<Control.checkbox model=".agree" id="agree" name="agree" 
											className="form-check-input" 
											/> {' '}
											<strong>Inform me of the result of this proposal</strong>
										</Label>
									</div>
								</Col>
							</Row>

							<div className="form-group flexbox">
									<Button color="secondary" onClick={this.toggleModal} className="ml-auto">
                                        Cancle
                                    </Button>
                                    <Button type="submit" color="primary" className="ml-1">
                                        Send Proposal
                                    </Button>
                            </div>
						</Form>

					</ModalBody>
				</Modal>
			</React.Fragment>
		)
	}
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

		this.state = {
			tagSelected: "all",
		}

	}

	tagSelector(tag) {
		this.setState({
			tagSelected: tag
		})
	}


	render() {
		return (
			<div className="container">
				<RenderLibHeader postProposal={this.props.postProposal} resetProposalForm={this.props.resetProposalForm}/>
				<TagsList tags={this.props.tags} tagSelector={this.tagSelector}/>
				<TaskCards tasks={this.props.tasks} tagSelected = {this.state.tagSelected}/>
			</div>
		);
	}
}