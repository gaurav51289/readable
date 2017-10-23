import React, {Component} from 'react';

import {connect} from 'react-redux';
import {getAllPostData} from "../../Actions/PostActions";


import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

import Post from './Post';

const styles = theme => ({
    root: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 3,
    }),
    button: {
        float: 'right'
    }
});


class Posts extends Component {

    componentDidMount() {
        this.props.fetchPostsData();
    }

    render() {
        const {classes, posts} = this.props;
        return (
            <Grid container justify="center">
                <Grid item xs={12} md={8}>
                    <Paper className={classes.root} elevation={4}>
                        <Grid container>
                            <Grid item xs={6} md={6}>
                                <Typography type="display1" component="h3">
                                    Posts
                                </Typography>
                            </Grid>
                            <Grid item xs={6} md={6}>
                                <Button raised color="primary" className={classes.button}>New Post</Button>
                            </Grid>
                        </Grid>
                        {
                            posts.map((post) => (
                                <Post key={post.id} post={post}/>
                            ))
                        }
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

Posts.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {

    const {posts, filterBy, sortBy} = state.filteredPosts;

    let filteredPosts = posts.filter((post) => {
        if(filterBy === 'all'){
            return post;
        } else {
            return post.category === filterBy;
        }
    });

    let sortedPosts = filteredPosts.sort((a, b) => {
        if(sortBy === 'time'){
            return b.timestamp - a.timestamp;
        } else {
            return b.voteScore - a.voteScore;
        }
    });

    return {
        posts : sortedPosts
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPostsData: () => dispatch(getAllPostData())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Posts));