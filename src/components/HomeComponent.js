import React from 'react';
import { Button, ButtonGroup } from 'reactstrap';
function Home() {
	return(
		<div className="container flex-center-align">
			<div className="mt-3 text-center">
				<h1>Random To-do List Generator</h1>
				<h3>Life is better with a plan</h3>
				<p className="mt-3">
					Generator your own to-do list from a wide variaty of tasks.<br/>
					Customize your random section to best suit your neeed. <br/>
					All in two simple steps!
				</p>
				<div>
					<Button color="secondary" to="/library" className="ml-auto">
	                    Task Library
	                </Button>
	                <Button color="primary" to="./generator" className="ml-1">
	                    Get started now
	                </Button>
                </div>
			</div>
		</div>
		
	);
}

export default Home;