let deckId
let remainingPlay

const drawCardBtn = document.getElementById("draw-cards");
const cardSlot = document.getElementsByClassName('card-slot')
const newDeckBtn = document.getElementById("new-deck")
const headerText = document.getElementById("header")
const remainingText = document.getElementById('remainingText')
const ComputerScore = document.getElementById('ComputerScore')
const MyScore = document.getElementById('MyScore')


// use async and await is to tell js to wait for response then move to other step
async function handleClick() {
    const res = await fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    const data = await res.json()
    deckId = data.deck_id
    remainingText.textContent = `Remaining : ${data.remaining}`
     /*Initialise */
     headerText.textContent = "Game of War"
     cardSlot[0].innerHTML = ``;
     cardSlot[1].innerHTML = ``;
     ComputerScore.textContent = `Computer  `
     MyScore.textContent = `My :  `
     card1Score = 0
     card2Score = 0
    // console.log(data);
    // document
    drawCardBtn.disabled = false;
        /*how its done */
    /* fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            deckId = data.deck_id
            remainingText.textContent = `Remaining : ${data.remaining}`
            console.log(data);
            // document
        })
 */}

let card1Score = 0
let card2Score = 0

newDeckBtn.addEventListener("click", handleClick)
/* metode 1 */
function determineCardWinner(card1, card2) {
    const valueOption = ['2', '3', '4', '5', '6', '7', '8', '9', '10', "JACK", "QUEEN", "KING", "ACE"]
    const card1ValueIndex = valueOption.indexOf(card1.value)
    const card2ValueIndex = valueOption.indexOf(card2.value)
    let Winner = ""

    if (card1ValueIndex > card2ValueIndex) {
        Winner = "Computer Win"
        card1Score++
        ComputerScore.textContent = `Computer : ${card1Score} `
    }
    else if (card2ValueIndex > card1ValueIndex) {
        Winner = "You Win"
        card2Score++
        MyScore.textContent = `My : ${card2Score} `
    }
    else {
        Winner = "You are Equals"
    }
    return Winner
}

/* metode 2 */
/*
function convertValue(card) {
    let storeCard = card
    if (card === 'JACK') {
        storeCard = 11
    }
    else if (card === 'QUEEN') {
        storeCard = 12
    }
    else if (card === 'KING') {
        storeCard = 13
    }
    else if (card === 'ACE') {
        storeCard = 14
    }
    else {
        storeCard = card
    }
    return storeCard
}

function CompareCards(card1, card2) {
    let carte1 = convertValue(card1)
    let carte2 = convertValue(card2)
    let WinnerText = ""
    if (carte1 > carte2) {
        WinnerText= 'carte1 win'
    }
    else if (carte1 < carte2) {
        WinnerText= 'carte2 win'
    }
    else {
        WinnerText= 'they are equal'
    }
    return WinnerText
}

*/


drawCardBtn.addEventListener("click", async () => {
    if (deckId) {
        const res = await fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        const data = await res.json()
        cardSlot[0].innerHTML = `<img  src="${data.cards[0].image}" > </div>`;
        cardSlot[1].innerHTML = `<img  src="${data.cards[1].image}" > </div>`;
        //disable btn when remaining equal 0
        let Winner = determineCardWinner(data.cards[0], data.cards[1])
        console.log('card1Score', card1Score);
        console.log('card2Score', card2Score);
        if (!data.remaining) {
            remainingText.textContent = `Remaining : ${data.remaining}`
            drawCardBtn.disabled = true;

            if (card1Score > card2Score) {
                Winner = "Computer Win"
                console.log("1");
            }
            else if (card1Score < card2Score) {
                Winner = "You Win"
                console.log("2");
            }
            else {
                Winner = "You are Equal"
                console.log("2");
            }
        }

        remainingText.textContent = `Remaining : ${data.remaining}`
        headerText.textContent = Winner
    }
    else {
        alert('please Click new Deck First ')
    }
})


/**
 * Challenge:
 * 
 * Display the images of the 2 cards you drew in the browser.
 * Probably best to use `innerHTML` to insert a couple <img> elements
 * on the page.
 */