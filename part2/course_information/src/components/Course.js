const Course = ({ course }) => {
    return (
      <>
      <Header course = {course.name}/>
      <Content parts = {course.parts}/>
      <Total sum = {course.parts.map(index => index.exercises ).reduce((pre,curr)=>pre+curr,0)}/>
      </>
    )
  }

    const Header = ({ course }) => <h2>{course}</h2>

    const Total = ({ sum }) => <p><b>Number of exercises {sum}</b></p>

    const Part = ({ part }) => 
    <p>
        {part.name} {part.exercises}
    </p>

    const Content = ({ parts }) => 
    <>
    {parts.map(part => <div key={part.id}> <Part part={part}/></div>)} 
  </>   



export default Course








