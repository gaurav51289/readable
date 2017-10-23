import React, {Component} from 'react';
import {connect} from 'react-redux';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {DialogActions, DialogContent, DialogContentText, DialogTitle,} from 'material-ui/Dialog';
import {FormControl, FormLabel} from 'material-ui/Form';
import {withStyles} from 'material-ui/styles';


import CategorySelector from '../Controls/CategorySelector';
import {postAddPost} from "../../Actions/PostActions";

const styles = theme => ({
    button: {
        float: 'right'
    },
    categorySelector: {
        marginTop: 10,
        marginBottom: 3
    }
});

class NewPost extends Component {
    state = {
        open: false,
        post: {
            id: Date.now(),
            timestamp: Date.now(),
            author: 'thingthree',
            voteScore: 1,
            deleted: false,
            title: "",
            body: "",
            category: "all"
        }
    };

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleRequestClose = (doPost) => {
        if (doPost) {
            this.props.doAddPost(this.state.post);

            this.setState((state) => {
                state.post = {
                    title: "",
                    body: "",
                    category: "all"
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
            state.post[id] = value;
            return state;
        });
    };

    getSelected = (selected) => {
        this.setState((state) => {
            state.post.category = selected;
            return state;
        });
    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Button
                    raised
                    color="primary"
                    className={classes.button}
                    onClick={this.handleClickOpen}
                >
                    New Post
                </Button>
                <Dialog open={this.state.open} onRequestClose={() => this.handleRequestClose(false)}>
                    <DialogTitle>New Post</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Write a new Post...
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
                        <FormControl component="fieldset" className={classes.formControl}>
                            <FormLabel className={classes.categorySelector}>Category</FormLabel>
                            <CategorySelector
                                getSelected={this.getSelected}
                                selected={this.state.post.category}
                                noFilter={true}/>
                        </FormControl>

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
        doAddPost : (post) => dispatch(postAddPost(post))
    }
};

export default connect(null, mapDispatchToProp)(withStyles(styles)(NewPost));