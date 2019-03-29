import React, { Component } from 'react';
import { CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';

function GeneratorHeader() {
	return(
		<div className="position-absolute mt-2">
			<h2 >Task Generator </h2>
			<h3 >Select a generator type: </h3>
			<p className="m-1">
				Would like a random task for today? Try <span className="highligt-text">「A challenge for your day」</span>! Or get a to-do list with random tasks by <span className="highligt-text">「A to-do list for your week」</span>!
			</p>
		</div>
	);
}

function GeneratorType() {
	return(
		<div className="row mb-3 mt-3 align-self-center col-12">
			<div className="col-sm-6">
				<Link id="challengeLink" to="/generator/challengepreference" className="generator-card card">
					<CardBody>
						<p className="header-text-sub">A challenge for your day</p>
						<img src="/assets/images/challenge.png" alt="challenge"/>
					</CardBody>
				</Link>
			</div>

			<div id="todolistLink" className="col-sm-6">
				<Link to="/generator/listpreference" className="generator-card card">
					<CardBody>
						<p className="header-text-sub">A to-do list for your week</p>
						<img src="/assets/images/challenge.png" alt="list"/>
					</CardBody>
				</Link>
			</div>
		</div>
	);
}

export default class Generator extends Component {

	render() {
		return (
			<>
			<div className="container position-relative generator-page-container">
				<GeneratorHeader />
				<div className="generator-container d-flex">
					<GeneratorType />
				</div>
			</div>
			</>
		);
	}
}


