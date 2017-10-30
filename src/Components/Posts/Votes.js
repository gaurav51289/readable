import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import ThumbUpIcon from 'material-ui-icons/ThumbUp';
import ThumbDownIcon from 'material-ui-icons/ThumbDown';
import {postVoteChange} from "../../Actions/PostActions";
import {postCommentVoteChange} from "../../Actions/CommentActions";

const styles = theme => ({
    vote: {
        fontSize: 30
    }
});


class Votes extends Component {

    render() {
        const {classes, votes, postId, type} = this.props;
        return (
            <div>
                <IconButton
                    onClick={() => this.props.doVote(postId, 'upVote', type)}
                >
                    <ThumbUpIcon/>
                </IconButton>
                <span className={classes.vote}>{votes}</span>
                <IconButton
                    onClick={() => this.props.doVote(postId, 'downVote', type)}
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
    postId: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
};

const mapDispatchToProp = (dispatch) => {
    return {
        doVote: (postId, vote, type) => {

            if(type === 'POST'){
                dispatch(postVoteChange(postId, vote));
            } else {
                dispatch(postCommentVoteChange(postId, vote));
            }
        }
    }
};


export default connect(null, mapDispatchToProp)(withStyles(styles)(Votes));