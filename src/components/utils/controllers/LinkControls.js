import React from 'react';
import ReactDOM from 'react-dom';
import StyleButton from '../StyleButton';
import { getSelectedLink } from '../decorators/LinkDecorator';

const LINK = (
    <span className="TextEditor-controls-button">
        <i className="fa fa-link" aria-hidden="true"></i>
    </span>
);

import { Popover, Button, Overlay, OverlayTrigger, Tooltip } from 'react-bootstrap';


export class CreateLinkControl extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            urlValue: null
        };

        this.showInputField = () => this._showInputField();
    }

    _showInputField() {
        const { editorState } = this.props;
        const selectionState = editorState.getSelection();
        const isSelected = getSelectedLink(editorState, selectionState);

        if (isSelected !== null) {
            return null;
        } else {
            // window.alert('lskdfjlsd')
        }

        // if (this.state.urlValue === null && this.state.renderInput === false) {
        //     window.prompt('sldkfj');
        // }
    }

    render() {
        const { editorState } = this.props;
        const selectionState = editorState.getSelection();
        const isSelected = getSelectedLink(editorState, selectionState);

        if (this.props.showInput) {
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
                                        Selected Text: <input placeholder=""></input>
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
