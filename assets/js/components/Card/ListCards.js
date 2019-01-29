import { h, render, Component } from "preact";
import ShowCard from "./ShowCard";

class ListCards extends Component {
  render({ cards }) {
    console.log(cards);
    return (
      <div>
        {cards.map(card => (
          <ShowCard id={card.id} {...card} />
        ))}
      </div>
    );
  }
}

export default ListCards;
