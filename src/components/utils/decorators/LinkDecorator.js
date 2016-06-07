import React from 'react';
import { Entity } from 'draft-js';

export const Link = (props) => {
    const { url } = Entity.get(props.entityKey).getData();
    return (
                <a
                    href={url}
                    style={{
                        cursor: 'pointer'
                    }}
                >
                    {props.children}
                </a>
            );
};

// TODO: It would be worthwhile to examine if there is utility in actually converting
// a pasted URL into an <a> tag.
export const ImplicitLink = (props) => {
    return (
        <a
            href={props.decoratedText}
            style={{
                cursor: 'pointer'
            }}
        >
            {props.children}
        </a>
    );
};

export const getSelectedLink = (editorState, selectionState) => {
    const startKey = selectionState.getStartKey();
    const currentBlock = editorState.getCurrentContent().getBlockForKey(startKey);
    const entityKey = currentBlock.getEntityAt(selectionState.getStartOffset());
    return (entityKey !== null && Entity.get(entityKey).getType() === 'LINK') ? entityKey : null;
};
