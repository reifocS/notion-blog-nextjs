import styles from "./index.module.css";
import React from "react";
import useTypewriterEffect, {
  getTypewriter,
  useCursor,
} from "../components/useTypewriterEffect";
import typewriterStyles from "../components/Typewriter.module.css";
import Fable from "../components/Fable";
import SyntaxHighlighter from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/cjs/styles/hljs";

const cv = `const skills = [
  "javascript",
  "HTML",
  "CSS",
  "React",
  "Java",
  "Spring",
  "Python",
];
const job = "full stack developper";
const study = "computer science";

const VincentEscoffier = {
  skills,
  job,
  study,
  lookingFor: "Summer internship",
};`;

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

  React.useEffect(() => {
    getTypewriter(dispatch)
      .type(cv)
      .pauseFor(1000)
      .type("\nconsole.log('feel free to cnotact")
      .deleteSome("7")
      .type("contact me!')")
      .replaceSpaceByTabs()
      .trigger();
  }, [dispatch]);

  return (
    <SyntaxHighlighter language="javascript" style={darcula}>
    {code}
  </SyntaxHighlighter>  );
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
