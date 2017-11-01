import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import Menu, {MenuItem} from 'material-ui/Menu';

import * as API from '../../APIs/PostsAPI';

const styles = theme => ({
    root: {
        width: '100%',
    }
});


class CategorySelector extends Component {

    state = {
        categories: [{name: 'all'}],
        anchorEl: null,
        open: false,
        selected: this.props.selected
    };
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

    componentDidMount() {
        API.getAllCategories()
            .then((resJSON) => {
                if (resJSON) {
                    let categories = resJSON.categories;
                    this.setState((state) => {
                        state.categories = state.categories.concat(categories);
                        return state;
                    });
                }
            })
            .catch((error) => console.log(error));
    }

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
                    {
                        this.state.categories.map((category) => (
                            <MenuItem key={category.name}
                                      onClick={() => (this.handleRequestClose(category.name))}>{(category.name).toUpperCase()}</MenuItem>
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


export default withRouter((withStyles(styles)(CategorySelector)));