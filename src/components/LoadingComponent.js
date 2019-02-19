import React from 'react';

const Loading = () => {
    return(
    	<div className="loading-container">
	        <div className="col-12 d-flex justify-content-center align-items-center">
	            <span className="fa fa-spinner fa-pulse fa-3x fa-fw text-secondary"></span>
	        </div>
	        <div className="col-12 d-flex justify-content-center">
	            <div>Loading . . .</div>
	        </div>
        </div>
    );
};

export default Loading;