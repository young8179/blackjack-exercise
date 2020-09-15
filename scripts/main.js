

window.addEventListener('DOMContentLoaded', function() {
  // Execute after page load
})


const hitButton = document.getElementById("hit-button")
const dealButton = document.getElementById("deal-button");
const dealerHand = document.getElementById("dealer-hand");
const playerHand = document.getElementById("player-hand");


//--------creating a deck--------------------
const cardNum = [2, 3, 4, 5, 6, 7, 8, 9, 10, "ace", "jack", "king", "queen"]
const cardShap = ["clubs", "diamonds", "hearts", "spades"]


function buildDeck(){
  let deck = []
  for (let i = 0; i < cardNum.length; i++) {
    
    for (let j = 0; j < cardShap.length; j++) {
      let myCard = {
        rank: cardNum[i],
        suit: cardShap[j]
        
      }
      deck.push(myCard)
      
    }
    
  }
  
  
  return deck


}
let newDeck = buildDeck()





//--------shuffle---------------------
function shuffle(array){
  let currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain cards to shuffle
  while (0 !== currentIndex){
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    //swap it with current element
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array
}
let shuffleDeck = shuffle(newDeck)


console.log(shuffleDeck)


//------------point----------------
function pointCal(player){
  let point = 0
  for (let i = 0; i < player.length; i++) {
    if(Number.isInteger(player[i].rank)){
      point += player[i].rank
    }else if(player[i].rank === "jack" || player[i].rank === "queen" || player[i].rank === "king"){
      point += 10
    }else if(player[i].rank ==="ace"){
      if(point > 10){
        point += 1;
      }else if(point <= 10){
        point += 11;
      }
    }
    
  }
  return point

}




dealerCard = [];
playerCard = [];

//-------------------deal button----------------------------------------------------------------
function deal(){
  //------------------------------------------player---------------------------------------------
  //-----delete card from deck and adding card into playercard-----
  playerCard.push(newDeck.pop());
  playerCard.push(newDeck.pop());
  console.log(playerCard);
  //---------display card------------
  let cardForPlayer = document.createElement("img");
  cardForPlayer.setAttribute("src", `./images/${playerCard[0].rank}_of_${playerCard[0].suit}.png`);
  let cardForPlayer2 = document.createElement("img");
  cardForPlayer2.setAttribute("src", `./images/${playerCard[1].rank}_of_${playerCard[1].suit}.png`);
  //----------------point for player---------------
  let pointForPlayer = pointCal(playerCard);
  console.log(pointForPlayer);

  let plPoint = document.getElementById("player-points");
  plPoint.textContent = `${pointForPlayer}`;


  playerHand.appendChild(cardForPlayer);
  playerHand.appendChild(cardForPlayer2);
  
  


  //-------------------------------;--------------dealer--------------------------------------------
  dealerCard.push(newDeck.pop());
  dealerCard.push(newDeck.pop());
  console.log(dealerCard);
  
  let cardFordealer = document.createElement("img");
  cardFordealer.setAttribute("src", `./images/${dealerCard[0].rank}_of_${dealerCard[0].suit}.png`);
  let cardFordealer2 = document.createElement("img");
  cardFordealer2.setAttribute("src", `./images/${dealerCard[1].rank}_of_${dealerCard[1].suit}.png`);
  dealerHand.appendChild(cardFordealer);
  dealerHand.appendChild(cardFordealer2);
  //------------point for dealer----------
  let pointForDealer = pointCal(dealerCard);
  console.log(pointForDealer)

  let dlPoint = document.getElementById("dealer-points");
  dlPoint.textContent = `${pointForDealer}`;
  
  }
dealButton.addEventListener("click", deal);

    
    
//--------------------hit button-------------------------------

function hit(){
  playerCard.push(newDeck.pop());
  console.log(playerCard);
  
  let hitForPlayer = document.createElement("img");
  hitForPlayer.setAttribute("src", `./images/${playerCard[playerCard.length -1].rank}_of_${playerCard[playerCard.length -1].suit}.png`);
  playerHand.appendChild(hitForPlayer);
//---------point for player for hit------
  let pointForPlayer = pointCal(playerCard);
  
  let plPoint = document.getElementById("player-points");
  plPoint.textContent = `${pointForPlayer}`;


//------delete from deck and add card into dealerCard
  dealerCard.push(newDeck.pop());
  console.log(dealerCard);
//------display card for dealer--------
  let hitForDealer = document.createElement("img");
  hitForDealer.setAttribute("src", `./images/${dealerCard[dealerCard.length -1].rank}_of_${dealerCard[dealerCard.length -1].suit}.png`);
  dealerHand.appendChild(hitForDealer);  
//-------point for dealer-------
  let pointForDealer = pointCal(dealerCard);
  
  let dlPoint = document.getElementById("dealer-points");
  dlPoint.textContent = `${pointForDealer}`;


  //---------------Busts---------------
  let message = document.getElementById("messages")
  if(pointForPlayer > 21){
    message.textContent += "Player Busts\n"
  }
  if(pointForDealer > 21){
    message.textContent += "Dealer Busts\n"
  }

  }
  hitButton.addEventListener("click", hit);
    
    
    
//--------------------------------stand------------------------------------------
  
  
const standButton = document.getElementById("stand-button")

function standClick(){
  let message = document.getElementById("messages")
  let pointForPlayer = pointCal(playerCard);
  let pointForDealer = pointCal(dealerCard)
  if(pointForDealer < 17){
    dealerCard.push(newDeck.pop());
    let hitForDealer = document.createElement("img");
    hitForDealer.setAttribute("src", `./images/${dealerCard[dealerCard.length -1].rank}_of_${dealerCard[dealerCard.length -1].suit}.png`);
    dealerHand.appendChild(hitForDealer); 
    let dlPoint = document.getElementById("dealer-points");
    pointForDealer = pointCal(dealerCard)
    dlPoint.textContent = `${pointForDealer}`;
      if(pointForDealer > 21){
        message.textContent = "Dealer Busts/// player Win"
      }
  }else if (pointForDealer > pointForPlayer) {
    message.textContent = 'Dealer Wins'
  } else if (pointForDealer === pointForPlayer) {
    message.textContent = 'Draw'
  } else {
    message.textContent = 'Player Wins'
}
}
standButton.addEventListener("click", standClick)
  
  
  
