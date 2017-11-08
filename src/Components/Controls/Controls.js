import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

import CategorySelector from './CategorySelector';
import SortBy from './SortBy';

const styles = theme => ({
    root: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 3,
    }),
});


class Controls extends Component{


    render(){
        const { classes, category } = this.props;
        return (
            <Grid container justify="center">
                <Grid item xs={12} md={6}>
                    <Paper className={classes.root} elevation={4}>
                        <Grid container >
                            <Grid item xs={8} md={3}>
                                <Typography type="title" align="center">
                                   Select Post Category:
                                </Typography>
                            </Grid>
                            <Grid item xs={4} md={3}>
                                <CategorySelector selected={category}/>
                            </Grid>
                            <Grid item xs={8} md={3}>
                                <Typography type="title" align="center">
                                    Sort Posts By:
                                </Typography>
                            </Grid>
                            <Grid item xs={4} md={3}>
                                <SortBy/>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}


Controls.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Controls);