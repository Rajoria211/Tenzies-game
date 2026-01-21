export default function Die(props) {
  const BgColor = props.isHeld ? "#59E391" : "white";

  return (
    <button
      onClick={() => {
        props.hold(props.id);
      }}
      style={{ backgroundColor: BgColor }}
      aria-pressed={props.isHeld}
      aria-label={`Die with a value of ${props.value},${props.isHeld ? "held" : "not held"}`}
    >
      {props.value}
    </button>
  );
}
