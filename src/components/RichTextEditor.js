import React, { Component } from 'react';
import { Editor, EditorState, Entity, ContentState, CompositeDecorator, RichUtils, convertToRaw, convertFromHTML, Modifier } from 'draft-js';
import { InlineStyleControls } from './utils/InlineStyleControls';
import { stateToHTML } from 'draft-js-export-html';
import { Link, CreateLinkControl, getSelectedLink } from './utils/CreateLink';
import { Superscript, SuperscriptControl } from './utils/Superscript';
import { Subscript, SubscriptControl } from './utils/Subscript';
import { BlockStyleControls } from './utils/BlockStyleControls';
import { BlockStyleDropdownControls } from './utils/BlockStyleDropdownControls';
import { createDecorators, LinkDecorator, SuperscriptDecorator, SubscriptDecorator } from './utils/decoratorStrategies';
import './richTextEditor.scss';

export default class RichTextEditor extends Component {
    constructor(props) {
        super(props);

        const decorator = createDecorators([
            LinkDecorator,
            SuperscriptDecorator,
            SubscriptDecorator
        ]);

        this.createEditorState = (val, dec) => this._createEditorState(val, dec);
        this.focus = () => this.refs.editor.focus();

        this.state = {
            editorState: this.createEditorState(this.props.value, decorator),
            urlValue: null
        };

        this.onChange = (editorState) => {
            this.setState({ editorState });
            this.props.onValueChange(stateToHTML(editorState.getCurrentContent()));
        };

        this.handleKeyCommand = this._handleKeyCommand.bind(this);
        this.toggleBlockType = (type) => this._toggleBlockType(type);
        this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
        this.toggleLink = () => this._toggleLink();
        this.toggleSuper = () => this._toggleSuper();
        this.toggleSub = () => this._toggleSub();
    }

    _handleKeyCommand(command) {
        const { editorState } = this.state;
        const newState = RichUtils.handleKeyCommand(editorState, command);

        if (newState) {
            this.onChange(newState);
            return true;
        }
        return false;
    }

    _toggleBlockType(blockType) {
        const { editorState } = this.state;
        this.onChange(
            RichUtils.toggleBlockType(editorState, blockType)
        );
    }

    _toggleInlineStyle(inlineStyle) {
        const { editorState } = this.state;
        this.onChange(
            RichUtils.toggleInlineStyle(editorState, inlineStyle)
        );
    }

    _toggleLink() {
        const { editorState } = this.state;
        const selectionState = editorState.getSelection();

        let entityKey = getSelectedLink(editorState, selectionState);

        if (entityKey === null) {
            entityKey = Entity.create('LINK', 'MUTABLE', {url: 'www.google.com'})
        } else {
            entityKey = null;
        }

        this.onChange(
            RichUtils.toggleLink(editorState, selectionState, entityKey)
        )
    }

    _onChange(editorState) {
        const newValue = this.setState({ editorState: editorState });
        this.props.onValueChange(newValue);
    }

    _renderControls(editorState, toggleInlineStyle, toggleBlockType, toggleLink, toggleSub, toggleSuper) {
        return (
            <div className="TextEditor-controls-bar">
                <InlineStyleControls
                    editorState={editorState}
                    onToggle={toggleInlineStyle}
                />
                <CreateLinkControl
                    editorState={editorState}
                    onToggle={toggleLink}
                />
                <SubscriptControl
                    editorState={editorState}
                    onToggle={toggleInlineStyle}
                />
                <SuperscriptControl
                    editorState={editorState}
                    onToggle={toggleInlineStyle}
                />
                <BlockStyleControls
                    editorState={editorState}
                    onToggle={toggleBlockType}
                />
                <BlockStyleDropdownControls
                    editorState={editorState}
                    onChange={toggleBlockType}
                />
            </div>
        );
    }

    _createEditorState(value, decorator) {
        if (!value) {
            return EditorState.createEmpty(decorator);
        } else {
            const blockArray = convertFromHTML(value);
            const contentState = ContentState.createFromBlockArray(blockArray);
            return EditorState.createWithContent(contentState, decorator);
        }
    }

    render() {
        const editorState = this.state.editorState;

        /**
         * If the user changes the block type before entering any text,
         * we can either style the placeholder or hide it.
         */
        let className = 'TextEditor-editor';
        const contentState = editorState.getCurrentContent();
        if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== 'unstyled') {
                className += ' TextEditor-hidePlaceholder';
            }
        }

        return (
            <div className="TextEditor-root">
                {this._renderControls(
                    editorState,
                    this.toggleInlineStyle,
                    this.toggleBlockType,
                    this.toggleLink,
                    this.toggleSub,
                    this.toggleSuper
                )}
                <div className={className} onClick={this.focus}>
                    <Editor
                        editorState={editorState}
                        handleKeyCommand={this.handleKeyCommand}
                        onChange={this.onChange}
                        ref="editor"
                        spellCheck
                    />
                </div>
            </div>
        );
    }


}

function createEmptyValue() {
    return EditorState.createEmpty();
}

function contentAsHTML(editorState) {
    const contentState = editorState.getCurrentContent();
    return stateToHTML(contentState);
}

function contentAsJS(editorState) {
    const contentState = editorState.getCurrentContent();
    return convertToRaw(contentState);
}

Object.assign(RichTextEditor, {
    createEmptyValue,
    contentAsHTML,
    contentAsJS
});

export { createEmptyValue };