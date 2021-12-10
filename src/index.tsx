import React from "react";
import ReactDOM from "react-dom";
import './index.scss';
import App from "./App";
import {ThemeProvider} from "@material-ui/core/styles";
import {unstable_createMuiStrictModeTheme} from '@material-ui/core/styles';

// findDomElement Error를 잡기위한 코드 -> material ui provider로 감싸기.
const theme = unstable_createMuiStrictModeTheme();

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </ThemeProvider>,

    document.getElementById("root")
);