import styles from "./index.module.css";
import React from "react";
import useTypewriterEffect, {
    getTypewriter,
    useCursor,
} from "use-typewriter-effect";
import typewriterStyles from "../components/Typewriter.module.css";

function temp() {
    const [state, dispatch, isTyping] = useTypewriterEffect();
    const cursor = useCursor(isTyping);

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
            <input type="text" placeholder={lastSentence}/>

            <div className={typewriterStyles.shell}>
                {sentences.map((sen, i) => (
                    <p key={i}><span style={{color:"cyan"}}>$</span> {sen}</p>
                ))}
                <p>
                    <span style={{color:"cyan"}}>$</span> {lastSentence}
                    <span className={typewriterStyles.cursor} style={{visibility: cursor ? "visible" : "hidden"}}>|</span>
                </p>
            </div>
        </main>
    );
}

export default temp;
