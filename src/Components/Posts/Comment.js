import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import DeleteForeverIcon from 'material-ui-icons/DeleteForever';
import EditIcon from 'material-ui-icons/Edit';

const styles = theme => ({
    root: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 3,
    }),
});


class Comment extends Component {

    render() {
        const {classes} = this.props;
        return (
            <Paper className={classes.root} elevation={1}>
                <Typography type="title">User1</Typography>
                <Typography paragraph>
                    Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                    heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                    browned, 6 to 8 minutes.
                </Typography>
                <IconButton aria-label="Add to favorites">
                    <DeleteForeverIcon/>
                </IconButton>
                <IconButton aria-label="Share">
                    <EditIcon/>
                </IconButton>
            </Paper>
        );
    }
}

Comment.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Comment);