import { createContext, useCallback, useEffect, useReducer, useRef } from "react";
// import PropTypes from "prop-types";

// import "primereact/resources/themes/mira/theme.css";
// import "primereact/resources/themes/lara-light-indigo/theme.css";

const initialState = {
    selectedTheme: undefined,
    themes: [
        "arya-blue",
        "bootstrap4-light-purple",
        "lara-dark-pink",
        "lara-light-indigo",
        "luna-pink",
        "mdc-light-deeppurple",
        "rhea",
        "tailwind-light",
        "arya-green",
        "fluent-light",
        "lara-dark-purple",
        "lara-light-pink",
        "md-dark-deeppurple",
        "mdc-light-indigo",
        "saga-blue",
        "vela-blue",
        "arya-orange",
        "lara-dark-amber",
        "lara-dark-teal",
        "lara-light-purple",
        "md-dark-indigo",
        "mira",
        "saga-green",
        "vela-green",
        "arya-purple",
        "lara-dark-blue",
        "lara-light-amber",
        "lara-light-teal",
        "md-light-deeppurple",
        "nano",
        "saga-orange",
        "vela-orange",
        "bootstrap4-dark-blue",
        "lara-dark-cyan",
        "lara-light-blue",
        "luna-amber",
        "md-light-indigo",
        "nova",
        "saga-purple",
        "vela-purple",
        "bootstrap4-dark-purple",
        "lara-dark-green",
        "lara-light-cyan",
        "luna-blue",
        "mdc-dark-deeppurple",
        "nova-accent",
        "soho-dark",
        "viva-dark",
        "bootstrap4-light-blue",
        "lara-dark-indigo",
        "lara-light-green",
        "luna-green",
        "mdc-dark-indigo",
        "nova-alt",
        "soho-light",
        "viva-light",
    ]
};

const Context = createContext({ setTheme: (theme) => { }, themeState: initialState });

function Provider({ children }) {
    const [state, setSelectedTheme] = useReducer((currentState, payload) => ({ ...currentState, selectedTheme: payload }), { ...initialState, selectedTheme: localStorage.getItem("theme") || "lara-light-indigo" });

    const setTheme = useCallback((theme) => {
        if (theme === state.selectedTheme) {
            return;
        }

        setSelectedTheme(theme);
        localStorage.setItem("theme", theme);

        const htmlHead = document.querySelector("head > link.theme");

        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.className = "theme";
        link.href = `/node_modules/primereact/resources/themes/${theme}/theme.css`;
        document.head.appendChild(link);

        if (htmlHead) {
            htmlHead.remove();
        }
    }, []);

    const linkElementIsAdded = useRef(false);

    useEffect(() => {
        if (linkElementIsAdded.current) {
            return;
        }
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.className = "theme";
        link.href = `/node_modules/primereact/resources/themes/${state.selectedTheme}/theme.css`;
        document.head.appendChild(link);
        linkElementIsAdded.current = true;
    }, []);

    return <Context.Provider value={{ setTheme, themeState: state }}>{children}</Context.Provider>;
}

// Provider.defaultProps = {
//     children: null,
// };

// Provider.propTypes = {
//     children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
//     translations: PropTypes.shape({}).isRequired,
// };

export { Context, Provider };
