import styles from "./index.module.css";
import React from "react";
import useTypewriterEffect, {
  Cursor,
  deleteAll,
  deleteSome,
  historize,
  pauseFor,
  type,
} from "../components/useTypewriterEffect";
import typewriterStyles from "../components/Typewriter.module.css";

function temp() {
  const [state, dispatch, isTyping] = useTypewriterEffect();
  //const [toType, setToType] = React.useState("");

  React.useEffect(() => {
    type(dispatch, "Hello my name is Vincent!\n");
    pauseFor(dispatch, 500);
    type(dispatch, " I'm a cs student");
    deleteSome(dispatch, 10);
    type(dispatch, "software engineer\n");
    pauseFor(dispatch, 500);
    type(dispatch, "Welcome to my website :)!");
  }, []);

  const sentences = state.split("\n");
  const lastSentence = sentences.pop();
  return (
    <main className={styles.container}>
      {/*<form
        onSubmit={(e) => {
          e.preventDefault();
          type(dispatch, toType);
          setToType("");
        }}
      >
        <input value={toType} onChange={(e) => setToType(e.target.value)} />
        <button>OK</button>
    </form>*/}
      <div className={typewriterStyles.shell}>
        {sentences.map((sen, i) => (
          <p key={i}>{sen}</p>
        ))}
        <p>
          {lastSentence}
          <Cursor className={typewriterStyles.Cursor} typing={isTyping} />
        </p>
      </div>
    </main>
  );
}

export default temp;
