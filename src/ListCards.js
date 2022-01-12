import React, { Component } from 'react';
import axios from 'axios';

class ListCards extends Component {
    constructor(props) {
        super(props);
        this.state = { deck: '', card: '', imgSRC: null, remainingCards: '53' };
        this.generateCard = this.generateCard.bind(this);
    }
    async componentDidMount() {
        const URL = `https://deckofcardsapi.com/api/deck/new/shuffle`
        let response = await axios.get(URL);
        let deckId = response.data.deck_id;
        this.setState({ deck: deckId })
    }
    // https://deckofcardsapi.com/api/deck/${deck_id}/draw/
    async generateCard() {
        if (this.state.remainingCards > 0) {
            let URL_Card = `https://deckofcardsapi.com/api/deck/${this.state.deck}/draw/`
            let newCard = await axios.get(URL_Card);
            let newRemainingCards = newCard.data.remaining;
            let newImgSrc = newCard.data.cards[0].image;
            this.setState({ imgSRC: newImgSrc, remainingCards: newRemainingCards });
        } else {
            alert('No more cards available on the deck')
        }
    }
    render() {
        return (
            <div>
                <h1>ListCards Component</h1>
                <button onClick={this.generateCard}> Generate Card</button>
                <img alt='card' src={this.state.imgSRC}></img>
            </div>
        )
    }
}

export default ListCards;
