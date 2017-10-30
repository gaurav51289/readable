import React, {Component} from 'react';
import {connect} from 'react-redux';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import EditIcon from 'material-ui-icons/Edit';
import TextField from 'material-ui/TextField';
import Dialog, {DialogActions, DialogContent, DialogContentText, DialogTitle,} from 'material-ui/Dialog';
import {withStyles} from 'material-ui/styles';
import PropTypes from 'prop-types';
import {putEditComment} from "../../Actions/CommentActions";


const styles = theme => ({
    button: {
        float: 'right'
    },
    categorySelector: {
        marginTop: 10,
        marginBottom: 3
    },
    divStyle: {
        display: 'inline'
    }
});

class EditComment extends Component {
    state = {
        open: false,
        comment: this.props.comment
    };

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleRequestClose = (doEditComment) => {
        if (doEditComment) {
            const {id, body} = this.state.comment;
            this.props.doEditComment(id, Date.now(), body);
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
        const {classes} = this.props;
        return (
            <div className={classes.divStyle}>
                <IconButton
                    onClick={this.handleClickOpen}
                >
                    <EditIcon/>
                </IconButton>
                <Dialog open={this.state.open} onRequestClose={() => this.handleRequestClose(false)}>
                    <DialogTitle>Edit Comment</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Make changes in the Comment and Save...
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
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

EditComment.propTypes = {
    classes: PropTypes.object.isRequired,
    comment: PropTypes.object.isRequired
};


const mapDispatchToProp = (dispatch) => {
    return {
        doEditComment: (commentId, timestamp, body) => dispatch(putEditComment(commentId, timestamp, body))
    }
};

export default connect(null, mapDispatchToProp)(withStyles(styles)(EditComment));