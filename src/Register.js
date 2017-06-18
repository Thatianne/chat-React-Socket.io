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
			<div className="register">
				<h3>Sign in</h3>
				<div>
					<form onSubmit={this.handleOnSubmit}>
						
						<h3 className="lb"><small>Name</small></h3>						
						<input 
							className="form-control" 
							type="text" 
							aria-describedby="basic-addon1" 
							placeholder="Name" 
							value={this.state.name} 
							onChange={this.handleOnChangeName}/>

						<h3 className="lb"><small>E-mail</small></h3>
						<input 
							className="form-control" 
							type="email" 
							placeholder ="E-mail" 
							value={this.state.email} 
							onChange={this.handleOnChangeEmail}/>
			            
			            <button type='submit' className="btn btn-primary"> Sign in </button>
			        </form>
		        </div>				
			</div>
			
		)
	}
}

Register.propTypes = {
  name: PropTypes.string,	  
  email:PropTypes.string
};