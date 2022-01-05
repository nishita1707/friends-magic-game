import "./SingleCard.css";

export default function SingleCard({card, handleChoice, flipped,disabled}) {

    const handleClick = () => {
        if(!disabled) {
         handleChoice(card)
        }
    }
  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img
          width="125px"
          height="125px"
          className="front"
          src={card.src}
          alt="card front"
        />
        <img
          width="125px"
          height="125px"
          className="back"
          src="cover.jpg"
          onClick={handleClick}
          alt="card back"
        />
      </div>
    </div>
  );
}
