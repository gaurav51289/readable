import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import DeleteForeverIcon from 'material-ui-icons/DeleteForever';


import Votes from '../Posts/Votes';
import EditComment from './EditComment';
import {postDeleteComment} from "../../Actions/CommentActions";

const styles = theme => ({
    root: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 3,
    }),
});


class Comment extends Component {

    render() {
        const {classes, comment} = this.props;

        return (
            <Paper className={classes.root} elevation={1}>
                <Typography type="subheading" gutterBottom>
                    By {comment.author}
                </Typography>
                <Typography type="caption" gutterBottom>
                    {(new Date(comment.timestamp)).toLocaleDateString()}
                </Typography>

                <Typography paragraph>
                    {comment.body}
                </Typography>
                <Votes
                    votes={comment.voteScore}
                    postId={comment.id}
                    type={'COMMENT'}
                />
                <IconButton
                    onClick={() => this.props.doDeleteComment(comment.parentId, comment.id)}
                >
                    <DeleteForeverIcon/>
                </IconButton>
                <EditComment comment={comment}/>
            </Paper>
        );
    }
}

Comment.propTypes = {
    classes: PropTypes.object.isRequired,
    comment: PropTypes.object.isRequired
};


const mapDispatchToProp = (dispatch) => {
    return {
        doDeleteComment: (postId, commentId) => dispatch(postDeleteComment(postId, commentId))
    }
};

export default connect(null, mapDispatchToProp)(withStyles(styles)(Comment));