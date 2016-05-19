import React from 'react';
import StyleButton from '../StyleButton';
import { getSelectedLink } from '../decorators/LinkDecorator';
import { Popover, OverlayTrigger } from 'react-bootstrap';

const LINK = (
    <span className="TextEditor-controls-button">
        <i className="fa fa-link" aria-hidden="true"></i>
    </span>
);

export class CreateLinkControl extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            urlValue: null
        };

        // this.showInputField = () => this._showInputField();
    }

    // _showInputField() {
    //     const { editorState } = this.props;
    //     const selectionState = editorState.getSelection();
    //     const isSelected = getSelectedLink(editorState, selectionState);
    //
    //     if (isSelected !== null) {
    //         return null;
    //     } else {
    //         window.alert('test')
    //     }
    // }

    render() {
        const { editorState } = this.props;
        const selectionState = editorState.getSelection();
        const isSelected = getSelectedLink(editorState, selectionState);
        const startKey = selectionState.getStartKey();
        const start = selectionState.getStartOffset();
        const end = selectionState.getEndOffset();

        /**
         * NOTE: This bit will need some cleanup. We take the selected block and slice to get the
         * currently selected text. However, the user is currently unable to alter the link
         * entity.
         */

        const selectedBlock = editorState
            .getCurrentContent()
            .getBlockForKey(startKey)
            .getText().slice(start, end);

        if (this.props.showInput) {
            /**
             * TODO: Pull inline style out into stylesheet.
             * TODO: Extract the overlay/popover component and also handle
             * modification of link entity text + removal
             */
            return (
                        <div
                            className="TextEditor-controls-bar"
                            onClick={this.showInputField}
                            ref="target"
                            style={{ position: 'relative' }}
                        >
                            <OverlayTrigger
                                trigger="click"
                                rootClose
                                placement="bottom"
                                overlay={(
                                    <Popover
                                        id="insert-url"
                                        title="Insert URL"
                                    >
                                        Selected Text: <input defaultValue={selectedBlock}></input>
                                        <br />
                                        Navigate To URL: <input placeholder="Link to page..."></input>
                                    </Popover>
                                )}
                            >
                                <div>
                                    <StyleButton
                                        active={isSelected}
                                        label={LINK}
                                        onToggle={this.props.onToggle}
                                        style={'LINK'}
                                    />
                                </div>
                            </OverlayTrigger>
                        </div>
            );
        }

        return (
            <div
                className="TextEditor-controls-bar"
                onClick={this.showInputField}
            >
                <StyleButton
                    active={isSelected}
                    label={LINK}
                    onToggle={this.props.onToggle}
                    style={'LINK'}
                />
            </div>
        );
    }
}
