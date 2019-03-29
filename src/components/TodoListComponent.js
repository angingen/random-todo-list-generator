import React, { Component } from 'react';
import { Row, Card, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import Loading from './LoadingComponent';

function ListHeader({tasks,randomTasks}) {
	if (tasks.isLoading || tasks.errMess) {
		return <div></div>
	} else {
		const totalTime = randomTasks.reduce((pre=0,cur)=> cur? +cur.time+pre:pre);
		return( 
			<div className="position-absolute mt-2">
				<h2 >Random To-do List </h2>
				<h3 >A list is generated based on your preference: </h3>
				<p className="m-1">
					It is time to challenge yourself with this to-do list!{' '} 
					{randomTasks.filter((task)=>task).length}&nbsp;{randomTasks.filter((task)=>task).length>1? 'tasks are ':'task is '} 
					selected for you and will take in&nbsp;total {totalTime}&nbsp;{totalTime>1? 'hours':'hour'}.<br/> 
					Discover more tasks in the <Link to="/library" className="highligt-text unstyled-link" >「Library」</Link>.<br/>
					Click the <span className="highligt-text">「Reset button」</span> to clear all settings and go back to the Task Generator.<br/>
					Would like another tasks? Click <span className="highligt-text">「<span className="fa fa-random fa-sm text-secondary"></span>」</span>to get another to-do list. 
				</p>
			</div>
		);
	}
}

function RenderTaskContainer({listSampleForm,randomTasks}){
	var taskContainerUsed = [];
	if (listSampleForm.commingWeek) {
		taskContainerUsed = listSampleForm.taskContainerCommingWeek;
	} else {
		taskContainerUsed = listSampleForm.taskContainer;
	}

	const taskContainer = taskContainerUsed.map((container,index) => {
			if (!randomTasks[index]){
				return (
					<div className="col-12 col-md-6 p-1 flexbox" key={index}>
						<div className={ container.customSelect? "task-container-todolist card taskCard":"task-container-todolist card pastday taskCard" } >
							<div className="d-flex">
								<div className="mr-auto ml-2">{container.date}</div><div className="ml-auto mr-2">{container.abb.toUpperCase()}</div>
							</div>
							<hr className="mt-1" />
							<CardBody className="pl-2 pr-2 pt-0 pb-0">
								<p></p>
							</CardBody>
						</div>
					</div>
				)

			} else {
				return (
					<div className="col-12 col-md-6 p-1 flexbox" key={index}>
						<div className={ container.customSelect? "task-container-todolist card taskCard":"task-container-todolist card pastday taskCard" } >
							<div className="d-flex">
								<div className="mr-auto ml-2">{container.date}</div><div className="ml-auto mr-2">{container.abb.toUpperCase()}</div>
							</div>
							<hr className="mt-1" />
							<CardBody className="pl-2 pr-2 pt-0 pb-0">
								<p>{randomTasks[index].name}</p>
								<p>{randomTasks[index].description}</p>
							</CardBody>
						</div>
					</div>
				);
			}
		});

	return (
		<div className="row d-flex">
			{taskContainer}
			<div className="col-12 col-md-6 p-1 flexbox align-items-end">
				<img src="/assets/images/spacefiller.png" alt="challenge" className="mt-auto ml-auto spacefiller-img" />
			</div>
		</div>
	)
}

function ListBody ({tasks,preferenceForm,listSampleForm,randomTasks,handleReset,newTasks}){
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
							<div className="d-flex justify-content-center">
								<i className="fa fa-random fa-lg text-cs-purple btn" onClick={()=>{newTasks()}}></i>
							</div>
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
		this.newTasks=this.newTasks.bind(this);
		this.state = {
			randomTasks: new Array(7).fill(null)
		}
	}

	handleReset(){
		this.props.resetpreferenceForm();
		this.props.resetListSampleForm();
	}

	componentDidMount(){
		this.newTasks();

	}

	newTasks(){
		const remaningTasks = this.props.tasks.tasks.filter((task)=> {
			let arr1 = this.props.preferenceForm.taskExclude.concat(task.category);
			let set1 = new Set(arr1);
			return (arr1.length === set1.size && task.time<=this.props.preferenceForm.time)
		});

		function getRandomInt(max){
			return Math.floor(Math.random() * Math.floor(max));
		}

		var taskContainerUsed = [];
		if (this.props.listSampleForm.commingWeek) {
			taskContainerUsed = this.props.listSampleForm.taskContainerCommingWeek;
		} else {
			taskContainerUsed = this.props.listSampleForm.taskContainer;
		}

		const SelectedTasks = taskContainerUsed.map((task)=>{
			if (task.customSelect) {
				return remaningTasks[getRandomInt(remaningTasks.length)];
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
				<div className="container position-relative">
					<ListHeader tasks={this.props.tasks} randomTasks={this.state.randomTasks}/>
					<div id="section-to-print" className="list-page-container d-flex">
						<ListBody tasks={this.props.tasks} 
							preferenceForm={this.props.preferenceForm} 
							listSampleForm={this.props.listSampleForm} 
							randomTasks={this.state.randomTasks}
							handleReset={this.handleReset}
							newTasks={this.newTasks} />
					</div>
				</div>
			</>
		);
	}
}