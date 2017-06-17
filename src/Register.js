import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';

export default class Register extends React.Component{
	
	constructor(props){
		super(props)
		this.state = { 
	      name: '',
	      email: ''
	    }
	    this.handleOnChangeName = this.handleOnChangeName.bind(this)
	    this.handleOnChangeEmail = this.handleOnChangeEmail.bind(this)
	    this.handleOnSubmit = this.handleOnSumbit.bind(this)
	}


	handleOnChangeName(ev){		
	    this.setState({name: ev.target.value})	    
	  }

	 handleOnChangeEmail(ev){
	 	this.setState({email: ev.target.value})
	 }

	handleOnSumbit(ev){
	    ev.preventDefault()
	    this.props.setUser(this.state.name, this.state.email)
	    
	    this.setState({ name: '', email:''})
	    
	}

	render(){
		return (
			<div>
				<form onSubmit={this.handleOnSubmit}>  
					<input type="text" value={this.state.name} onChange={this.handleOnChangeName}/>
					<input type="email" value={this.state.email} onChange={this.handleOnChangeEmail}/>
		            <button type='submit'> Submit </button>
		        </form>				
			</div>
			
		)
	}
}

Register.propTypes = {
  name: PropTypes.string,	  
  email:PropTypes.string
};