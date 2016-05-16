import React from 'react';
import { Entity, convertToRaw } from 'draft-js';
import StyleButton from './StyleButton';

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

const LINK = (
    <span className="TextEditor-controls-button">
        <i className="fa fa-link" aria-hidden="true"></i>
    </span>
);

export class CreateLinkControl extends React.Component {
    constructor(props) {
        super(props);
    }



    // const currentStyle = props.editorState.getCurrentInlineStyle();
    render() {
        console.log('editorstate', this.props.editorState.getSelection().isCollapsed());

        return (
            <div className="TextEditor-controls-bar">
                <StyleButton
                    label={LINK}
                    onToggle={this.props.onToggle}
                    style={'LINK'}
                />
            </div>
        );
    }
}
