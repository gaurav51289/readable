import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getAllPostData} from "../../Actions/PostActions";


import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

import Post from './Post';
import NewPost from "./NewPost";

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
        this.props.fetchPostsData(this.props.category);
    }

    componentWillReceiveProps(newProps){
        if(newProps.category !== this.props.category){
            this.props.fetchPostsData(newProps.category);
        }
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
                                <NewPost/>
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
    category: PropTypes.string.isRequired
};

const mapStateToProps = (state) => {

    let { posts, sortBy } = state.postData;

    let postsArr = Object.keys(posts).map((postId) => {
        return posts[postId];
    });

    let sortedPosts = postsArr.sort((a, b) => {
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
        fetchPostsData: (category) => dispatch(getAllPostData(category))
    };
};


export default (connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Posts)));