import React from "react";

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

export function Cursor({ typing, className }) {
    const [toggler, setToggler] = React.useState(true);
    React.useEffect(() => {
        const id = setInterval(() => {
            setToggler((prev) => !prev);
        }, 500);

        return () => {
            clearInterval(id);
        };
    }, []);

    return <span className={className}>{typing ? "|" : toggler ? "|" : ""}</span>;
}

const initialState = { eventQueue: [], text: "", history: [] };

const TW_ACTIONS = {
    CONSUME: "consume",
    SET_TEXT: "set_text",
    APPEND_CHARACTER: "append_character",
    DELETE_CHARACTER: "delete_character",
    HISTORIZE_CURRENT: "historize_current"
};

const TW_EVENT = {
    TYPE_CHARACTER: "type_character",
    DELETE_ALL: "delete_all",
    DELETE_CHARACTER: "delete_some",
    TYPE: "type",
    PAUSE: "pause",
    HISTORIZE: "historize"
};

function reducer(state, action) {
    switch (action.type) {
        case TW_EVENT.TYPE:
            const events = action.payload.split("").map((character) => ({
                event: TW_EVENT.TYPE_CHARACTER,
                value: character,
            }));
            return { ...state, eventQueue: [...state.eventQueue, ...events] };
        case TW_EVENT.DELETE_CHARACTER: {
            const events = [];
            for (let i = 0; i < action.payload; ++i) {
                events.push({
                    event: TW_EVENT.DELETE_CHARACTER,
                });
            }
            return { ...state, eventQueue: [...state.eventQueue, ...events] };
        }
        case TW_EVENT.DELETE_ALL:
            return {
                ...state,
                eventQueue: [
                    ...state.eventQueue,
                    { event: TW_EVENT.DELETE_ALL, value: null },
                ],
            };
        case TW_ACTIONS.CONSUME: {
            return {
                ...state,
                eventQueue: state.eventQueue.slice(1, state.eventQueue.length),
            };
        }
        case TW_ACTIONS.SET_TEXT: {
            return {
                ...state,
                text: action.payload,
            };
        }
        case TW_EVENT.PAUSE: {
            return {
                ...state,
                eventQueue: [
                    ...state.eventQueue,
                    { event: TW_EVENT.PAUSE, value: action.payload },
                ],
            };
        }
        case TW_EVENT.HISTORIZE: {
            return {
                ...state,
                eventQueue: [
                    ...state.eventQueue,
                    { event: TW_EVENT.HISTORIZE },
                ],
            }
        }
        case TW_ACTIONS.HISTORIZE_CURRENT: {
            return {
                ...state,
                history: [...state.history, state.text],
                text: ""
            }
        }
        case TW_ACTIONS.APPEND_CHARACTER: {
            return {
                ...state,
                text: state.text + action.payload,
            };
        }
        case TW_ACTIONS.DELETE_CHARACTER: {
            return {
                ...state,
                text: state.text.slice(0, -1),
            };
        }
        default:
            throw new Error();
    }
}

function useTypewriterEffect(initialText) {
    const [state, dispatch] = React.useReducer(reducer, {
        ...initialState,
        eventQueue: initialText
            ? initialText.split("").map((character) => ({
                event: TW_EVENT.TYPE_CHARACTER,
                value: character,
            }))
            : [],
    });

    const { eventQueue, text, history } = state;
    const lastFrameRef = React.useRef();
    const pauseTimeRef = React.useRef();

    React.useEffect(() => {
        function step() {
            if (!eventQueue.length) {
                return;
            }
            raf = requestAnimationFrame(step);

            const actualEvent = eventQueue[0];

            if (!lastFrameRef.current) {
                lastFrameRef.current = Date.now();
            }
            const now = Date.now();
            const delta = now - lastFrameRef.current;

            if (pauseTimeRef.current && pauseTimeRef.current > now) {
                return;
            } else {
                pauseTimeRef.current = null;
            }
            const feelsNatural = getRandomArbitrary(60, 120);
            if (delta < feelsNatural) {
                return;
            }
            lastFrameRef.current = now;

            if (actualEvent.event === TW_EVENT.PAUSE) {
                pauseTimeRef.current = now + actualEvent.value;
            } else if (actualEvent.event === TW_EVENT.TYPE_CHARACTER) {
                dispatch({
                    type: TW_ACTIONS.APPEND_CHARACTER,
                    payload: actualEvent.value,
                });
            } else if (actualEvent.event === TW_EVENT.DELETE_ALL) {
                dispatch({ type: TW_ACTIONS.SET_TEXT, payload: "" });
            } else if (actualEvent.event === TW_EVENT.DELETE_CHARACTER) {
                dispatch({ type: TW_ACTIONS.DELETE_CHARACTER });
            } else if (actualEvent.event === TW_EVENT.HISTORIZE) {
                dispatch({ type: TW_ACTIONS.HISTORIZE_CURRENT });
            }

            dispatch({ type: TW_ACTIONS.CONSUME });
        }

        let raf = requestAnimationFrame(step);

        return () => cancelAnimationFrame(raf);
    }, [eventQueue]);

    return [text, dispatch, eventQueue.length !== 0 && !pauseTimeRef.current, history];
}

export function type(dispatch, character) {
    dispatch({ type: TW_EVENT.TYPE, payload: character });
}

export function deleteAll(dispatch) {
    dispatch({ type: TW_EVENT.DELETE_ALL });
}

export function deleteSome(dispatch, number) {
    dispatch({ type: TW_EVENT.DELETE_CHARACTER, payload: number });
}

export function pauseFor(dispatch, number) {
    dispatch({ type: TW_EVENT.PAUSE, payload: number });
}

export function historize(dispatch) {
    dispatch({ type: TW_EVENT.HISTORIZE });
}

export default useTypewriterEffect;
