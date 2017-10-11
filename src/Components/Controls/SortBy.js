import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';

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
        selected: 'Time'
    };

    handleClick = event => {
        this.setState({ open: true, anchorEl: event.currentTarget });
    };

    handleRequestClose = (cat) => {
        switch(cat){
            case '0':
                this.setState({ open: false });
                break;
            default:
                this.setState({
                    open: false,
                    selected: cat
                });
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
                    <MenuItem onClick={() => (this.handleRequestClose('Time'))}>Time</MenuItem>
                    <MenuItem onClick={() => (this.handleRequestClose('Votes'))}>Votes</MenuItem>
                </Menu>
            </div>
        );
    }
}

SortBy.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SortBy);