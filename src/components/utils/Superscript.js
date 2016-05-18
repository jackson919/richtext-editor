import React from 'react';
import { Entity, convertToRaw } from 'draft-js';
import StyleButton from './StyleButton';

export const Superscript = (props) => {
    return (
        <span>
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

export const SuperscriptControl = (props) => {
    const { editorState } = props;
    const currentStyle = editorState.getCurrentInlineStyle();

    return (
        <div className="TextEditor-controls-bar">
            <StyleButton
                active={currentStyle.has('SUPERSCRIPT')}
                label={SUPERSCRIPT}
                onToggle={props.onToggle}
                style={'SUPERSCRIPT'}
            />
        </div>
    );
};
