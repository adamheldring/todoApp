import React from "react"

class ToDoItem extends React.Component {

  render() {
    console.log(this.props.status)
    return (
      <div>
        <input
          type="checkbox"
          checked={this.props.status}
          onChange={this.props.handleBoxCheck} />
        {this.props.name}
      </div>
    )
  }
}

export default ToDoItem
