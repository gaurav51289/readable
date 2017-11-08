import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import BackIcon from 'material-ui-icons/ArrowBack';
import {errorReset} from "../Actions/UIActions";


const styles = theme => ({
    root: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 3,
    }),
});

class ErrorPage extends React.Component {

    handleBackButtonClick= () => {
        this.props.resetError();
        this.props.history.push('/');
    };

    render() {
            const {classes, message} = this.props;
            return (
                <Grid container justify="center">
                    <Grid item xs={12} md={8}>
                        <Paper className={classes.root} elevation={4}>

                            <Grid container justify="center">
                                <Typography type="display3" gutterBottom>
                                    {message}
                                </Typography>
                                <Grid item xs={12} md={6}>
                                    <Grid container justify="center">
                                        <Button
                                            className={classes.button}
                                            raised
                                            color="primary"
                                            onClick={() => this.handleBackButtonClick()}
                                        >
                                            <BackIcon className={classes.leftIcon} />
                                            Go Back to Posts
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            );
    }
}

ErrorPage.propTypes = {
    classes: PropTypes.object.isRequired,
    message: PropTypes.string.isRequired
};

const mDP = (dispatch) => {
    return {
        resetError: () => dispatch(errorReset())
    }
};
export default connect(null, mDP)(withRouter(withStyles(styles)(ErrorPage)));