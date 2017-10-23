import React, {Component} from 'react';
import {connect} from 'react-redux';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import EditIcon from 'material-ui-icons/Edit';
import TextField from 'material-ui/TextField';
import Dialog, {DialogActions, DialogContent, DialogContentText, DialogTitle,} from 'material-ui/Dialog';
import {withStyles} from 'material-ui/styles';
import PropTypes from 'prop-types';
import {putEditPost} from "../../Actions/PostActions";



const styles = theme => ({
    button: {
        float: 'right'
    },
    categorySelector: {
        marginTop: 10,
        marginBottom: 3
    }
});

class EditPost extends Component {
    state = {
        open: false,
        post: this.props.post
    };

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleRequestClose = (doEditPost) => {
        if (doEditPost) {
            const {id, title, body} = this.state.post;
            this.props.doEditPost(id, title, body);
        }
        this.setState({open: false});
    };

    handleTextFieldChange = (event) => {
        const target = event.target;
        const value = target.value;
        const id = target.id;

        this.setState((state) => {
            state.post[id] = value;
            return state;
        });
    };

    render() {
        return (
            <div>
                <IconButton
                    onClick={this.handleClickOpen}
                    aria-label="Edit Post">
                    <EditIcon/>
                </IconButton>
                <Dialog open={this.state.open} onRequestClose={() => this.handleRequestClose(false)}>
                    <DialogTitle>Edit Post</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Make changes in the Post and Save...
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="title"
                            label="Post Title"
                            type="text"
                            fullWidth
                            value={this.state.post.title}
                            onChange={(event) => this.handleTextFieldChange(event)}
                        />
                        <TextField
                            autoFocus
                            multiline
                            margin="dense"
                            id="body"
                            label="Description"
                            type="text"
                            fullWidth
                            value={this.state.post.body}
                            onChange={(event) => this.handleTextFieldChange(event)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.handleRequestClose(false)} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => this.handleRequestClose(true)} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

EditPost.propTypes = {
    classes: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired
};


const mapDispatchToProp = (dispatch) => {
    return {
        doEditPost: (postId, title, body) => dispatch(putEditPost(postId, title, body))
    }
};

export default connect(null, mapDispatchToProp)(withStyles(styles)(EditPost));