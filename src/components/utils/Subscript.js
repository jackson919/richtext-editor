import React from 'react';
import { Entity, convertToRaw } from 'draft-js';
import StyleButton from './StyleButton';

export const Subscript = (props) => {
    return (
        <span>
            <sub>
                {props.children}
            </sub>
        </span>
    );
}

const SUBSCRIPT = (
    <span className="TextEditor-controls-button">
        <i className="fa fa-subscript" aria-hidden="true"></i>
    </span>
);

export class SubscriptControl extends React.Component {
    render() {
        return (
            <div className="TextEditor-controls-bar">
                <StyleButton
                    label={SUBSCRIPT}
                    onToggle={this.props.onToggle}
                    style={'SUBSCRIPT'}
                />
            </div>
        );
    }
}
