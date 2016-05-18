import React from 'react';
import { Entity, convertToRaw } from 'draft-js';
import StyleButton from './StyleButton';
import { OverlayTrigger, Popover, Button } from 'react-bootstrap';

export const Link = (props) => {
    const { url } = Entity.get(props.entityKey).getData();
    return (
        <a href={url}
            style={{
                color: 'blue',
                textDecoration: 'underline'
            }}
        >
            {props.children}
        </a>
    );
};

const getSelectedLink = (editorState, selectionState) => {
    const currentBlock = editorState.getCurrentContent().getBlockForKey(selectionState.getStartKey());
    const entityKey = currentBlock.getEntityAt(selectionState.getStartOffset());
    return (entityKey !== null && Entity.get(entityKey).getType() === 'LINK') ? entityKey : null;
}

const LINK = (
    <span className="TextEditor-controls-button">
        <i className="fa fa-link" aria-hidden="true"></i>
    </span>
);

export class CreateLinkControl extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { editorState } = this.props;
        const selectionState = editorState.getSelection();
        return (
            <div className="TextEditor-controls-bar">
                <StyleButton
                    active={getSelectedLink(editorState, selectionState)}
                    label={LINK}
                    onToggle={this.props.onToggle}
                    style={'LINK'}
                />
            </div>
        );
    }
}
