import React, {Component} from 'react';
import {connect} from 'react-redux';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {DialogActions, DialogContent, DialogContentText, DialogTitle,} from 'material-ui/Dialog';
import {withStyles} from 'material-ui/styles';

import {postAddComment} from "../../Actions/CommentActions";

const styles = theme => ({
    button: {
        float: 'right'
    },
    categorySelector: {
        marginTop: 10,
        marginBottom: 3
    }
});

class NewComment extends Component {
    state = {
        open: false,
        comment: {
            id: Date.now().toString(),
            timestamp: Date.now(),
            parentId: this.props.post.id,
            body: "",
            author: 'CommentGuy',
            deleted: false,
            parentDeleted: false,
            voteScore: 1
        }
    };

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleRequestClose = (doPostComment) => {
        if (doPostComment) {
            let postId = this.props.post.id;
            let comments = new Array(this.state.comment);
            this.props.doAddComment(postId, comments);

            this.setState((state) => {
                state.post = {
                    ...state.post,
                    body: ""
                };
                return state;
            });
        }
        this.setState({open: false});
    };

    handleTextFieldChange = (event) => {
        const target = event.target;
        const value = target.value;
        const id = target.id;

        this.setState((state) => {
            state.comment[id] = value;
            return state;
        });
    };

    render() {
        const {classes, post} = this.props;
        return (
            <div>
                <Button
                    className={classes.button} dense raised
                    onClick={this.handleClickOpen}
                >
                    New Comment
                </Button>
                <Dialog open={this.state.open} onRequestClose={() => this.handleRequestClose(false)}>
                    <DialogTitle>New Comment</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Write a new Comment for the post...
                            <br/>
                            <strong>{post.title}</strong>
                            <br/>
                            <i>{post.body}</i>

                        </DialogContentText>
                        <TextField
                            autoFocus
                            multiline
                            margin="dense"
                            id="body"
                            label="Your Comment..."
                            type="text"
                            fullWidth
                            value={this.state.comment.body}
                            onChange={(event) => this.handleTextFieldChange(event)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.handleRequestClose(false)} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => this.handleRequestClose(true)} color="primary">
                            Post
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}


const mapDispatchToProp = (dispatch) => {
    return {
        doAddComment : (postId, comments) => dispatch(postAddComment(postId, comments))
    }
};

export default connect(null, mapDispatchToProp)(withStyles(styles)(NewComment));