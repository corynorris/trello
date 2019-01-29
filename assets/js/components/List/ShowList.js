import { h, render, Component } from "preact";
import AddCard from "../Card/AddCard";
import ListCards from "../Card/ListCards";
import ListTitle from "../List/ListTitle";
import "preact-material-components/Button/style.css";
import "preact-material-components/TextField/style.css";

class ShowList extends Component {
  render({ channel, list, createCard, updateList }) {
    return (
      <div>
        <div
          style={{
            background: "white",
            color: "#444",
            padding: "1.0em 1.3em",
            borderRadius: "4px",
            boxShadow: "none"
          }}
        >
          <ListTitle list={list} updateList={updateList} channel={channel} />
          <ListCards cards={list.cards} />
          <AddCard channel={channel} list={list} createCard={createCard} />
        </div>
      </div>
    );
  }
}

export default ShowList;
