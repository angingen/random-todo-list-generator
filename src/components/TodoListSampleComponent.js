import React, { Component } from 'react';
import { Label, Row, Col,
	Card, CardBody, CardTitle,
	ButtonGroup, Button, Badge, ButtonToolbar} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Form, Control } from 'react-redux-form';

function RenderTaskContainer({listSampleForm,toggleSelect}){
	if (listSampleForm.commingWeek) {
		var taskContainerUsed = listSampleForm.taskContainerCommingWeek;
		var modelName = 'listSampleForm.taskContainerCommingWeek[';
	} else {
		var taskContainerUsed = listSampleForm.taskContainer;
		var modelName = 'listSampleForm.taskContainer[';
	}
	const taskContainer = (taskContainerUsed).map((container,index) => {
			if (!container.include) {
				var note = 'NOT AVALIABLE';
				var dateNotAvaliable = true;
				var buttonColor = "secondary";
			} else if (container.customSelect) {
				var note = 'CLICK TO EXCLUDE THIS DATE';
				var dateNotAvaliable = false;
				var buttonColor = "warning";
			} else {
				var note = 'CLICK TO INCLUDE THIS DATE';
				var dateNotAvaliable = false;
				var buttonColor = "secondary";
			}
			return (
				<div className="task-container card col-12 col-sm-6" key={index} >
					<Row><div className="mr-auto ml-2">{container.date}</div><div className="ml-auto mr-2">{container.abb.toUpperCase()}</div></Row>
					<hr className="mt-0" />
					<Button type="button" color={buttonColor} className="text-center" disabled={dateNotAvaliable} onClick={()=>{toggleSelect(modelName+index+'].customSelect')}}>{note}</Button>
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
				fetching informations ...
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
					<div className="col-12 col-md-10">
						<Card className="p-2 m-3">
							<h5 className="align-self-center">List customizing</h5>
							<hr className="mt-1" />
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
							                    Generate my list!
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
			<ListSample tasks={this.props.tasks} 
				preferenceForm={this.props.preferenceForm} 
				listSampleForm={this.props.listSampleForm}
				toggleSelect={this.props.toggleSelect} />
		</>
		);
	}
}