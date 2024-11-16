import "./emojiStyle.css";

const EmojiBox = ({ emote }) => {
  const { emoji, name, description } = emote;
  return (
    <div className="emojibox">
      <h2>{emoji}</h2>
      <h1 className="title">{name}</h1>
      <p className="desc">{description}</p>
    </div>
  );
};

export default EmojiBox;
