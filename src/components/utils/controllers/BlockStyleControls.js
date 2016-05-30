import React from 'react';
import StyleButton from '../StyleButton';
import { ButtonGroup } from 'react-bootstrap';

const OL = (
    <span className="TextEditor-controls-button">
        <i className="fa fa-list-ol" aria-hidden="true"></i>
    </span>
);

const UL = (
    <span className="TextEditor-controls-button">
        <i className="fa fa-list-ul" aria-hidden="true"></i>
    </span>
);

const BLOCK_QUOTE = (
    <span className="TextEditor-controls-button">
        <i className="fa fa-quote-left" aria-hidden="true"></i>
    </span>
);

/**
 * Array of types of block styles that can be made in our text editor.
 * @type {Array}
 */
const BLOCK_TYPES = [
   { label: BLOCK_QUOTE, style: 'blockquote' },
   { label: UL, style: 'unordered-list-item' },
   { label: OL, style: 'ordered-list-item' }
];

export const BlockStyleControls = (props) => {
    const { editorState } = props;
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();

    return (
        <ButtonGroup className="TextEditor-controls-bar">
            {BLOCK_TYPES.map((type) => {
                return (
                    <StyleButton
                        key={type.style}
                        active={type.style === blockType}
                        label={type.label}
                        onToggle={props.onToggle}
                        style={type.style}
                    />
                );
            })}
        </ButtonGroup>
  );
};
