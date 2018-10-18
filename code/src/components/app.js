import React from "react"
import ToDoItem from "./ToDoItem"

class App extends React.Component {

  state = {
    toDoItems: [{
      name: "Learn React",
      done: false
    },
    {
      name: "Get a job",
      done: false
    },
    {
      name: "Make friends",
      done: true
    }
    ]
  }

  handleBoxCheck = (checked, taskID) => {
    const listUpdate = this.state.toDoItems
    listUpdate[taskID].done = !listUpdate[taskID].done
    this.setState({
      toDoItems: listUpdate
    })
  }

  render() {
    console.log(this.state.toDoItems)
    return (
      <div>
        <h1>TO DO LIST</h1>
        {this.state.toDoItems.map((item, index) => {
          return <ToDoItem
            key={index}
            taskID={index}
            name={item.name}
            status={item.done}
            handleBoxCheck={() => this.handleBoxCheck(item.done, index)} />
        })}
      </div>
    )
  }

}

export default App
