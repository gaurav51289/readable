import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';

const styles = theme => ({
    root: {
        width: '100%',
    }
});


class CategorySelector extends Component {

    state = {
        anchorEl: null,
        open: false,
        selected: 'All'
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
                    <MenuItem onClick={() => (this.handleRequestClose('All'))}>All</MenuItem>
                    <MenuItem onClick={() => (this.handleRequestClose('React'))}>React</MenuItem>
                    <MenuItem onClick={() => (this.handleRequestClose('Redux'))}>Redux</MenuItem>
                    <MenuItem onClick={() => (this.handleRequestClose('Udacity'))}>Udacity</MenuItem>
                </Menu>
            </div>
        );
    }
}

CategorySelector.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CategorySelector);