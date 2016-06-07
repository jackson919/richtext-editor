import React from 'react';
import { SplitButton, MenuItem } from 'react-bootstrap';

export default class StyleDropdown extends React.Component {
    constructor() {
        super();
        this.changeSelectHandler = (event) => this._changeSelectHandler(event);

        this.state = {
            selectedBlockType: 'Default'
        };
    }

    _changeSelectHandler(value) {
        const style = this.props.blockTypes.reduce((result, type) => {
            if (!!result) {
                return result;
            } else if (type.label === value) {
                return type.style;
            }
        }, null);

        this.setState({ selectedBlockType: value });
        this.props.onChange(style);
    }

    /**
     * TODO: Correctly remove texteditor controls button, and ensure correct rendering of style
     */
    render() {
        let className = 'TextEditor-controls-button';
        if (this.props.active) {
            className += ' TextEditor-controls-active';
        }

        return (
            <SplitButton
                title={this.state.selectedBlockType}
                onSelect={this.changeSelectHandler}
                id={this.state.selectedBlockType}
            >
                {this.props.blockTypes.map((type) => {
                    return (
                        <MenuItem
                            eventKey={type.label}
                            value={type.label}
                            key={type.label}
                            id={type.label}
                        >
                            {type.label}
                        </MenuItem>
                    );
                })}
            </SplitButton>
        );
    }
}

StyleDropdown.propTypes = {
    blockTypes: React.PropTypes.any,
    // active: React.PropTypes.boolean,
    onChange: React.PropTypes.func
};
