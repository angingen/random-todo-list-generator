import React, { Component } from 'react';
import { Label, Row, Col,
	Card, CardBody, CardTitle,
	ButtonGroup, Button, Badge, ButtonToolbar} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Form, Control } from 'react-redux-form';

function RenderTaskContainer({randomTasks}){
	const today = new Date;
	const day = today.getDay();
	const week = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
		if (!randomTasks){
			return (
				<div className="row d-flex">
					<div className="col-12 p-1 flexbox">
						<div className="task-container-todolist card taskCard">
							<div className="d-flex">
								<div className="mr-auto ml-2">{today.toLocaleDateString()}</div><div className="ml-auto mr-2">{week[day]}</div>
							</div>
							<hr className="mt-1" />
							<CardBody className="pl-2 pr-2 pt-0">
								<p>Opps! no task avaliable for today</p>
							</CardBody>
						</div>
					</div>
				</div>
			)

		} else {
			return (
				<div className="row d-flex">
					<div className="col-12 p-1 flexbox">
						<div className="task-container-todolist card taskCard">
							<div className="d-flex">
								<div className="mr-auto ml-2">{today.toLocaleDateString()}</div><div className="ml-auto mr-2">{week[day]}</div>
							</div>
							<hr className="mt-1" />
							<CardBody className="pl-2 pr-2 pt-0">
								<p>{randomTasks.name}</p>
								<p>{randomTasks.description}</p>
							</CardBody>
						</div>
					</div>
				</div>
			);
		}
}

function TaskBody ({tasks,preferenceForm,randomTasks,handleReset}){
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
							<h5 className="align-self-center">CHALLENGE FOR TODAY</h5>
							<hr className="mt-1" />
							<CardBody className="pt-0">
								<Row className="list-container">
									<div className="d-flex align-items-center col-12">
										<div className="col-12">
											<RenderTaskContainer randomTasks={randomTasks}/>
										</div>
					                </div>
						        </Row>
								<Row className="form-group mt-3">
									<div className="d-flex align-items-start col-4">
										<Link id="previousButton" to="/generator/challengepreference" className="ml-0 btn btn-outline-secondary">
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

export default class Challenge extends Component {
	constructor(props){
		super(props);
		this.handleReset=this.handleReset.bind(this);
		this.state = {
			randomTasks: [null]
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

		const SelectedTasks = this.props.tasks.tasks[getRandomInt(remaningTasks.length)];
		
		this.setState({
			randomTasks: SelectedTasks
		});

	}

	render() {
		return(
			<>
				<TaskBody tasks={this.props.tasks} 
					preferenceForm={this.props.preferenceForm} 
					randomTasks={this.state.randomTasks}
					handleReset={this.handleReset} />
			</>
		);
	}
}