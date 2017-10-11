import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';

const styles = theme => ({
    root: {
        width: '100%',
    }
});


class Post extends Component {

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                
            </div>
        );
    }
}

Post.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Post);