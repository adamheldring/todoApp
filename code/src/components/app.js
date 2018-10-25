import React from "react"
import ToDoItem from "./ToDoItem"

class App extends React.Component {

  state = {
    toDoItems: [],
    filteredItems: [],
    currentText: "",
    placeHolderText: "",
    searchString: ""
  }

  componentDidMount() {
    if (localStorage.getItem("toDoList")) {
      console.log("found localStorage")
      const dataFromStorage = JSON.parse(localStorage.getItem("toDoList"))
      this.setState({
        toDoItems: dataFromStorage,
        filteredItems: dataFromStorage
      })
    } else {
      console.log("nothing in localStorage")
    }
  }

  handleBoxCheck = (checked, taskID) => {
    const listUpdate = this.state.toDoItems
    const checkItem = listUpdate.find(item => (item.id === taskID))
    const checkIndex = listUpdate.indexOf(checkItem)

    listUpdate[checkIndex].done = !listUpdate[checkIndex].done
    this.setState({
      toDoItems: listUpdate
    })
    const dataToStorage = JSON.stringify(listUpdate)
    localStorage.setItem("toDoList", dataToStorage)
  }

  removeItem = (removeItemID) => {
    const listUpdate = this.state.toDoItems
    const removeItem = listUpdate.find(item => (item.id === removeItemID))
    const removeIndex = listUpdate.indexOf(removeItem)

    listUpdate.splice(removeIndex, 1)
    this.setState({
      toDoItems: listUpdate
    })
    const dataToStorage = JSON.stringify(listUpdate)
    localStorage.setItem("toDoList", dataToStorage)
    this.handleSearch(this.state.searchString)

  }

  handleNewText = e => this.setState({
    currentText: e.target.value
  })

  handleSubmitNew = (e) => {
    e.preventDefault()
    let listUpdate = this.state.toDoItems
    if (!this.state.currentText.length) {
      this.setState({ placeHolderText: "Give your task a name" })
    } else {
      const newListItem = {
        name: this.state.currentText.toUpperCase(),
        done: false,
        id: new Date()
      }
      listUpdate = listUpdate.concat(newListItem)
      this.setState({
        toDoItems: listUpdate,
        currentText: "",
        placeHolderText: ""
      }, () => {
        const dataToStorage = JSON.stringify(this.state.toDoItems)
        localStorage.setItem("toDoList", dataToStorage)
        this.handleSearch(this.state.searchString)
      })
      const dataToStorage = JSON.stringify(listUpdate)
      localStorage.setItem("toDoList", dataToStorage)
      this.handleSearch(this.state.searchString)
    }
  }

  handleSearchChange = (e) => {
    const currentSearch = e.target.value
    this.handleSearch(currentSearch)
  }

  handleSearch = (newUserSearch) => {
    const currentSearch = newUserSearch
    let currentFilter = []
    if (currentSearch !== "") {
      currentFilter = this.state.toDoItems.filter((item) => {
        return item.name.toLowerCase().includes(currentSearch.toLowerCase())
      })
    } else {
      currentFilter = this.state.toDoItems
    }
    this.setState({
      filteredItems: currentFilter,
      searchString: currentSearch
    })
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

          {this.state.filteredItems.map((item, index) => {
            return <ToDoItem
              key={index}
              taskID={item.id}
              name={item.name}
              status={item.done}
              handleBoxCheck={() => this.handleBoxCheck(item.done, item.id)}
              removeItem={() => this.removeItem(item.id)} />
          })}

          <form className="list-section__formField" onSubmit={this.handleSubmitNew}>
            <input
              className="list-section__addField"
              type="text"
              value={this.state.currentText}
              placeholder={this.state.placeHolderText}
              onChange={this.handleNewText} />
            <input className="list-section__addButton" type="submit" value="+" />
          </form>
        </section>
        <section className="search-section">
          <img className="searchicon" src="./searchicon.png" alt="search" />
          <input
            type="text"
            className="searchBar"
            onChange={this.handleSearchChange}
            value={this.state.searchString} />
          <input type="button" className="clearButton" value="C" onClick={() => this.handleSearch("")} />
        </section>
      </div>
    )
  }

}

export default App
