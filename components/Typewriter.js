import React from "react";
import styles from "./Typewriter.module.css"


function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}


function Cursor({ typing }) {
    const [toggler, setToggler] = React.useState(true);
    React.useEffect(() => {
        const id = setInterval(() => {
            setToggler(prev => !prev)
        }, 500);

        return () => {
            clearInterval(id);
        };
    }, []);

    return <span className={styles.cursor}>{typing ? "|" : toggler ? "|" : ""}</span>;
}

function Message({ message, delay }) {
    const [typewriterState, setTypewriterState] = React.useState({
        index: 0,
    });
    const { index } = typewriterState;

    const isTyping = index <= message.length;

    React.useEffect(() => {

        let counter = delay;
        const writer = function () {
            setTypewriterState((prev) => {
                /*
                const accelerate = prev.index > message.length / 3;
                const upperBorn = accelerate ? delay : delay + 30;
                const minBorn = accelerate ? delay - 30 : delay*/
                counter = getRandomArbitrary(60, 120);
                setTimeout(writer, counter);

                return ({
                    ...prev,
                    index: prev.index > message.length ? prev.index : prev.index + 1,
                })
            });
        }
        setTimeout(writer, counter);
        /*const id = setInterval(() => {
            setTypewriterState((prev) => {
                return ({
                    ...prev,
                    index: prev.index > message.length ? prev.index : prev.index + 1,
                })
            });
        }, typeSpeed);

        return () => {
            clearInterval(id);
        };*/
    }, [delay]);

    return <p className={styles.shell}>{message.substring(0, index)}{<Cursor typing={isTyping} />}</p>;
}


function Typewriter({ message, delay }) {
    return (
        <Message message={message} delay={delay}></Message>
    )
}
export default Typewriter;
