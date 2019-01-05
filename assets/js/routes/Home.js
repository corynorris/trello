import { h, render, Component } from "preact";
import Header from "../components/Header";
import { connect } from "preact-redux";
import { addTodo, removeTodo } from "../actions";
import FormField from "preact-material-components/FormField";
import "preact-material-components/FormField/style.css";
import TextField from "preact-material-components/TextField";
import "preact-material-components/TextField/style.css";

import List from "preact-material-components/List";
import "preact-material-components/List/style.css";

class Home extends Component {
  addTodos = () => {
    this.props.addTodo(this.state.text);
    this.setState({ text: "" });
  };

  removeTodo = todo => {
    this.props.removeTodo(todo);
  };

  updateText = e => {
    console.log("update text: ", e.target.value);
    this.setState({ text: e.target.value });
  };

  render({ todos }, { text }) {
    return (
      <div id="app">
        <Header />
        <div class="page">
          <form onSubmit={this.addTodos} action="javascript:">
            <FormField>
              <TextField label="todo" value={text} onInput={this.updateText} />
            </FormField>
          </form>
          <List>
            {todos.map(todo => (
              <List.Item key={todo.id}>{todo.text}</List.Item>
            ))}
          </List>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  todos: state.todos,
  text: state.text
});

const mapDispatchToProps = dispatch => ({
  addTodo: id => dispatch(addTodo(id)),
  removeTodo: id => dispatch(removeTodo(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
