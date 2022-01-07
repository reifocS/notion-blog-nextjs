import styles from "./index.module.css";
import React from "react";
import useTypewriterEffect, {
    Cursor,
    getTypewriter,
} from "../components/useTypewriterEffect";
import typewriterStyles from "../components/Typewriter.module.css";

function temp() {
    const [state, dispatch, isTyping] = useTypewriterEffect();

    React.useEffect(() => {
        getTypewriter(dispatch)
            .type("Hello world!\n")
            .type(" How are you?")
            .pauseFor(1000)
            .deleteAll()
            .type("This is a typewriter effect")
            .pauseFor(1000)
            .deleteSome(6)
            .type("hook!")
            .pauseFor(1000)
            .deleteAll()
            .setLoop(true)
            .trigger()
    }, [dispatch]);

    const sentences = state.split("\n");
    const lastSentence = sentences.pop();
    return (
        <main className={styles.container}>
            <div className={typewriterStyles.shell}>
                {sentences.map((sen, i) => (
                    <p key={i}><span style={{color:"cyan"}}>$</span> {sen}</p>
                ))}
                <p>
                    <span style={{color:"cyan"}}>$</span> {lastSentence}
                    <Cursor className={typewriterStyles.Cursor} typing={isTyping} />
                </p>
            </div>
        </main>
    );
}

export default temp;
