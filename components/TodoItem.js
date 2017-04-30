import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      text: this.props.todo.text
    };
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
  }
  
  componentDidUpdate(){
    this.textInput.focus();
  }
  handleDoubleClick() {
    this.setState({ editing: true });
  }

  handleTextChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSave(id, text) {
    if (text.length === 0) {
      this.props.deleteTodo(id);
    } else {
      this.props.editTodo(id, text);
    }
    this.setState({ editing: false });
  }

  handleKeyDown(id, e) {
    //13表示回车键
    if (e.keyCode !== 13) {
      return;
    }
    e.preventDefault();
    this.handleSave(id, this.state.text);
  }

  render() {
    const { todo, completeTodo, deleteTodo } = this.props;

    return (
      <li className={classnames({ completed: todo.completed, editing: this.state.editing })}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.completed}
            onChange={() => completeTodo(todo.id)} />
          <label onDoubleClick={this.handleDoubleClick}>{todo.text}</label>
          <button className="destroy" onClick={() => deleteTodo(todo.id)}></button>
        </div>
        <input
          className="edit"
          value={this.state.text}
          ref={(input) => { this.textInput = input; }}
          onChange={(e) => this.handleTextChange(e)}
          onBlur={() => this.handleSave(todo.id, this.state.text)}
          onKeyDown={(e) => this.handleKeyDown(todo.id, e)}
          autoFocus={this.state.editing}
        />
      </li>
    );
  }
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  editTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  completeTodo: PropTypes.func.isRequired,
};

export default TodoItem;
