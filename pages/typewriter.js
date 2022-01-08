import styles from "./index.module.css";
import React, { useRef } from "react";
import useTypewriterEffect, {
  getTypewriter,
  useCursor,
} from "use-typewriter-effect";
import typewriterStyles from "../components/Typewriter.module.css";
import Fable from "../components/Fable";
import Prism from "prismjs";
import "prismjs/components/prism-jsx.min";

const metaCode = `function Code() {
    const [code, dispatch] = useTypewriterEffect();
  
    React.useEffect(() => {
      getTypewriter(dispatch).type(metaCode).trigger();
    }, [dispatch]);
  
    return (
      <pre className="language-jsx">
        <code
          dangerouslySetInnerHTML={{
            __html: Prism.highlight(
              code + "|",
              Prism.languages["javascript"],
              "javascript"
            ),
          }}
          className='language-jsx'
        />
      </pre>
    );
  }`;
function Code() {
  const [code, dispatch, typing] = useTypewriterEffect();
  const cursor = useCursor(typing);

  React.useEffect(() => {
    getTypewriter(dispatch).type(metaCode).trigger();
  }, [dispatch]);

  const highlightedCode = React.useMemo(
    () => Prism.highlight(code, Prism.languages["javascript"], "javascript"),
    [code]
  );

  const cursorToHtml = `<span
  class="${typewriterStyles.cursor} token punctuation"
  style="visibility: ${cursor ? "visible" : "hidden"};"
>|</span>`;

  return (
    <pre className="language-jsx">
      <code
        dangerouslySetInnerHTML={{
          __html: highlightedCode + cursorToHtml,
        }}
        className={`language-jsx`}
      />
    </pre>
  );
}

function Typewriter() {
  const [state, dispatch, isTyping] = useTypewriterEffect();
  const cursor = useCursor(isTyping);

  React.useEffect(() => {
    getTypewriter(dispatch)
      .type("Hello world!\n How are you?")
      .pauseFor(1000)
      .deleteAll()
      .type("This is a typewriter effect")
      .pauseFor(1000)
      .deleteSome(6)
      .type("hook!")
      .pauseFor(1000)
      .deleteAll()
      .setLoop(true)
      .trigger();
  }, [dispatch]);

  const sentences = state.split("\n");
  const lastSentence = sentences.pop();
  return (
    <main className={styles.container}>
      <div className={typewriterStyles.shell}>
        {sentences.map((sen, i) => (
          <p key={i}>
            <span style={{ color: "cyan" }}>$</span> {sen}
          </p>
        ))}
        <p>
          <span style={{ color: "cyan" }}>$</span> {lastSentence}
          <span
            className={typewriterStyles.cursor}
            style={{ visibility: cursor ? "visible" : "hidden" }}
          >
            |
          </span>
        </p>
      </div>
      <Code />
      <Fable />
    </main>
  );
}

export default Typewriter;
