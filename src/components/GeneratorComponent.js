import React, { Component } from 'react';
import { BreadCrumb, BreadCrumbItem,
	Card, CardTitle, CardText, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';

function GeneratorHeader() {
	return(
		<React.Fragment>
				<h2 className="position-absolute mt-2">Random To-do List Generator</h2>
		</React.Fragment>
	);
}

function GeneratorType() {
	return(
		<div className="row mb-3 mt-3 align-self-center col-12">
			<div className="col-md-6">
				<Link id="challengeLink" to="/generator/challengepreference" className="generator-card card">
					<CardBody>
						<h5>A challenge for your day</h5>
						<img src="/assets/images/logo.png" alt="challenge"/>
					</CardBody>
				</Link>
			</div>

			<div id="todolistLink" className="col-md-6">
				<Link to="/generator/listpreference" className="generator-card card">
					<CardBody>
						<h5>A to-do list for your week</h5>
						<img src="/assets/images/logo.png" alt="list"/>
					</CardBody>
				</Link>
			</div>
		</div>
	);
}

export default class Generator extends Component {
	constructor(props) {
		super(props);

	}

	render() {
		return (
			<>
			<div className="container position-relative">
				<GeneratorHeader />
				<div className="generator-container d-flex">
					<GeneratorType />
				</div>
			</div>
			</>
		);
	}
}


