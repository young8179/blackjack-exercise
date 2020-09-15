let playerHand = [];
let dealerHand = [];
let gameDeck = [];
window.addEventListener('DOMContentLoaded', function() {
  function deal(deck, target) {
    // remove a card from the deck
    const currentCard = deck.pop();
    // check who to deal to
    if (target === 'player') {
      // give that card to the player
      playerHand.push(currentCard);
    } else if (target === 'dealer') {
      // give that card to the dealer
      dealerHand.push(currentCard);
    }
  }
  function getCardImage(card) {
    // create a new img element
    const cardImage = document.createElement('img');
    // set the src attribute
    if (card.rank === 1) {
      cardImage.setAttribute('src', `images/ace_of_${card.suit}.png`);
    } else if (card.rank === 11) {
      cardImage.setAttribute('src', `images/jack_of_${card.suit}.png`);
    } else if (card.rank === 12) {
      cardImage.setAttribute('src', `images/queen_of_${card.suit}.png`);
    } else if (card.rank === 13) {
      cardImage.setAttribute('src', `images/king_of_${card.suit}.png`);
    } else {
      cardImage.setAttribute('src', `images/${card.rank}_of_${card.suit}.png`);
    }
    // return the newly created card image
    return cardImage
  }
  function render() {
    const dealerHandElement = document.querySelector('#dealer-hand');
    const playerHandElement = document.querySelector('#player-hand');
    dealerHandElement.innerHTML = ''
    playerHandElement.innerHTML = ''
    for (let index = 0; index < dealerHand.length; index++) {
      const card = dealerHand[index];
      // deal to dealer
      const cardElement = getCardImage(card)
      dealerHandElement.appendChild(cardElement);
    }
    for (let index = 0; index < playerHand.length; index++) {
      const card = playerHand[index];
      // deal to dealer
      const cardElement = getCardImage(card)
      playerHandElement.appendChild(cardElement);
    }
    const playerPoints = calculatePoints(playerHand);
    document.querySelector('#player-points').textContent = playerPoints;
    const dealerPoints = calculatePoints(dealerHand);
    document.querySelector('#dealer-points').textContent = dealerPoints;
  }
  function generateDeck() {
    let deck = [];
    const suits = [
      'clubs',
      'spades',
      'hearts',
      'diamonds'
    ]
    for (let suitIndex = 0; suitIndex < suits.length; suitIndex++) {
      const currentSuit = suits[suitIndex];
      for (let rank = 1; rank <= 13; rank++) {
        const card = {
          rank: rank,
          suit: currentSuit,
        };
        deck.push(card);
      }
    }
    shuffle(deck)
    return deck;
  }
  function shuffle(deck) {
    for (let i = deck.length; i > 0; i--) {
      const randIndex = Math.floor(Math.random() * i);
      const temporary = deck[randIndex]
      deck[randIndex] = deck[i];
      deck[i] = temporary;
    }
  }
  function calculatePoints(deck) {
    let points = 0;
    let aces = 0;
    for (let i = 0; i < deck.length; i++) {
      const currentCard = deck[i];
      if (currentCard.rank > 1 && currentCard.rank < 11) {
        // handle 2 - 10 cards
        points += currentCard.rank;
      } else if (currentCard.rank >= 11) {
        points += 10;
      } else if (currentCard.rank === 1) {
        //handle aces
        aces++;
        points += 11;
      }
    }
    while (points > 21 && aces > 0) {
      points -= 10;
      aces--;
    }
    return points;
  }
  function checkBusts() {
    if (calculatePoints(playerHand) > 21) {
      message('Player Bust');
    } else if (calculatePoints(dealerHand) > 21) {
      message('Dealer Bust');
    }
  }
  function message(text) {
    document.querySelector('#messages').textContent = text
  }
  gameDeck = generateDeck();
  // const dealButton = document.getElementById('deal-button');
  const dealButton = document.querySelector('#deal-button');
  dealButton.addEventListener('click', function() {
    deal(gameDeck, 'player')
    deal(gameDeck, 'dealer')
    deal(gameDeck, 'player')
    deal(gameDeck, 'dealer')
    render()
  })
  const hitButton = document.querySelector('#hit-button');
  hitButton.addEventListener('click', function() {
    deal(gameDeck, 'player')
    if (calculatePoints(dealerHand) < 17) {
      deal(gameDeck, 'dealer')
    }
    checkBusts()
    render()
  })
  const standButton = document.querySelector('#stand-button');
  standButton.addEventListener('click', function() {
    const dealerPoints = calculatePoints(dealerHand);
    const playerPoints = calculatePoints(playerHand);
    if (dealerPoints < 17) {
      deal(gameDeck, 'dealer')
    } else if (dealerPoints > playerPoints) {
      message('Dealer Wins')
    } else if (dealerPoints === playerPoints) {
      message('Draw')
    } else {
      message('Player Wins')
    }
  })
})