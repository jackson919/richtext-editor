import React from 'react';
import StyleButton from '../StyleButton';

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
