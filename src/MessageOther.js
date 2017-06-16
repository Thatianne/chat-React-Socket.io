import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';

export default class MessageOther extends React.Component{

	constructor(props){
		super(props)
	
	}

	render(){
		return (
			<div>
				<h3>{this.props.name}</h3>

				<div className="panel panel-default">
				  <div className="panel-body">
				    {this.props.message}
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