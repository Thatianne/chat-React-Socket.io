import React from 'react'
import ReactDOM from 'react-dom'
import ChatContainer from './ChatContainer'
import Register from './Register'

class App extends React.Component {
  
  
  constructor(props){
    super(props)
    this.state = {user:'', email:''};
  }
  
  currentUser(){
    console.log(this.state.user.charCodeAt(0))
    if(this.state.user != null && this.state.user!="" ){      
      return true
    }else{
      return false
    }
    
  }

  setUser(user, email){    
    this.setState({user, email});    
  }

  render() {
    return (
      <div>
            
        {this.currentUser() ? <ChatContainer name={this.state.user} email={this.state.email}/> : <Register setUser={this.setUser.bind(this)} />}
      </div> 
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('root'))

//export default connect(mapStateToProps)(App)