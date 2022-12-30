import { useState } from 'react'

// a proper place to define a component
const Statistics = (props) => {
  // ...
  console.log(props)
  if (props.stats[0] == 0 && props.stats[1] == 0 && props.stats[2] == 0)
  {
    return (
      "No feedback given"
    )
  }
  else 
  {
    return (
      <div>
      <table>
        <tbody>
      <tr><StatisticLine text="good" value={props.stats[0]} /></tr>
      <tr><StatisticLine text="neutral" value={props.stats[1]} /></tr>
      <tr><StatisticLine text="bad" value={props.stats[2]} /></tr>
      <tr><StatisticLine text="all" value={props.stats[0] + props.stats[1] + props.stats[2]} /></tr>
      <tr><StatisticLine text="average" value={props.stats[0] - props.stats[2]} /></tr>
      <tr><StatisticLine text="positive" value={props.stats[0] / (props.stats[0] + props.stats[1] + props.stats[2])} /></tr>
      </tbody>
      </table>
      </div>
    )
  }
}

const StatisticLine = (props) => {
  return (
    <>
      <td>{props.text}</td>
      <td>{props.value}</td>
      </>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)

  let arrOfRatings = [good, neutral, bad]


  return (
    <div>
      <h1>
        <p>give feedback</p>
      </h1>
      <Button onClick={increaseGood} text='good'/>
      <Button onClick={increaseNeutral} text='neutral'/>
      <Button onClick={increaseBad} text='bad'/>
      <h1>
      <p>statistics</p>
      </h1>
      <Statistics stats={arrOfRatings}/>
    </div>

  )
}

export default App