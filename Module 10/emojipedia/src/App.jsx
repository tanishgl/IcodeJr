import EmojiBox from "./EmojiBox";
import emojis from "./emojis.json";
import "./App.css";

const App = () => {
  return (
    <>
      <h1 className="header">Welcome to Emojipedia</h1>
      <div className="box">
        {emojis.map((emoji, idx) => {
          return <EmojiBox key={idx} emote={emoji}></EmojiBox>;
        })}
      </div>
    </>
  );
};

export default App;
