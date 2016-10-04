import React, { Component } from 'react'
import './App.css'

let correctDoor
let guessedDoor

const randomDoor = ({ count }) =>  Math.floor(Math.random() * count)

const didWin = ({ shouldSwitch }) => {
  correctDoor = randomDoor({ count: 3 })
  guessedDoor = randomDoor({ count: 3 })

  if (shouldSwitch) {
    return (guessedDoor !== correctDoor)
  }
  return guessedDoor === correctDoor
}

const getWinPercentage = ({ iterations = 10, shouldSwitch }) => {
  let timesWon = 0
  for (let i = 0; i < iterations; i++) {
    if (didWin({ shouldSwitch })) {
      timesWon++
    }
  }
  return (timesWon / iterations) * 100
}

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      winPercentage: null
    }
  }

  render() {
    const { winPercentage } = this.state

    const experiment = ({ shouldSwitch = false, iterations = 100000 } = {}) => () => (
      this.setState({
        winPercentage: getWinPercentage({ shouldSwitch, iterations })
      })
    )

    return (
      <div className="App">
        <div className="App-header">
          <h2>Monty Hall Problem</h2>
        </div>
        <p className="App-intro">
          <button onClick={experiment({ shouldSwitch: false })}>Play experiment: Without switching doors</button>
        </p>
        <p className="App-intro">
          <button onClick={experiment({ shouldSwitch: true })}>Play experiment: Switching doors</button>
        </p>
        <p className="App-intro">
          {winPercentage && `${winPercentage}%`}
        </p>
      </div>
    )
  }
}

export default App
