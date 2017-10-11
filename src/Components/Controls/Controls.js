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
        const { classes } = this.props;
        return (
            <Grid container>
                <Grid itm md={2}/>
                <Grid item md={8}>
                    <Paper className={classes.root} elevation={4}>
                        <Grid container spacing={0}>
                            <Grid item md={3}>
                                <Typography type="headline" align="center" component="h3">
                                   Select Post Category:
                                </Typography>
                            </Grid>
                            <Grid item md={3}>
                                <CategorySelector/>
                            </Grid>
                            <Grid item md={3}>
                                <Typography type="headline" align="center" component="h3">
                                    Sort Posts By:
                                </Typography>
                            </Grid>
                            <Grid item md={3}>
                                <SortBy/>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid itm md={2}/>
            </Grid>
        );
    }
}


Controls.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Controls);