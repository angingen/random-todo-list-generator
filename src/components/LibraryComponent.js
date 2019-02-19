import React, { Component } from 'react';
import { baseURL } from '../shared/baseURL';
import { Badge, Row, Col,
	Button, ButtonGroup, ButtonToolbar,
	Card, CardText, CardBody, CardTitle, CardSubtitle,
	Modal, ModalHeader, ModalBody, Label,
	Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { Control, Form, Errors } from 'react-redux-form';
import Loading from './LoadingComponent';

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
		this.handleSubmit = this.handleSubmit.bind(this);
		this.hoverDisplay = this.hoverDisplay.bind(this);
		this.unhoverDisplay = this.unhoverDisplay.bind(this);
		this.state = {
			modalOpen: false,
			buttonDisplay: {span:'block',p:'none'}
		}
	}

	toggleModal() {
		this.setState({
			modalOpen: !this.state.modalOpen
		})
	}

	hoverDisplay() {
		if (this.state.buttonDisplay.p == 'none') {
			this.setState({
				buttonDisplay: {span:'none',p:'block'}
			})
		}
	}

	unhoverDisplay() {
		if (this.state.buttonDisplay.span == 'none') {
			this.setState({
				buttonDisplay: {span:'block',p:'none'}
			})
		}
	}

	handleSubmit(values) {
		this.props.postProposal(values);
		this.props.resetProposalForm();
		this.toggleModal();
	}

	render() {
		return (
			<React.Fragment>
				<h2 className="flexbox mt-2">Library 
				<Button className="ml-auto" id="task-proposal" onMouseEnter={this.hoverDisplay}
					onClick={this.toggleModal}
					onMouseLeave={this.unhoverDisplay} ><span className="fa fa-lg fa-plus" style={{display:this.state.buttonDisplay.span}}> </span> <p className="mb-0" style={{display:this.state.buttonDisplay.p}}>Propose my own task!</p></Button>
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
										model=".email" 
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

function RenderTags({tags, tagSelector, tagSelected}) {
	if (tags != null) {
		const tag = tags.map((tagItem) => {
			return (
				
				<ButtonGroup key={tagItem.id}>
					<Badge color={tagItem.name==tagSelected? "danger":"warning"} className="m-1 tags tags-list" onClick={() => tagSelector(tagItem.name)} pill>{tagItem.name}</Badge>
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

function TagsList({tags, tagSelector,tagSelected}) {
	if (tags.isLoading) {
		return (
			<div className="container">
				fetching tags informations ...
				<Loading />
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
				<RenderTags tags={tags.tags} tagSelector={tagSelector} tagSelected={tagSelected}/>
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
						<div className="flexbox"><p className="task-author mt-1">- proposed by {taskItem.author}</p></div>
					);
				}
			}

			const cardTags = taskItem.category.map((tag) => {
				if (tag != "all"){
					return (
						<ButtonGroup key={taskItem.category.indexOf(tag)}>
							<Badge color="info" className="m-1 tags" pill>{tag}</Badge>
						</ButtonGroup>
					);
				}
			});

			return (
				<div key={taskItem.id} className="col-12 col-md-6 col-lg-4 mt-3 mb-3 flexbox">
					<Card className="taskCard">
						<CardBody>
							<h5 className="flexbox"><div>{taskItem.name}</div><Badge color="danger" className="ml-auto">{taskItem.time}{taskItem.unit}</Badge></h5>
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

function TaskCards({tasks,tasksSelected}) {
	if (tasks.isLoading) {
		return (
			<div className="container">
				fetching tasks informations ...
				<Loading />
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
				<RenderTasks tasks={tasksSelected} />
			</React.Fragment>
		)
	}
}

function PageNav({tasks,currentPage,totoalPage,pagePrev,pageNext,changePage}) {
	const pageNavNum = [...Array(totoalPage)].map((e,i)=>
				<PaginationItem key={i} active={currentPage==i+1} onClick={()=>{changePage(i)}}>
		          	<div className="page-link" aria-label="Previous">
				        <span aria-hidden="true">{i+1}</span>
				  	</div>
		        </PaginationItem>
		)
	if (!tasks.isLoading && !tasks.errMess && totoalPage>1 ) {
		return(
			<div className="row">
				<div className="m-auto">
					<Pagination size="sm" aria-label="Page navigation">
				        <PaginationItem disabled={currentPage==1} onClick={pagePrev}>
				          <div className="page-link" aria-label="Previous">
				          	<span aria-hidden="true">«</span>
				          </div>
				        </PaginationItem>
				        	{pageNavNum}
				        <PaginationItem disabled={currentPage==totoalPage} onClick={pageNext}>
				          <div className="page-link" aria-label="Previous">
				          	<span aria-hidden="true">»</span>
				          </div>
				        </PaginationItem>
				      </Pagination>
				</div>
			</div>
		);
	} else {
		return(
			<div></div>
		)
	}
}

export default class Library extends Component {

	constructor(props) {
		super(props);
		this.tagSelector = this.tagSelector.bind(this);
		this.pageNext = this.pageNext.bind(this);
		this.pagePrev = this.pagePrev.bind(this);
		this.changePage = this.changePage.bind(this);
		this.state = {
			tagSelected: "all",
			tasksSelected:[],
			tasksInCurrentPage:[],
			currentPage:1,
			tasksPerPage:6,
			totoalPage:null
		}

	}

	tagSelector(tag) {
		this.setState({
			tagSelected: tag,
			tasksSelected: this.props.tasks.tasks.filter(task => task.category.includes(tag)),
			tasksInCurrentPage: this.props.tasks.tasks.filter(task => task.category.includes(tag)).slice(0,this.state.tasksPerPage),
			totoalPage: Math.ceil(this.props.tasks.tasks.filter(task => task.category.includes(tag)).length/this.state.tasksPerPage)
		})
	}

	componentDidMount() {
		if (this.props.tasks.tasks){
			this.setState({
				tasksSelected: this.props.tasks.tasks,
				tasksInCurrentPage:this.props.tasks.tasks.slice(0,this.state.tasksPerPage),
				totoalPage: Math.ceil(this.props.tasks.tasks.length/this.state.tasksPerPage)
			});
		}
		this.tagSelector('all');
	}

	pageNext() {
		if (this.state.currentPage!=this.state.totoalPage){
			const pageNum = this.state.currentPage + 1
			this.setState({
				currentPage:pageNum,
				tasksInCurrentPage: this.state.tasksSelected.slice(this.state.tasksPerPage*(pageNum-1),this.state.tasksPerPage*(pageNum))
			})
		}
	}

	pagePrev() {
		if (this.state.currentPage!=1){
			const pageNum = this.state.currentPage - 1
			this.setState({
				currentPage:pageNum,
				tasksInCurrentPage: this.state.tasksSelected.slice(this.state.tasksPerPage*(pageNum-1),this.state.tasksPerPage*(pageNum))
			})
		}
	}

	changePage(pageNum) {
		this.setState({
			currentPage:pageNum+1,
			tasksInCurrentPage: this.state.tasksSelected.slice(this.state.tasksPerPage*(pageNum),this.state.tasksPerPage*(pageNum+1))
		})
	}

	render() {
		console.log('render function envoked');
		return (
			<div className="container">
				<RenderLibHeader postProposal={this.props.postProposal} 
					resetProposalForm={this.props.resetProposalForm} />
				<TagsList tags={this.props.tags} 	
					tagSelector={this.tagSelector} 
					tagSelected={this.state.tagSelected}/>
				<TaskCards tasks={this.props.tasks} 
					tasksSelected = {this.state.tasksInCurrentPage}/>
				<PageNav tasks={this.props.tasks} 
					currentPage={this.state.currentPage} 
					totoalPage={this.state.totoalPage}
					pagePrev={this.pagePrev}
					pageNext={this.pageNext}
					changePage={this.changePage} />
			</div>
		);
	}
}

