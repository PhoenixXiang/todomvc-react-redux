import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { text: '' }
        this.handleNewTodoKeyDown = this.handleNewTodoKeyDown.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
    }

    handleNewTodoKeyDown(e) {
        //13表示回车键
        if (e.keyCode !== 13) {
            return;
        }
        e.preventDefault();
        var val = e.target.value.trim();
        if (val) {
            this.props.addTodo(val);
        }
        this.setState({ text: '' });
    }

    handleTextChange(e) {
        this.setState({ text: e.target.value });
    }

    render() {
        return (
            <header className="header">
                <h1>todos</h1>
                <input
                    value={this.state.text}
                    className="new-todo"
                    placeholder="What needs to be done?"
                    onKeyDown={this.handleNewTodoKeyDown}
                    onChange={this.handleTextChange}
                    autoFocus />
            </header>
        );
    }
}

Header.propTypes = {
    addTodo: PropTypes.func.isRequired
};

export default Header;