import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import ThumbUpIcon from 'material-ui-icons/ThumbUp';
import ThumbDownIcon from 'material-ui-icons/ThumbDown';

const styles = theme => ({
    vote: {
        fontSize: 30
    }
});


class Votes extends Component {

    render() {
        const {classes, votes} = this.props;
        return (
            <div>
                <IconButton>
                    <ThumbUpIcon/>
                </IconButton>
                <span className={classes.vote}>{votes}</span>
                <IconButton>
                    <ThumbDownIcon/>
                </IconButton>
            </div>
        );
    }
}

Votes.propTypes = {
    classes: PropTypes.object.isRequired,
    votes: PropTypes.number.isRequired
};

export default withStyles(styles)(Votes);