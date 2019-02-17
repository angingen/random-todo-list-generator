import React, { Component } from 'react';
import { Label, Row, Col,
	Card, CardBody, CardTitle,
	ButtonGroup, Button, Badge, ButtonToolbar} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Form, Control } from 'react-redux-form';

function RenderTaskContainer({listSampleForm,randomTasks}){
	if (listSampleForm.commingWeek) {
		var taskContainerUsed = listSampleForm.taskContainerCommingWeek;
	} else {
		var taskContainerUsed = listSampleForm.taskContainer;
	}

	const taskContainer = taskContainerUsed.map((container,index) => {
			if (!randomTasks[index]){
				return (
					<div className="col-12 col-sm-6 p-1 flexbox" key={index}>
						<div className={ container.customSelect? "task-container-todolist card taskCard":"task-container-todolist card pastday taskCard" } >
							<div className="d-flex">
								<div className="mr-auto ml-2">{container.date}</div><div className="ml-auto mr-2">{container.abb.toUpperCase()}</div>
							</div>
							<hr className="mt-1" />
							<CardBody className="pl-2 pr-2 pt-0">
								<p>no task for today</p>
							</CardBody>
						</div>
					</div>
				)

			} else {
				return (
					<div className="col-12 col-sm-6 p-1 flexbox" key={index}>
						<div className={ container.customSelect? "task-container-todolist card taskCard":"task-container-todolist card pastday taskCard" } >
							<div className="d-flex">
								<div className="mr-auto ml-2">{container.date}</div><div className="ml-auto mr-2">{container.abb.toUpperCase()}</div>
							</div>
							<hr className="mt-1" />
							<CardBody className="pl-2 pr-2 pt-0">
								<p>{randomTasks[index].name}</p>
								<p>{randomTasks[index].description}</p>
							</CardBody>
						</div>
					</div>
				);
			}
		});

	return (
		<div className="row d-flex">{taskContainer}</div>
	)
}

function ListBody ({tasks,preferenceForm,listSampleForm,randomTasks,handleReset}){
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
							<h5 className="align-self-center">To-do List</h5>
							<hr className="mt-1" />
							<CardBody className="pt-0">
								<Row className="list-container">
									<div className="d-flex align-items-center col-12">
										<Card className="col-12">
											<CardBody>
												<RenderTaskContainer listSampleForm={listSampleForm} randomTasks={randomTasks}/>
											</CardBody>
										</Card>
					                </div>
						        </Row>
								<Row className="form-group mt-3">
									<div className="d-flex align-items-start col-4">
										<Link id="previousButton" to="/generator/listpreference/listsample" className="ml-0 btn btn-outline-secondary">
						                    Prev
						                </Link>
					                </div>
					                <div className="d-flex col-8">
										<Link id="nextButton" to="/generator" className="ml-auto btn btn-outline-danger"
											onClick={handleReset}>
						                    Reset
						                </Link>
					                </div>
						        </Row>
							</CardBody>
						</Card>
					</div>
				</Row>
			</div>
		)
	}
}

export default class TodoList extends Component {
	constructor(props){
		super(props);
		this.handleReset=this.handleReset.bind(this);
		this.state = {
			randomTasks: new Array(7).fill(null)
		}
	}

	handleReset(){
		this.props.resetpreferenceForm();
		this.props.resetListSampleForm();
	}

	componentDidMount(){
		const remaningTasks = this.props.tasks.tasks.filter((task)=> {
			let arr1 = this.props.preferenceForm.taskExclude.concat(task.category);
			let set1 = new Set(arr1);
			return (arr1.length == set1.size && task.time<=this.props.preferenceForm.time)
		});

		function getRandomInt(max){
			return Math.floor(Math.random() * Math.floor(max));
		}

		if (this.props.listSampleForm.commingWeek) {
			var taskContainerUsed = this.props.listSampleForm.taskContainerCommingWeek;
		} else {
			var taskContainerUsed = this.props.listSampleForm.taskContainer;
		}

		const SelectedTasks = taskContainerUsed.map((task)=>{
			if (task.customSelect) {
				return this.props.tasks.tasks[getRandomInt(remaningTasks.length)];
			} else {
				return null;
			}
		});
		
		this.setState({
			randomTasks: SelectedTasks
		});

	}

	render() {
		return(
			<>
				<ListBody tasks={this.props.tasks} 
					preferenceForm={this.props.preferenceForm} 
					listSampleForm={this.props.listSampleForm} 
					randomTasks={this.state.randomTasks}
					handleReset={this.handleReset} />
			</>
		);
	}
}