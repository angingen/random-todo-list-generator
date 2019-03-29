import React, { Component } from 'react';
import { Label, Row, Col,
	Card, CardBody, Button} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Form, Control } from 'react-redux-form';
import Loading from './LoadingComponent';

function ListSampleHeader({tasks}) {
	if (tasks.isLoading || tasks.errMess) {
		return <div></div>
	} else {
		return(
			<div className="position-absolute mt-2">
				<h2 >List Setting </h2>
				<p className="m-1"><strong className="header-text-sub"> Customize your to-do list:</strong><br/>
					Passed days are labeled with <span className="highligt-text">「NOT AVALIABLE」</span>.<br/>
					Click to toggle the dates your would like to <span className="highligt-text">「include」</span> or <span className="highligt-text">「exclude」</span> .<br/> 
				</p>
			</div>
		);
	}
}

function RenderTaskContainer({listSampleForm,toggleSelect}){
	var modelName = '';
	var taskContainerUsed = [];
	if (listSampleForm.commingWeek) {
		taskContainerUsed = listSampleForm.taskContainerCommingWeek;
		modelName = 'listSampleForm.taskContainerCommingWeek[';
	} else {
		taskContainerUsed = listSampleForm.taskContainer;
		modelName = 'listSampleForm.taskContainer[';
	}
	const taskContainer = (taskContainerUsed).map((container,index) => {
			var note = '';
			var dateNotAvaliable = true;
			var buttonColor = '';
			if (!container.include) {
				note = 'NOT AVALIABLE';
				dateNotAvaliable = true;
				buttonColor = "secondary";
			} else if (container.customSelect) {
				note = 'CLICK TO EXCLUDE';
				dateNotAvaliable = false;
				buttonColor = "warning";
			} else {
				note = 'CLICK TO INCLUDE';
				dateNotAvaliable = false;
				buttonColor = "secondary";
			}
			return (
				<div className="col-12 col-md-6 p-1 flexbox" key={index}>
					<div className="task-container card w-100 p-1" >
						<div className="d-flex task-container-sample">
							<div className="mr-auto ml-2">{container.date}</div><div className="ml-auto mr-2">{container.abb.toUpperCase()}</div>
						</div>
						<hr className="mt-0" />
						<Button type="button" color={buttonColor} className="text-center mr-2 ml-2 task-sample-button" disabled={dateNotAvaliable} onClick={()=>{toggleSelect(modelName+index+'].customSelect')}}>{note}</Button>
					</div>
				</div>
			);
		});

	return (
		<div className="row d-flex">{taskContainer}</div>
	)
}

function ListSample ({tasks,preferenceForm,listSampleForm,toggleSelect}){
	if (tasks.isLoading) {
		return (
			<div className="container">
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
		return(
			<div className="container mt-3">
				<Row className="justify-content-center">
					<div className="col-12 col-lg-10">
						<Card className="p-2 m-3">
							<CardBody className="pt-0">
								<Form model="listSampleForm">
									<Row className="form-group">
										<Col md={12}>
		                                    <div className="form-check">
												<Label>
													<Control.checkbox model=".commingWeek" 
														name="commingWeek" 
														className="form-check-input" />
														{' '}To-do List for the comming week
												</Label>
											</div>
										</Col>
									</Row>
									<Row className="list-container">
										<div className="d-flex align-items-center col-12">
											<Card className="col-12">
												<CardBody>
													<RenderTaskContainer listSampleForm={listSampleForm} toggleSelect={toggleSelect} />
												</CardBody>
											</Card>
						                </div>
							        </Row>
									<Row className="form-group mt-3">
										<div className="d-flex align-items-start col-4">
											<Link id="previousButton" to="/generator/listpreference" className="ml-0 btn btn-outline-secondary">
							                    Prev
							                </Link>
						                </div>
						                <div className="d-flex col-8">
											<Link id="nextButton" to="/generator/listpreference/listsample/todolist" className="ml-auto btn btn-outline-danger">
							                    Next
							                </Link>
						                </div>
							        </Row>
						        </Form>
							</CardBody>
						</Card>
					</div>
				</Row>
			</div>
		)
	}
}

export default class TodoListSample extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		
		return(
			<>
				<div className="container position-relative ">
					<ListSampleHeader tasks={this.props.tasks} />
					<div className="listSample-container align-items-center d-flex">
						<ListSample tasks={this.props.tasks} 
							preferenceForm={this.props.preferenceForm} 
							listSampleForm={this.props.listSampleForm}
							toggleSelect={this.props.toggleSelect} />
					</div>
				</div>
			</>
		);
	}
}