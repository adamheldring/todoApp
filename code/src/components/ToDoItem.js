import React from "react"

class ToDoItem extends React.Component {

  render() {
    return (
      <div>
        <input
          id={this.props.taskID}
          type="checkbox"
          checked={this.props.status}
          onChange={this.props.handleBoxCheck} />
        <label htmlFor={this.props.taskID} className={(this.props.status) ? "list-section__item--checked" : ""}>{this.props.name} </label>
        <a href="#" onClick={this.props.removeItem}>X</a>
      </div>
    )
  }
}

export default ToDoItem
