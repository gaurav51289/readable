import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import ThumbUpIcon from 'material-ui-icons/ThumbUp';
import ThumbDownIcon from 'material-ui-icons/ThumbDown';
import {postVoteChange} from "../../Actions/PostActions";

const styles = theme => ({
    vote: {
        fontSize: 30
    }
});


class Votes extends Component {

    render() {
        const {classes, votes, postId} = this.props;
        return (
            <div>
                <IconButton
                    onClick={() => this.props.doVote(postId, 'upVote')}
                >
                    <ThumbUpIcon/>
                </IconButton>
                <span className={classes.vote}>{votes}</span>
                <IconButton
                    onClick={() => this.props.doVote(postId, 'downVote')}
                >
                    <ThumbDownIcon/>
                </IconButton>
            </div>
        );
    }
}

Votes.propTypes = {
    classes: PropTypes.object.isRequired,
    votes: PropTypes.number.isRequired,
    postId: PropTypes.string.isRequired
};

const mapDispatchToProp = (dispatch) => {
    return {
        doVote: (postId, vote) => dispatch(postVoteChange(postId, vote))
    }
};


export default connect(null, mapDispatchToProp)(withStyles(styles)(Votes));