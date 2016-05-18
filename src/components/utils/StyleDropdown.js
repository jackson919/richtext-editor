import React from 'react';

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
    render() {
        let className = 'TextEditor-controls-button';
        if (this.props.active) {
            className += ' TextEditor-controls-active';
        }

        return (
            <select onChange={this.changeSelectHandler}>
                {this.props.blockTypes.map((type) => {
                    return (
                        <option key={type.label} value={type.label}>
                            {type.label}
                        </option>
                    );
                })}
            </select>
        );
    }
}

// StyleButton.propTypes = {
//     onToggle: React.PropTypes.function,
//     style: React.PropTypes.boolean,
//     active: React.PropTypes.boolean,
//     label: React.PropTypes.string
// };
