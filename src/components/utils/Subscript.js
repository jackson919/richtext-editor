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

export const SubscriptControl = (props) => {
    const { editorState } = props;
    const currentStyle = editorState.getCurrentInlineStyle();

    return (
        <div className="TextEditor-controls-bar">
            <StyleButton
                active={currentStyle.has('SUBSCRIPT')}
                label={SUBSCRIPT}
                onToggle={props.onToggle}
                style={'SUBSCRIPT'}
            />
        </div>
    );
};
