import PropTypes from 'prop-types';
import React, { Component } from 'react';
import TodoItem from './TodoItem';
import Footer from './Footer';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters';

const TODO_FILTERS = {
    [SHOW_ALL]: () => true,
    [SHOW_ACTIVE]: todo => !todo.completed,
    [SHOW_COMPLETED]: todo => todo.completed,
};

class MainSection extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = { filter: SHOW_ALL };
        this.handleClearCompleted = this.handleClearCompleted.bind(this);
        this.handleShow = this.handleShow.bind(this);
    }

    handleClearCompleted() {
        this.props.actions.clearCompleted();
    }

    handleShow(filter) {
        this.setState({ filter });
    }
    renderToggleAll(completedCount) {
        const { todos, actions } = this.props;
        if (todos.length > 0) {
            return (
                <input
                    className="toggle-all"
                    type="checkbox"
                    checked={completedCount === todos.length}
                />
            );
        }
        return null;
    }

    renderToggleAllLabel() {
        const { todos, actions } = this.props;
        if (todos.length > 0) {
            return (
                <label onClick={actions.completeAll}
                    htmlFor="toggle-all">Mark all as complete</label>
            );
        }
        return null;
    }

    renderFooter(completedCount) {
        const { todos } = this.props;
        const { filter } = this.state;
        const activeCount = todos.length - completedCount;

        if (todos.length) {
            return (
                <Footer
                    completedCount={completedCount}
                    activeCount={activeCount}
                    filter={filter}
                    onShow={this.handleShow}
                    onClearCompleted={this.handleClearCompleted}
                />
            );
        }

        return null;
    }
    render() {
        const { todos, actions } = this.props;
        const { filter } = this.state;

        const filteredTodos = todos.filter(TODO_FILTERS[filter]);
        const completedCount = todos.reduce(
            (count, todo) => (todo.completed ? count + 1 : count),
            0);


        return (
            <section className="main">
                {this.renderToggleAll(completedCount)}
                {this.renderToggleAllLabel()}
                <ul className="todo-list">
                    {filteredTodos.map(todo =>
                        <TodoItem key={todo.id} todo={todo} {...actions} />
                    )}
                </ul>
                {this.renderFooter(completedCount)}
            </section>
        );
    }
}

MainSection.propTypes = {
    todos: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
};

export default MainSection;