import React from 'react';
import { Entity, convertToRaw } from 'draft-js';
import StyleButton from './StyleButton';

export const Superscript = (props) => {
    return (
        <span {...props}>
            <sup>
                {props.children}
            </sup>
        </span>
    );
}

const SUPERSCRIPT = (
    <span className="TextEditor-controls-button">
        <i className="fa fa-superscript" aria-hidden="true"></i>
    </span>
);

export class SuperscriptControl extends React.Component {
    render() {
        return (
            <div className="TextEditor-controls-bar">
                <StyleButton
                    label={SUPERSCRIPT}
                    onToggle={this.props.onToggle}
                    style={'SUPERSCRIPT'}
                />
            </div>
        );
    }
}
