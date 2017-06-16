import React from 'react'
import ReactDOM from 'react-dom'
import io from 'socket.io-client'
import MessageOther from './MessageOther'

class App extends React.Component{
	constructor(props){ // configurar o estado inicial
		super(props) //propriedades do componente
		this.state = {messages: []} //definindo o estado inicial, com nenhuma mensagem

	}

	// o socket.io precisa ser adicionado ao cliente, para receber as mensagens dos outros clientes
	componentDidMount(){
		this.socket = io('/') // conecta ao root do webserver
		// escutar por mensagens que virão
		this.socket.on('message', message =>{
			// mudando o estado, o componente será rederizado
			this.setState({messages:[this.state.messages..., message]})

		})

	}

	handleSubmit = event =>{ 
		const body = event.target.value //o valor do input
		if(event.keyCode == 13 && body){// se o enter foi pressionado e tiver conteúdo no input
			const message  = {
				body,
				from: 'Me'
			}
			//o novo estado de messages é a concatenação da nova mensagem com as mensagem antigas
			this.setState({messages:[this.state.messages..., message]}) 
			// envia mensagem para o servidor
			this.socket.emit('message', body)
			event.target.value = "" //deixa input vazio
		} 
	}

	render(){
		//percorrer todas as mensagens e colocá-la em um item da lista
		var messages = this.state.messages.map((message, index) =>{
			return <MessageOther key={index} name={message.from} message={message.body}/>		
		})

		messages.reverse();
		console.log(messages)

		return(
			<div>
				<h1>Hello, Wold!</h1>				
				{messages}
				<div className="input-group">
					<span role="separator" className="divider"></span>				  
				  	<input type="text" className="form-control" onKeyUp={this.handleSubmit} placeholder="Coloque sua mensagem" aria-describedby="basic-addon1"/>
				</div>
				
			</div>
		)
	}
}

ReactDOM.render(<App/>, document.getElementById('root'))