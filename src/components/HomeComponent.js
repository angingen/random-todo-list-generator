import React from 'react';
import { Link } from 'react-router-dom';
function Home() {
	return(
		<div className="container flex-center-align home-section">
				<h1>Random To-do List Generator</h1>
				<p className="mt-3 home-text">
					Generator your own to-do list from a wide variaty of tasks.<br/>
					Customize your random task selection to best suit your neeed. <br/>
					All in two simple steps!
				</p>
				<div className="home-buttons">
					<Link to="/library" className="ml-auto btn btn-warning">
	                    Task Library
	                </Link>
	                <Link to="./generator" className="ml-1 btn btn-primary">
	                    Get started now
	                </Link>
                </div>

		</div>
		
	);
}

export default Home;