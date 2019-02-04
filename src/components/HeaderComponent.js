import React, { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'
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
				
				<Navbar color='light' light expand="md">
					<div className="container">
						<Link className="navbar-brand" to="/home">RtdLG</Link>
						<NavbarToggler tonClick={this.toggle} />
						<Collapse isOpen={this.state.isOpen} navbar>
							<Nav className="ml-auto" navbar>
								<NavItem>
									<Link className="nav-link" to='/generator'><span className="fa fa-tasks fa-lg"></span> Generator</Link>
								</NavItem>
								<NavItem>
									<Link className="nav-link" to='/library'><span className="fa fa-book fa-lg"></span> Library</Link>
								</NavItem>
								<NavItem>
									<Link className="nav-link" to='/'><span className="fa fa-info-circle fa-lg"></span> Help</Link>
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