import styles from "./index.module.css";
import React from "react";
import useTypewriterEffect, {
    Cursor,
    getTypewriter,
} from "../components/useTypewriterEffect";
import typewriterStyles from "../components/Typewriter.module.css";

function temp() {
    const [state, dispatch, isTyping] = useTypewriterEffect();
    const [state2, dispatch2, isTyping2] = useTypewriterEffect();

    React.useEffect(() => {
        getTypewriter(dispatch).type("Hello world!")
            .pauseFor(1000)
            .type(" How are you?")
            .deleteSome(30)
            .setLoop(true)
            .trigger();

        getTypewriter(dispatch2).type("Hello universe!")
            .pauseFor(1000)
            .type(" How are you?")
            .deleteSome(30)
            .setLoop(true)
            .trigger();
    }, [dispatch, dispatch2]);

    const sentences = state.split("\n");
    const lastSentence = sentences.pop();
    return (
        <main className={styles.container}>
            <div className={typewriterStyles.shell}>
                {sentences.map((sen, i) => (
                    <p key={i}>{sen}</p>
                ))}
                <p>
                    {lastSentence}
                    <Cursor className={typewriterStyles.Cursor} typing={isTyping} />
                </p>
            </div>
            <p style={{color: "green"}}>
                {state2}
                <Cursor className={typewriterStyles.Cursor} typing={isTyping2} />
            </p>
        </main>
    );
}

export default temp;
