const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const socketIo = require('socket.io')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackConfig = require('./webpack.config.js')

const app = express()
const server = http.createServer(app)
const io = socketIo(server)

//Uso de middleware, transforma a requisição em um array de funções

// serve arquivos estáticos, servirá index.html
app.use(express.static(__dirname + '/public'))
//o compilador do webpack precisa das configurações
app.use(webpackDevMiddleware(webpack(webpackConfig)))
//para não passar bodies arrumados
app.use(bodyParser.urlencoded({ extended: false }))

// a biblioteca io tem todos os metodos para escutar e receber eventos
// primeiro é preciso escutar por eventos para conexão
io.on('connection', socket =>{

	// o servidor deve escutar eventos de mensagem
	socket.on('message', body =>{ // o client envia o corpo da mensagem
		//envia a mensagem para todos os clientes sem enviar para si
		socket.broadcast.emit('message', {
			body,
			from:socket.id.slice(8)
		})
		
	})
})

//inicia o servidor, não no app
server.listen(3000)

