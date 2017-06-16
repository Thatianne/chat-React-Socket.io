import React from 'react'
import ReactDOM from 'react-dom'
import io from 'socket.io-client'
import MessageOther from './MessageOther'
import Entered from './Entered'
import MyMessage from './MyMessage'

class App extends React.Component{

	constructor(props){ // configurar o estado inicial
		super(props) //propriedades do componente
		this.state = {messages: [], enters:[]} //definindo o estado inicial, com nenhuma mensagem

		var enter = 'join this chat' 
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
			this.setState({messages:[message, ...this.state.messages]})

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
			this.setState({messages:[message, ...this.state.messages]}) 
			// envia mensagem para o servidor
			this.socket.emit('message', body)
			event.target.value = "" //deixa input vazio
		} 
	}

	render(){
		var all
		
		//percorrer todas as mensagens e colocá-la em um item da lista

		all = this.state.messages.map((message, index)=>{

			if(message.body != 'join this chat'){
				var block
				if(message.from == 'Me'){
					block = <MyMessage key={index+'m'} message={message.body}/>
				}else{
					block = <MessageOther key={index} name={message.from} message={message.body}/>
				}
				return block

			}else{
				return <Entered key={index+'t'} name={message.from} message={message.body}/>
			}
		})

		console.log(all)

		all = all.reverse()
	
		return(
			<div className="centering">
								
				{all}
				
				<div className="input-message">
					<input 
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

ReactDOM.render(<App/>, document.getElementById('root'))