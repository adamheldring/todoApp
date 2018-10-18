import React from "react"
import ToDoItem from "./ToDoItem"

class App extends React.Component {

  state = {
    toDoItems: [],
    currentText: "",
    placeHolderText: ""
  }

  handleBoxCheck = (checked, taskID) => {
    const listUpdate = this.state.toDoItems
    listUpdate[taskID].done = !listUpdate[taskID].done
    this.setState({
      toDoItems: listUpdate
    })
  }
  removeItem = (removeIndex) => {
    const listUpdate = this.state.toDoItems
    listUpdate.splice(removeIndex, 1)
    this.setState({
      toDoItems: listUpdate
    })
  }
  handleNewText = e => this.setState({
    currentText: e.target.value
  }, () => console.log(this.state.currentText))

  handleSubmitNew = (e) => {
    e.preventDefault()
    if (!this.state.currentText.length) {
      this.setState({ placeHolderText: "Give your task a name" })
    } else {
      const newListItem = {
        name: this.state.currentText.toUpperCase(),
        done: false
      }
      console.log(newListItem)
      this.setState({
        toDoItems: this.state.toDoItems.concat(newListItem),
        currentText: "",
        placeHolderText: ""
      })
    }
  }

  render() {
    return (
      <div className="master-wrapper">
        <header className="header">
          <img className="header__image" src="./pencillong.jpg" alt="Pencil" />
        </header>

        <section className="list-section">
          <div className="list-section__heading-container">
            <h1 className="list-section__heading">TO DO LIST</h1>
          </div>

          {(!this.state.toDoItems.length) && <i>( CREATE A TASK )</i>}

          {this.state.toDoItems.map((item, index) => {
            return <ToDoItem
              key={index}
              taskID={index}
              name={item.name}
              status={item.done}
              handleBoxCheck={() => this.handleBoxCheck(item.done, index)}
              removeItem={() => this.removeItem(index)} />
          })}

          <form onSubmit={this.handleSubmitNew}>
            <input
              type="text"
              value={this.state.currentText}
              placeholder={this.state.placeHolderText}
              onChange={this.handleNewText} />
            <input type="submit" value="Add" />
          </form>
        </section>
      </div>
    )
  }

}

export default App
