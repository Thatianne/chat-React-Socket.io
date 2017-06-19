import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';

export default class MessageOther extends React.Component{

	constructor(props){
		super(props)
	
	}

	render(){
		return (
			<div className = "msg-other">
				<div className="row msg-from">
					<span id="name">{this.props.name}</span><span id="email">{this.props.email}</span>
				</div>
				<div className="row">
					<div className="col-md-7 col-sm-7 col-xs-7 alert alert-message-other">						
						{this.props.message}
					</div>									
				</div>				
			</div>
		)
	}
}

MessageOther.propTypes = {
  name: PropTypes.string.isRequired,
  email:PropTypes.string.isRequired,
  message:PropTypes.string.isRequired
};