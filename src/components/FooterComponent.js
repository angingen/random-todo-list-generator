import React from 'react';

export default function Footer(){
	return (
		<div id="footer">
			<div className="container">
	          <div className="row">
	            <div className="col-6 col-md-4">
	              &copy; 2019 angingen
	            </div>
	            <div className="col"></div>
	            <div className="col-4 col-md-4">
	              <div className="text-right">
	                <a href="https://github.com/angingen" target="_blank" className="btn btn-social-icon btn-github"><i className="fa fa-lg fa-github"></i></a>
	                <a href="mailto:angingen@yahoo.com" className="btn btn-social-icon btn-google"><i className="fa fa-lg fa-envelope-o"></i></a>
	              </div>
	            </div>
	          </div>
	        </div>
        </div>
	);
}