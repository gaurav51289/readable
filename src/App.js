import React, {Component} from 'react';
import {Route} from "react-router-dom";

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import purple from 'material-ui/colors/purple';
import green from 'material-ui/colors/green';
import red from 'material-ui/colors/red';


import NavBar from './Components/NavBar';
import Controls from './Components/Controls/Controls';
import Posts from './Components/Posts/Posts';

class App extends Component {

    static theme = createMuiTheme({
        palette: {
            primary: purple,
            secondary: {
                ...green,
                A400: '#00a476',
            },
            error: red,
        },
    });

    render() {
        return (
            <MuiThemeProvider theme={App.theme}>
                <div>
                    <NavBar/>
                    <Controls/>
                    <Route
                        exact
                        path="/"
                        render={() => {
                            return(<Posts category={'all'}/>);
                        }}
                    />
                    <Route
                        exact
                        path="/redux"
                        render={() => {
                            return(<Posts category={'redux'}/>);
                        }}
                    />
                    <Route
                        exact
                        path="/react"
                        render={() => {
                            return(<Posts category={'react'}/>);
                        }}
                    />
                    <Route
                        exact
                        path="/udacity"
                        render={() => {
                            return(<Posts category={'udacity'}/>);
                        }}
                    />
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
