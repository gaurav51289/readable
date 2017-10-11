import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';

const styles = theme => ({
    root: {
        width: '100%',
    }
});


class Posts extends Component {

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>

            </div>
        );
    }
}

Posts.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Posts);