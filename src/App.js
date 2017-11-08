import React, {Component} from 'react';
import {Route, withRouter} from "react-router-dom";
import {connect} from 'react-redux';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import purple from 'material-ui/colors/purple';
import green from 'material-ui/colors/green';
import red from 'material-ui/colors/red';


import NavBar from './Components/NavBar';
import Controls from './Components/Controls/Controls';
import Posts from './Components/Posts/Posts';
import PostDetails from './Components/Posts/PostDetails';
import ErrorPage from './Components/ErrorPage';

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
        if(this.props.error.error){
            return (
                <MuiThemeProvider theme={App.theme}>
                    <div>
                        <NavBar/>
                        <ErrorPage message={this.props.error.message}/>
                    </div>
                </MuiThemeProvider>
            );
        } else {
            return (
                <MuiThemeProvider theme={App.theme}>
                    <div>
                        <NavBar/>
                        <Route
                            exact
                            path="/"
                            render={() => {
                                return(
                                    <div>
                                        <Controls category='all'/>
                                        <Posts category={'all'}/>
                                    </div>
                                );
                            }}
                        />
                        <Route
                            exact
                            path="/:category"
                            render={({match}) => {
                                return(
                                    <div>
                                        <Controls category={match.params.category}/>
                                        <Posts category={match.params.category}/>
                                    </div>
                                );
                            }}
                        />
                        <Route
                            exact
                            path="/:category/:postid"
                            render={({match}) => {
                                return(
                                    <PostDetails
                                        category={match.params.category}
                                        postid={match.params.postid}
                                    />
                                );
                            }}
                        />
                    </div>
                </MuiThemeProvider>
            );
        }


    }
}

const mSP = (state) => {
    const {error} = state;
    return {
        error
    }
};


export default withRouter(connect(mSP, null)(App));
