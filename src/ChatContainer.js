import React from 'react'

import io from 'socket.io-client'
import MessageOther from './MessageOther'
import Entered from './Entered'
import MyMessage from './MyMessage'
import PropTypes from 'prop-types';

export default class ChatContainer extends React.Component{

	constructor(props){ // configurar o estado inicial
		super(props) //propriedades do componente
		this.state = {messages: []} //definindo o estado inicial, com nenhuma mensagem

		const enter  = this.props.name + " "+ this.props.email +' join'				
		 
		this.socket = io('/')
		// envia mensagem para o servidor
		this.socket.emit('message', enter)
			
	}

	// o socket.io precisa ser adicionado ao cliente, para receber as mensagens dos outros clientes
	componentDidMount(){
		 // conecta ao root do webserver
		// escutar por mensagens que virão
		this.socket.on('message', message =>{
			// mudando o estado, o componente será rederizado			
			var body = message.body	
			var other = body.split(" ")
			var auxBody=""
			for(var i=2; i<other.length; i++) {
    			auxBody = auxBody+""+other[i]+" "	
			}
			auxBody = auxBody.trim()
			var msgOther = {
				from:other[0],
				email:other[1],
				body: auxBody
			}

			this.setState({messages:[msgOther, ...this.state.messages]})


		})
	}



	handleSubmit = event =>{
		const body = event.target.value //o valor do input
		if(event.keyCode == 13 && body){// se o enter foi pressionado e tiver conteúdo no input
			const message  = {
				body,
				from: this.props.name,
				email:this.props.email

			}	
			//o novo estado de messages é a concatenação da nova mensagem com as mensagem antigas
			this.setState({messages:[message, ...this.state.messages]}) 
			const msg = message.from+" "+message.email+" "+message.body
			// envia mensagem para o servidor
			this.socket.emit('message', msg)
			event.target.value = "" //deixa input vazio
		}
		
	}

	send = event =>{
		const body = document.getElementById('input-msg').value
		console.log(body)
		const message  = {
				body,
				from: this.props.name,
				email:this.props.email

			}	
			//o novo estado de messages é a concatenação da nova mensagem com as mensagem antigas
			this.setState({messages:[message, ...this.state.messages]}) 
			const msg = message.from+" "+message.email+" "+message.body
			// envia mensagem para o servidor
			this.socket.emit('message', msg)
			event.target.value = "" //deixa input vazio
			console.log("conseguiu")

			document.getElementById('input-msg').value=""
	}

	render(){
		var all
		
		//percorrer todas as mensagens e colocá-la em um item da lista
		all = this.state.messages.map((message, index)=>{

			if(message.body != 'join'){
				var block
				if(message.from == this.props.name){
					block = <MyMessage key={index+'m'} message={message.body}/>
				}else{
					block = <MessageOther key={index} name={message.from} email={message.email} message={message.body}/>
				}
				return block

			}else{
				return <Entered key={index+'t'} name={message.from}/>
			}
		})

		all = all.reverse()
	
		return(

			<div className="centering">
			<div className="alert alert-success welcome" role="alert">Welcome {this.props.name}!</div>
				<div className="box">
					{all}
				</div>
				<div className="input-message">
				   	<i className="glyphicon glyphicon-chevron-right" onClick={this.send}></i>
					<input 
						id="input-msg"
						type="text" 
						className="form-control" 
						placeholder="Escreva sua mensagem"
						onKeyUp={this.handleSubmit}
						aria-describedby="basic-addon1"/>
				</div>				
			</div>
		)
	}
}

ChatContainer.propTypes = {
  name: PropTypes.string,	  
  email:PropTypes.string
};
