import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import Menu, {MenuItem} from 'material-ui/Menu';

import {getAllCategories} from "../../Actions/UIActions";

const styles = theme => ({
    root: {
        width: '100%',
    }
});


class CategorySelector extends Component {

    state = {
        anchorEl: null,
        open: false,
        selected: this.props.selected
    };

    componentDidMount() {
        this.props.getAllCategories(this.props.categories);
    }

    handleClick = event => {
        this.setState({open: true, anchorEl: event.currentTarget});
    };
    handleRequestClose = (cat) => {
        switch (cat) {
            case 0:
                this.setState({open: false});
                break;
            default:
                this.setState({
                    open: false,
                    selected: cat
                });
                if (!this.props.noFilter) {
                    (cat === 'all')? this.props.history.push('/') : this.props.history.push('/'+cat);
                } else {
                    this.props.getSelected(cat);
                }
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
                    {this.state.selected === 'all' ? 'NO FILTER' : this.state.selected}
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={this.state.anchorEl}
                    open={this.state.open}
                    onRequestClose={() => (this.handleRequestClose(0))}
                >
                    {
                        this.props.categories.map((category) => (
                            <MenuItem key={category.name}
                                      onClick={() => (this.handleRequestClose(category.name))}>
                                            {(category.name === 'all')? 'NO FILTER' : (category.name).toUpperCase()}
                            </MenuItem>
                        ))
                    }
                </Menu>
            </div>
        );
    }
}

CategorySelector.propTypes = {
    classes: PropTypes.object.isRequired,
    getSelected: PropTypes.func,
    selected: PropTypes.string.isRequired
};


const mSP = (state) => {
    const {categories} = state;

    return {
        categories
    }
};

const mDP = (dispatch) => {
    return {
        getAllCategories: (categories) => dispatch(getAllCategories(categories))
    }
};

export default connect(mSP, mDP)(withRouter((withStyles(styles)(CategorySelector))));