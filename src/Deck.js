import React, { Component } from 'react';
import axios from 'axios';
import Card from './Card';
import './Deck.css'

const API_URL = `https://deckofcardsapi.com/api/deck/new/shuffle`;

class Deck extends Component {
    constructor(props) {
        super(props);
        this.state = { deck: null, cards: [], imgSRC: null };
        this.generateCard = this.generateCard.bind(this);
    }
    async componentDidMount() {
        let response = await axios.get(API_URL);
        let newDeck = response.data;
        this.setState({ deck: newDeck, cards: [] })
    }
    async generateCard() {
        try {
            let URL_Card = `https://deckofcardsapi.com/api/deck/${this.state.deck.deck_id}/draw/`
            let cardRes = await axios.get(URL_Card);
            if (!cardRes.data.success) {
                throw new Error('No more cards remaining');
            }
            let card = cardRes.data.cards[0];
            this.setState(st => ({
                cards: [
                    ...st.cards,
                    {
                        id: card.code,
                        image: card.image,
                        name: `${card.value} OF ${card.suit}`
                    }
                ]
            }));
        } catch (err) {
            alert(err);
        }
    }
    render() {
        const cards = this.state.cards.map(c => {
            return <Card key={c.id} image={c.image} name={c.name} />
        })
        return (
            <div className='Deck'>
                <h1>Card Dealer</h1>
                <button onClick={this.generateCard}> Generate Card</button>
                <div className='Deck-cards'>{cards}</div>
            </div>
        )
    }
}

export default Deck;
