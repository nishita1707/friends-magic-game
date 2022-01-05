import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";

const cardImages = [
  { "src": "Phoebe.jpg" , matched:false},
  { "src": "Chandler.jpg", matched:false },
  { "src": "Rachel.jpg" , matched:false},
  { "src": "Monica.jpg" , matched:false},
  { "src": "Ross.jpg", matched:false },
  { "src": "Joey.jpg", matched:false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  //Shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards);
    setTurns(0);
  };
  // Handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  };

  // Compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo){
      setDisabled(true)
      if(choiceOne.src === choiceTwo.src){
        setCards( prevCards => {
          return prevCards.map(card => {
            if(card.src === choiceOne.src){
              return {...card, matched: true}
            }else{
              return card
            }
          })
        })
        resetTurn()
      } else{
         setTimeout(() =>  resetTurn(),1000)
      }
    }
  },[choiceOne, choiceTwo])
  console.log(cards)

  // Reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }
  // start new game automatically
   useEffect(() =>{
    shuffleCards()
   }, [])
  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard 
          key={card.id}
          card={card}
          handleChoice={handleChoice}
          flipped={card === choiceOne
          || card === choiceTwo
          || card.matched} 
          disabled={disabled}
          />
        ))}
      </div>
       <h4>Turns: {turns}</h4>
    </div>
  );
}

export default App;
