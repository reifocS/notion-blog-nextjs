import styles from "./index.module.css";
import React from "react";
import useTypewriterEffect, {
  Cursor,
  deleteAll,
  deleteSome,
  pauseFor,
  type,
} from "../components/useTypewriterEffect";
import typewriterStyles from "../components/Typewriter.module.css";

function temp() {
  const [state, dispatch, isTyping] = useTypewriterEffect();
  const [toType, setToType] = React.useState("");

  React.useEffect(() => {
    type(dispatch, "hello world!");
    pauseFor(dispatch, 3000);
    deleteSome(dispatch, 6);
    type(dispatch, "universe!!");
  }, []);

  return (
    <main className={styles.container}>
      <input value={toType} onChange={(e) => setToType(e.target.value)} />
      <button onClick={() => type(dispatch, toType)}>type</button>
      <button onClick={() => deleteAll(dispatch)}>delete all</button>
      <button onClick={() => deleteSome(dispatch, 5)}>delete some</button>

      <p className={typewriterStyles.shell}>
        {state}
        <Cursor className={typewriterStyles.Cursor} typing={isTyping} />
      </p>
    </main>
  );
}

export default temp;
