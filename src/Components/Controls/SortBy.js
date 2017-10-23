import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';
import {sortPosts} from "../../Actions/PostActions";

const styles = theme => ({
    root: {
        width: '100%',
    },
    button: {

    }
});


class SortBy extends Component {

    state = {
        anchorEl: null,
        open: false,
        selected: 'votes'
    };

    handleClick = event => {
        this.setState({ open: true, anchorEl: event.currentTarget });
    };

    handleRequestClose = (sort) => {
        switch(sort){
            case 0:
                this.setState({ open: false });
                break;
            default:
                this.setState({
                    open: false,
                    selected: sort
                });
                this.props.changeSortBy(sort);
                break;
        }
    };


    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Button
                    className={classes.button}
                    raised
                    aria-owns={this.state.open ? 'simple-menu' : null}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                >
                    {this.state.selected}
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={this.state.anchorEl}
                    open={this.state.open}
                    onRequestClose={() => (this.handleRequestClose(0))}
                >
                    <MenuItem onClick={() => (this.handleRequestClose('votes'))}>VOTES</MenuItem>
                    <MenuItem onClick={() => (this.handleRequestClose('time'))}>TIME</MenuItem>

                </Menu>
            </div>
        );
    }
}

SortBy.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeSortBy: (sort) => dispatch(sortPosts(sort))
    };
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(SortBy));