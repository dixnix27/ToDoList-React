import React, { Component } from 'react'

class TestComponent extends Component {
 
    constructor(){
        super();
        this.state={
            message:"lpd1921",
            counter : 0
        }
    }

    increment = () => {
        this.setState({counter: this.state.counter+1})
    }

    decrement = () => {
        this.setState({counter: this.state.counter-1})
    }


  render() {
    return (
      <>
        <h1>{`Hello ${this.state.message}`}</h1>
        <div>{this.state.counter}</div>
        <button onClick={()=>this.increment()}>+</button>
        <button onClick={()=>this.decrement()}>-</button>
      </>
    )
  }
}

export default TestComponent
