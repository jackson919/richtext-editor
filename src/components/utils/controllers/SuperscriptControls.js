import React from 'react';
import StyleButton from '../StyleButton';

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
