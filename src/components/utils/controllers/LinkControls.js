import React from 'react';
import StyleButton from '../StyleButton';
import { getSelectedLink } from '../decorators/LinkDecorator';

const LINK = (
    <span className="TextEditor-controls-button">
        <i className="fa fa-link" aria-hidden="true"></i>
    </span>
);

export class CreateLinkControl extends React.Component {
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
