import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import classnames from 'classnames';
import Card, {CardActions, CardContent, CardHeader} from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Collapse from 'material-ui/transitions/Collapse';
import Button from 'material-ui/Button';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import red from 'material-ui/colors/red';
import DeleteForeverIcon from 'material-ui-icons/DeleteForever';
import CommentIcon from 'material-ui-icons/Comment';

import EditPost from './EditPost';
import Comment from './Comment';
import Votes from './Votes';
import {postDeletePost} from "../../Actions/PostActions";


const styles = theme => ({
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
    button: {
        float: 'right'
    }
});

class Post extends React.Component {
    state = {expanded: false};

    handleExpandClick = () => {
        this.setState({expanded: !this.state.expanded});
    };

    render() {
        const {classes, post} = this.props;

        return (
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
                                {post.title}
                            </Typography>
                            <Typography type="subheading" component="p">
                                {post.body}
                            </Typography>

                        </CardContent>
                        <CardActions>
                            <Votes votes={post.voteScore}/>
                        </CardActions>
                        <CardActions disableActionSpacing>
                            <IconButton
                                onClick={() => this.props.doDeletePost(post.id)}
                            >
                                <DeleteForeverIcon/>
                            </IconButton>
                            <EditPost/>
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
                                            Comments
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6} md={6}>
                                        <Button className={classes.button} dense raised>New Comment</Button>
                                    </Grid>
                                </Grid>
                                <Comment/>
                            </CardContent>
                        </Collapse>
                    </Card>
                </Grid>
            </Grid>
        );
    }
}

Post.propTypes = {
    classes: PropTypes.object.isRequired,
    post : PropTypes.object.isRequired
};

const mapDispatchToProp = (dispatch) => {
    return {
        doDeletePost: (postId) => dispatch(postDeletePost(postId))
    }
};
export default connect(null, mapDispatchToProp)(withStyles(styles)(Post));