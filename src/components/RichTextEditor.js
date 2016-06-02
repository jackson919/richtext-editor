import React, { Component } from 'react';
import {
    Editor,
    EditorState,
    Entity,
    ContentState,
    RichUtils,
    convertToRaw,
    convertFromRaw,
    convertFromHTML
} from 'draft-js';
import { stateToHTML } from 'draft-js-export-markup';
import { InlineStyleControls } from './utils/controllers/InlineStyleControls';
import { CreateLinkControl } from './utils/controllers/LinkControls';
import { BlockStyleControls } from './utils/controllers/BlockStyleControls';
import { BlockStyleDropdownControls } from './utils/controllers/BlockStyleDropdownControls';
import { getSelectedLink } from './utils/decorators/LinkDecorator';
import {
    createDecorators,
    LinkDecorator,
    SuperscriptDecorator,
    SubscriptDecorator
} from './utils/decorators/decoratorStrategies';
import './richTextEditor.scss';

const INLINE_MAP = {
    inlineTags: {
        SUPERSCRIPT: 'sup',
        SUBSCRIPT: 'sub'
    }
};

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
            editorState: this.createEditorState(this.props.value, decorator)
        };

        this.onChange = (editorState) => {
            if (!!this.props.returnHTML) {
                this.props.returnHTML(stateToHTML(editorState.getCurrentContent(), INLINE_MAP));
            }
            this.setState({ editorState });
            this.props.onValueChange(convertToRaw(editorState.getCurrentContent()));
        };

        this.handleKeyCommand = this._handleKeyCommand.bind(this);
        this.toggleBlockType = (type) => this._toggleBlockType(type);
        this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
        this.toggleLink = () => this._toggleLink();
        this.toggleSuper = () => this._toggleSuper();
        this.toggleSub = () => this._toggleSub();
        this.submitLink = (url) => this._submitLink(url);
        this.noop = () => this._noop();
        this.renderControls = () => this._renderControls();
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
        this.onChange(RichUtils.toggleBlockType(editorState, blockType));
    }

    _toggleInlineStyle(inlineStyle) {
        const { editorState } = this.state;
        this.onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
    }

    _submitLink(urlValue) {
        const { editorState } = this.state;
        const selectionState = editorState.getSelection();
        let entityKey = getSelectedLink(editorState, selectionState);

        if (entityKey === null) {
            entityKey = Entity.create('LINK', 'MUTABLE', { url: urlValue });
        } else {
            entityKey = null;
        }

        this.onChange(RichUtils.toggleLink(editorState, selectionState, entityKey));
    }

    _onChange(editorState) {
        const newValue = this.setState({ editorState: editorState });

        this.props.onValueChange(newValue);
    }

    _noop() {
        return;
    }

    _renderControls() {
        const { editorState } = this.state;

        return (
            <div className="TextEditor-controls-container">
                <InlineStyleControls
                    editorState={editorState}
                    onToggle={this.toggleInlineStyle}
                />
                <CreateLinkControl
                    editorState={editorState}
                    onToggle={this.noop}
                    onSubmit={this.submitLink}
                    showInput={true}
                />
                <BlockStyleControls
                    editorState={editorState}
                    onToggle={this.toggleBlockType}
                />
                <BlockStyleDropdownControls
                    editorState={editorState}
                    onChange={this.toggleBlockType}
                />
            </div>
        );
    }

    _createEditorState(value, decorator) {
        if (!value) {
            return EditorState.createEmpty(decorator);
        } else if (typeof value === 'string') {
            const blockArray = convertFromHTML(value);
            const contentState = ContentState.createFromBlockArray(blockArray);
            return EditorState.createWithContent(contentState, decorator);
        } else {
            const blockArray = convertFromRaw(value);
            const contentState = ContentState.createFromBlockArray(blockArray);
            return EditorState.createWithContent(contentState, decorator);
        }
    }

    render() {
        const { editorState } = this.state;
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
                {this.renderControls()}
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
    return stateToHTML(contentState, INLINE_MAP);
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
