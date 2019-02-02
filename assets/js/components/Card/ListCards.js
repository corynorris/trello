import { h, render, Component } from "preact";
import ShowCard from "./ShowCard";

class ListCards extends Component {
  render({ cards, handleDropCard }) {
    return (
      <div>
        {cards
          .sort((a, b) => a.position - b.position)
          .map(card => (
            <ShowCard id={card.id} {...card} onDrop={handleDropCard} />
          ))}
      </div>
    );
  }
}

export default ListCards;
