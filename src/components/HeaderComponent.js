import React, { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from 'reactstrap'
import { NavLink, Link } from 'react-router-dom';

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
			<header>
				<Navbar className="bg-gr nav-dark" dark expand="md">
					<div className="container">
						<Link className="navbar-brand" to="/home"><strong>RtdLG</strong></Link>
						<NavbarToggler onClick={this.toggle} />
						<Collapse isOpen={this.state.isOpen} navbar>
							<Nav className="ml-auto" navbar>
								<NavItem>
									<NavLink className="nav-link" to='/home' activeClassName="active"><span className="fa fa-home fa-lg"></span> Home</NavLink>
								</NavItem>
								<NavItem>
									<NavLink className="nav-link" to='/generator' activeClassName="active"><span className="fa fa-tasks fa-lg"></span> Generator</NavLink>
								</NavItem>
								<NavItem>
									<NavLink className="nav-link" to='/library' activeClassName="active"><span className="fa fa-book fa-lg"></span> Library</NavLink>
								</NavItem>
							</Nav>
						</Collapse>
					</div>
				</Navbar>			
			</header>
		);
	}
}

export default Header;