import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import classnames from 'classnames';
import Card, {CardActions, CardContent, CardHeader} from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Collapse from 'material-ui/transitions/Collapse';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import red from 'material-ui/colors/red';
import DeleteForeverIcon from 'material-ui-icons/DeleteForever';
import CommentIcon from 'material-ui-icons/Comment';
import Button from 'material-ui/Button';
import BackIcon from 'material-ui-icons/ArrowBack';

import EditPost from './EditPost';
import Comment from '../Comments/Comment';
import Votes from './Votes';
import NewComment from '../Comments/NewComment';
import {getPostData, postDeletePost} from "../../Actions/PostActions";


const styles = theme => ({
    root: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 3,
    }),
    card: {
        maxWidth: '100%',
        marginTop: 3
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    flexGrow: {
        flex: '1 1 auto',
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
});

class PostDetails extends React.Component {
    state = {
        expanded: false
    };

    componentDidMount() {
        this.props.getPostData(this.props.category, this.props.postid);
    }

    handleExpandClick = () => {
        this.setState({expanded: !this.state.expanded});
    };

    handleBackButtonClick= () => {
        this.props.history.push('/');
    };

    render() {
        const {classes, commentData, postData, postid, category} = this.props;
        let post = {};

        if (postData.posts[postid]) {
            post = postData.posts[postid];
        }

        let pdRender;

        if (post.id && post.category === category) {
            let commentsArr =
                post.commentIds
                && post.commentIds
                    .map((commentId) => commentData[commentId])
                    .sort((a, b) => {
                        return b.voteScore - a.voteScore;
                    });
            pdRender =
                <Grid container justify="center">
                    <Grid item xs={12} md={8}>
                        <Paper className={classes.root} elevation={4}>
                            <Grid container>
                                <Grid item xs={6} md={6}>
                                    <Button
                                        className={classes.button}
                                        raised
                                        color="primary"
                                        onClick={() => this.handleBackButtonClick()}
                                    >
                                        <BackIcon className={classes.leftIcon} />
                                        Go Back to Posts
                                    </Button>
                                </Grid>

                                <Grid container>
                                    <Grid item xs={12} md={12}>
                                        <Card className={classes.card}>
                                            <CardHeader
                                                avatar={
                                                    <Avatar aria-label="Recipe" className={classes.avatar}>
                                                        {(post.author).charAt(0).toUpperCase()}
                                                    </Avatar>
                                                }
                                                title={
                                                    "By " + post.author
                                                }
                                                subheader={
                                                    (new Date(post.timestamp)).toLocaleDateString()
                                                }
                                            />
                                            <CardContent>
                                                <Typography type="display1" component="p">
                                                    <Link to={`/${post.category}/${post.id}`}>{post.title}</Link>
                                                </Typography>
                                                <Typography type="subheading" component="p">
                                                    {post.body}
                                                </Typography>

                                            </CardContent>
                                            <CardActions>
                                                <Votes
                                                    votes={post.voteScore}
                                                    postId={post.id}
                                                    type={'POST'}
                                                />
                                            </CardActions>
                                            <CardActions disableActionSpacing>
                                                <IconButton
                                                    onClick={() => this.props.doDeletePost(post.id)}
                                                >
                                                    <DeleteForeverIcon/>
                                                </IconButton>
                                                <EditPost post={post}/>
                                                <div className={classes.flexGrow}/>
                                                <IconButton
                                                    className={classnames(classes.expand, {
                                                        [classes.expandOpen]: this.state.expanded,
                                                    })}
                                                    onClick={this.handleExpandClick}
                                                    aria-expanded={this.state.expanded}
                                                    aria-label="Show more"
                                                >
                                                    <CommentIcon/>
                                                </IconButton>
                                            </CardActions>
                                            <Collapse in={this.state.expanded} transitionDuration="auto" unmountOnExit>
                                                <CardContent>
                                                    <Grid container>
                                                        <Grid item xs={6} md={6}>
                                                            <Typography paragraph type="title">
                                                                {commentsArr ? `${commentsArr.length} ${(commentsArr.length > 1) ? 'Comments' : 'Comment'}` : '0 Comment'}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={6} md={6}>
                                                            <NewComment post={post}/>
                                                        </Grid>
                                                    </Grid>
                                                    {
                                                        commentsArr && commentsArr.map((comment) => (
                                                            <Comment key={comment.id} comment={comment}/>
                                                        ))
                                                    }
                                                </CardContent>
                                            </Collapse>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>;
        } else {
            pdRender =
                <Grid container justify="center">
                    <Grid item xs={12} md={8}>
                        <Paper className={classes.root} elevation={4}>
                            <Grid container>
                                <Typography type="display3" gutterBottom>
                                    Loading...
                                </Typography>;
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>;
        }

        return (pdRender);
    }
}

PostDetails.propTypes = {
    classes: PropTypes.object.isRequired,
    category: PropTypes.string.isRequired,
    postid: PropTypes.string.isRequired
};

const mapStateToProp = (state) => {
    let {commentData, postData} = state;
    return {
        commentData,
        postData
    }
};

const mapDispatchToProp = (dispatch) => {
    return {
        doDeletePost: (postId) => dispatch(postDeletePost(postId)),
        getPostData: (category, postId) => dispatch(getPostData(category, postId))
    }
};
export default withRouter(connect(mapStateToProp, mapDispatchToProp)(withStyles(styles)(PostDetails)));