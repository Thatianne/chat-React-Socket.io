import React from 'react'
import ReactDOM from 'react-dom'
import io from 'socket.io-client'

class App extends React.Component{
	render(){
		return(
			<div>
				<h1>Hello, Wold!</h1>
			</div>
		)
	}
}

ReactDOM.render(<App/>, document.getElementById('root'))