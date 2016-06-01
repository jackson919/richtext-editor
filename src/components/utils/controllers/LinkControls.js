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
            urlValue: this._getSelectedBlockURL()
        };

        this.handleChange = (e) => this._handleChange(e);
        this.handleSubmit = () => this._handleSubmit();
        this.handleReturn = (e) => this._handleReturn(e);
        this.getSelectedBlockURL = () => this._getSelectedBlockURL();
    }

    _handleChange(e) {
        this.setState({ urlValue: e.target.value });
    }

    _handleSubmit() {
        this.props.onSubmit(this.state.urlValue);
        this.setState({ urlValue: this.getSelectedBlockURL() });
    }

    _getSelectedBlockURL() {
        const { editorState } = this.props;
        const selectionState = editorState.getSelection();
        const startKey = selectionState.getStartKey();
        const block = editorState.getCurrentContent().getBlockForKey(startKey);

        if (block.getEntityAt(0) && this.state.urlValue !== '') {
            return Entity.get(block.getEntityAt(0)).getData().url;
        } else {
            return '';
        }
    }

    // TODO: Implement handler for the 'return' key to submit URL
    // _handleReturn(e) {
    //     console.log('handleReturn: ', e)
    //     if (e.key === 'Enter') {
    //         this.handleSubmit();
    //     }
    // }

    render() {
        const { editorState } = this.props;
        const selectionState = editorState.getSelection();
        const isSelected = getSelectedLink(editorState, selectionState);
        const startKey = selectionState.getStartKey();
        const start = selectionState.getStartOffset();
        const end = selectionState.getEndOffset();
        const block = editorState.getCurrentContent().getBlockForKey(startKey);

        // if (block.getEntityAt(0)) {
        //     const data = Entity.get(block.getEntityAt(0)).getData();
        //     console.log('data is ', JSON.stringify(data))
        // }
        //
        // const key = editorState.getCurrentContent().getBlockForKey(startKey).getEntityAt(0);
        //
        // let selectedURL;
        //
        // if (key) { selectedUrl = Entity.get(key)}
        //
        // if (selectedURL && this.state.urlValue === '') {
        //     this.setState({ urlValue: selectedURL });
        // }

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
            // let data = null;
            //
            // if (block.getEntityAt(0)) {
            //     data = Entity.get(block.getEntityAt(0)).getData();
            //
            //     if (this.state.urlValue === '') {
            //         this.setState({ urlValue: data.url })
            //         console.log('data is ', JSON.stringify(data.url))
            //     }
            // }
            /**
             * TODO: Pull inline style out into stylesheet.
             * TODO: Extract the overlay/popover component and also handle
             * modification of link entity text + removal
             */
            return (
                        <div
                            className="TextEditor-controls-bar"
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
