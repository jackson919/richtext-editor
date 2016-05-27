import React from 'react';
import StyleButton from '../StyleButton';
import { getSelectedLink } from '../decorators/LinkDecorator';
import { RichUtils, Entity } from 'draft-js';
import { Popover, OverlayTrigger, FormGroup, FormControl, InputGroup, Button } from 'react-bootstrap';

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
            urlValue: ''
        };

        // this.showInputField = () => this._showInputField();
        this.handleChange = (e) => this._handleChange(e);
        this.handleSubmit = () => this._handleSubmit();
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

    _handleChange(e) {
        console.log(e.target.value);
        this.setState({ urlValue: e.target.value });
    }

    _handleSubmit() {
        console.log('handlesubmit: ', this.state.urlValue);
        this.props.onSubmit(this.state.urlValue);
        this.setState({ urlValue: '' });
    }

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
                                placement="right"
                                overlay={(
                                    <Popover
                                        id="insert-url"
                                    >
                                        <FormGroup
                                            style={{ marginBottom: '0px' }}
                                        >
                                            <InputGroup bsSize="small">
                                                <FormControl
                                                    type="text"
                                                    value={this.state.urlValue}
                                                    placeholder="Link to URL"
                                                    onChange={this.handleChange}
                                                />
                                                <InputGroup.Button>
                                                    <Button onClick={this.handleSubmit}>
                                                        <i
                                                            className="fa fa-check"
                                                            aria-hidden="true"
                                                        />
                                                    </Button>
                                                    <Button>
                                                        <i
                                                            className="fa fa-remove"
                                                            aria-hidden="true"
                                                        />
                                                    </Button>
                                                </InputGroup.Button>
                                            </InputGroup>
                                        </FormGroup>
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
