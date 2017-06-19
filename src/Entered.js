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
				<div className="alert alert-entered">
					{this.props.name} join this group				
				</div>
			</div>
			
		)
	}
}

MessageOther.propTypes = {
  name: PropTypes.string.isRequired,	  
};