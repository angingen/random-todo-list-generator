import React, { Component } from 'react';
import { Form, Control } from 'react-redux-form';
import { Label, Row, Col,
	Card, CardBody,
	ButtonGroup, Badge, ButtonToolbar} from 'reactstrap';
import { Link } from 'react-router-dom';
import Loading from './LoadingComponent';

function PreferenceHeader({pathname,tags}) {
	if (tags.isLoading || tags.errMess) {
		return <div></div>
	} else {
		var nextStep="";
		pathname === '/generator/listpreference'? nextStep = 'move to the List Setting.': nextStep = 'generate your task!';
		return(
			<div className="position-absolute mt-2">
				<h2 >Task Preference </h2>
				<h3 >Customize your tasks:</h3>
				<p className="m-1">
					Click to toggle the tasks categories you would like to <span className="highligt-text">「include」</span> or <span className="highligt-text">「exclude」</span>.<br/>
					Set a <span className="highligt-text">「maximum allowable time」</span> for your tasks by adjusting the slider.<br/>
					Click the <span className="highligt-text d-none d-md-inline">「Remaining Task button」</span><span className="highligt-text d-md-none d-sm-inline">「Next」</span> to {nextStep}
				</p>
			</div>
		);
	}
}	

function TaskPreference({tags,tasks,preferenceForm,toggleTagsIn,toggleTagsEx,displayTasksNumber,mouseOverHandler,mouseOutHandler,pathname}){

	function RenderTags({tags,toggleTagsIn,toggleTagsEx}) {
		if (tags != null) {
			const tag = tags.map((tagItem) => {
				return (
					
					<ButtonGroup key={tagItem.id}>
						<Badge color="warning" className="m-1 tags tags-list" 
						onClick={() => {toggleTagsIn(tagItem.name); toggleTagsEx(tagItem.name)}} 
						pill>{tagItem.name}</Badge>
					</ButtonGroup>
					
				)
			})
			return (
				<React.Fragment>
					<ButtonToolbar>
						<span>
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

	function SilderValue({preferenceForm}){
		if (preferenceForm.time > 1) {
			return (
				<Label className="col-md-2 col-4 mt-3 order-2 order-md-3 text-right">{preferenceForm.time+' hrs'}</Label>
			)
		} else {
			return (
				<Label className="col-md-2 col-4 mt-3 order-2 order-md-3 text-right">{preferenceForm.time+' hr'}</Label>
			)
		}
	}

	function RemainingTaskNum({preferenceForm,tasks,displayTasksNumber,mouseOverHandler,mouseOutHandler,pathname}){
		const numberOfTasks = tasks.tasks.filter((task)=> {
			let arr1 = preferenceForm.taskExclude.concat(task.category);
			let set1 = new Set(arr1);
			return (arr1.length === set1.size && task.time<=preferenceForm.time)
		});

		return(
			<React.Fragment>
				<Col className="d-flex align-items-end col-8">
					<Link id="remainingTasksButton-md" 
						to={pathname==="/generator/listpreference"? pathname + '/listsample':pathname + '/challenge'} 
						className="ml-auto btn btn-outline-danger d-none d-md-block" 
						onMouseEnter={mouseOverHandler}
						onMouseLeave={mouseOutHandler}>
							{displayTasksNumber ==='none'? 'Next':'Remaining Tasks'}
							<Badge style={{display:displayTasksNumber}} color="danger" id="remainingTasks" className="m-1 ml-2">{numberOfTasks.length}</Badge>
					</Link>
					<Link id="remainingTasksButton-sm" 
						to={pathname==="/generator/listpreference"? pathname + '/listsample':pathname + '/challenge'} 
						className="ml-auto btn btn-outline-danger d-sm-block d-md-none"> 
							Next
					</Link>
				</Col>
				<Col className="d-flex justify-content-center w-100 d-sm-block d-md-none">
					<div className="mb-0 mt-3 text-center"><strong> Remaining Tasks: </strong><Badge style={{display:displayTasksNumber}} color="danger" id="remainingTasks" className="m-1 ml-2">{numberOfTasks.length}</Badge></div>
				</Col>
			</React.Fragment>
		)
	}

	if (tags.isLoading || tasks.isLoading) {
		return (
			<div className="container">
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
		return(
			<div className="container d-flex mt-3">
				<Row className="justify-content-center align-self-center">
				<div className="col-12 col-lg-10">
					<Card className="p-2 m-3">
						<CardBody className="pt-0">
							<Form model='preferenceForm' >
								<Row className="form-group">
									<Label className="col-md-6 order-md-1 text-center">Task Included</Label>
									<Col md={6} className="order-md-3">
										<Card className="p-2 align-self-center" id="includa-area">
											<CardBody className="pt-0" >
												<RenderTags tags={tags.tags.filter(tag=> preferenceForm.taskInclude.includes(tag.name) && tag.name !== 'all')} toggleTagsIn={toggleTagsIn} toggleTagsEx={toggleTagsEx}/>
											</CardBody>
										</Card>
									</Col>
									<Label className="col-md-6 order-md-2 text-center">Task Excluded</Label>
									<Col md={6} className="order-md-4">
										<Card className="p-2 align-self-center" id="exclude-area">
											<CardBody className="pt-0" >
												<RenderTags tags={tags.tags.filter(tag=> preferenceForm.taskExclude.includes(tag.name) && tag.name !== 'all')} toggleTagsIn={toggleTagsIn} toggleTagsEx={toggleTagsEx}/>
											</CardBody>
										</Card>
									</Col>
								</Row>
								<Row className="form-group">
									<Label className="order-1 order-md-1 col-lg-2 col-md-4 col-8 mt-3">Maximum time</Label>
									<div className="order-3 order-md-3 col-lg-8 col-md-6 col-12 mt-3">
										<Control.input type="range" model=".time" id="slider" min="0.5" max="6" step="0.5" 
											className="form-control" 
											list="datamark"/>
									</div>
									<SilderValue preferenceForm={preferenceForm}/>
								</Row>
								<Row className="form-group">
									<div className="d-flex align-items-start col-4">
										<Link id="resetButton" to="/generator" className="ml-0 btn btn-outline-secondary">
						                    Prev
						                </Link>
					                </div>
									<RemainingTaskNum preferenceForm={preferenceForm} 
										tasks={tasks} 
										displayTasksNumber={displayTasksNumber} 
										mouseOverHandler={mouseOverHandler} 
										mouseOutHandler={mouseOutHandler}
										pathname={pathname} />
								</Row>
							</Form>
							
						</CardBody>
					</Card>
				</div>
				</Row>
			</div>
		);
	}
}
export default class Preference extends Component {
	constructor(props) {
		super(props);
		this.mouseOverHandler = this.mouseOverHandler.bind(this)
		this.mouseOutHandler = this.mouseOutHandler.bind(this)
		this.state = {
			displayTasksNumber: 'inline-block'
		}
	}

	mouseOverHandler(){
		if(this.state.displayTasksNumber !== 'none'){
			this.setState({displayTasksNumber: 'none'});
		}
	}
	mouseOutHandler(){
		if(this.state.displayTasksNumber === 'none'){
		this.setState({displayTasksNumber: 'inline-block'})
		}
	}

	render() {
		return(
			<>
			<div className="container position-relative ">
				<PreferenceHeader pathname={this.props.location.pathname} tags={this.props.tags}/>
				<div className="preference-container d-flex">
					<TaskPreference 
					tags={this.props.tags}
					tasks={this.props.tasks} 
					preferenceForm={this.props.preferenceForm}
					toggleTagsIn={this.props.toggleTagsIn}
					toggleTagsEx={this.props.toggleTagsEx}
					displayTasksNumber={this.state.displayTasksNumber}
					mouseOverHandler={this.mouseOverHandler}
					mouseOutHandler={this.mouseOutHandler}
					pathname={this.props.location.pathname} />
				</div>
			</div>
			</>
		);
	}

}