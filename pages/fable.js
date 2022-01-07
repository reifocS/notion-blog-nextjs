import styles from "./index.module.css";
import React from "react";
import useTypewriterEffect, {
    getTypewriter,
} from "use-typewriter-effect";

const fable = `One bright day in late autumn a family of Ants were bustling about in the warm sunshine, drying out the grain they had stored up during the summer, when a starving Grasshopper, his fiddle under his arm, came up and humbly begged for a bite to eat.
"What!" cried the Ants in surprise, "haven't you stored anything away for the winter? What in the world were you doing all last summer?"
"I didn't have time to store up any food," whined the Grasshopper; "I was so busy making music that before I knew it the summer was gone."
The Ants shrugged their shoulders in disgust.
"Making music, were you?" they cried. "Very well; now dance!" And they turned their backs on the Grasshopper and went on with their work.
There's a time for work and a time for play.`;

const lineByLine = fable.split("\n");

function Reader() {
  const [state, dispatch, typing, history] = useTypewriterEffect();
  const [storyState, setStoryState] = React.useState(0);
  React.useEffect(() => {
    getTypewriter(dispatch)
      .setDelay(10)
      .type(lineByLine[0])
      .historize()
      .trigger();
    setStoryState((prev) => prev + 1);
  }, [dispatch]);

  return (
    <div
      style={{
        backgroundColor: "white",
        color: "black",
        backgroundColor: "white",
        color: "black",
        padding: "16px",
        borderRadius: "16px",
        height: "90vh",
        fontSize: "1.5rem",
        overflow: "auto",
        fontStyle: "italic",
      }}
    >
      {history.map((p, i) => (
        <p
          style={{
            marginBottom: 20,
          }}
          key={i}
        >
          {p}
        </p>
      ))}
      <p
        style={{
          marginBottom: 20,
        }}
      >
        {state}
      </p>
      <button
        disabled={storyState >= lineByLine.length || typing}
        style={{ backgroundColor: "transparent", border: "none" }}
        onClick={() => {
          getTypewriter(dispatch)
            .setDelay(10)
            .type(lineByLine[storyState])
            .historize()
            .trigger();
          setStoryState((prev) => prev + 1);
        }}
      >
        {storyState >= lineByLine.length ? "The end" : "continue..."}
      </button>
    </div>
  );
}

function Fable() {
  return (
    <main className={styles.container}>
      <Reader />
    </main>
  );
}

export default Fable;
