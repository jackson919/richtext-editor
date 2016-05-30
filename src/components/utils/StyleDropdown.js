import React from 'react';
import { SplitButton, MenuItem } from 'react-bootstrap';

export default class StyleDropdown extends React.Component {
    constructor() {
        super();
        this.changeSelectHandler = (event) => this._changeSelectHandler(event);
    }

    _changeSelectHandler(event) {
        event.preventDefault();
        const value = event.target.value;
        const style = this.props.blockTypes.reduce((result, type) => {
            if (!!result) {
                return result;
            } else if (type.label === value) {
                return type.style;
            }
        }, null);

        this.props.onChange(style);
    }

    /**
     * TODO: Correctly remove texteditor controls button, and ensure correct rendering of style
     */
     // 
    //  <SplitButton title="Dropdown right" pullRight id="split-button-pull-right">
    //      <MenuItem eventKey="1">Action</MenuItem>
    //      <MenuItem eventKey="2">Another action</MenuItem>
    //      <MenuItem eventKey="3">Something else here</MenuItem>
    //      <MenuItem divider />
    //      <MenuItem eventKey="4">Separated link</MenuItem>
    //  </SplitButton>
    render() {
        let className = 'TextEditor-controls-button';
        if (this.props.active) {
            className += ' TextEditor-controls-active';
        }

        return (
            <SplitButton onChange={this.changeSelectHandler}>
                {this.props.blockTypes.map((type) => {
                    return (
                        <MenuItem eventKey={type.label} value={type.label}>
                            {type.label}
                        </MenuItem>
                    );
                })}
            </SplitButton>
        );
    }
}

// StyleButton.propTypes = {
//     onToggle: React.PropTypes.function,
//     style: React.PropTypes.boolean,
//     active: React.PropTypes.boolean,
//     label: React.PropTypes.string
// };
