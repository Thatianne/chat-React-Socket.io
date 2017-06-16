import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';

export default class MessageOther extends React.Component{

	constructor(props){
		super(props)
	}

	render(){
		return(
			<div className="row">
				<div className="alert alert-my-message">
					{this.props.message}
				</div>
			</div>
		)
	}

}	

MessageOther.propTypes = { 
  message:PropTypes.string.isRequired
};