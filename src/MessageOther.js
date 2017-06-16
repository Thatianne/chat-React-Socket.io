import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';

export default class MessageOther extends React.Component{

	constructor(props){
		super(props)
	
	}

	render(){
		return (
			<div className="row">
				<div>
					<h3>{this.props.name}</h3>
				</div>
				<div className="row">
					<div className="col-md-7 .col-sm-5">
						<div className = "alert alert-message-other">
							{this.props.message}
						</div>
					</div>
									
				</div>
				
			</div>
		)
	}
}

MessageOther.propTypes = {
  name: PropTypes.string.isRequired,
  //email:PropTypes.string.isRequired,
  message:PropTypes.string.isRequired
};