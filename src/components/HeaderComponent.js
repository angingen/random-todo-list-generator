import React, { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from 'reactstrap'
import { Link } from 'react-router-dom';

class Header extends Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);

		this.state = {
			isOpen: false
		};
	}
	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}


	render() {
		return (
			<div id="header">
				
				<Navbar className="bg-gr nav-dark" dark expand="md">
					<div className="container">
						<Link className="navbar-brand" to="/home"><strong>RtdLG</strong></Link>
						<NavbarToggler onClick={this.toggle} />
						<Collapse isOpen={this.state.isOpen} navbar>
							<Nav className="ml-auto" navbar>
								<NavItem>
									<Link className="nav-link" to='/home'><span className="fa fa-home fa-lg"></span> Home</Link>
								</NavItem>
								<NavItem>
									<Link className="nav-link" to='/generator'><span className="fa fa-tasks fa-lg"></span> Generator</Link>
								</NavItem>
								<NavItem>
									<Link className="nav-link" to='/library'><span className="fa fa-book fa-lg"></span> Library</Link>
								</NavItem>
							</Nav>
						</Collapse>
					</div>
				</Navbar>
				
			</div>
		);
	}
}

export default Header;