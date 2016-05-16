import React, { Component } from 'react';
import Base from 'common/components/base/base';
import './richTextEditor.example.scss';

class RichTextEditorView extends Component {
    constructor(props) {
        super(props);

        this.onChange = (value) => {
            this.setState({ value });
        };

        this.state = {
            value: '<p><strong>Hello</strong> <em>World!</em></p>'
        };
    }

    render() {
        return (
            <div>
                <Base.RichTextEditor
                    value={this.state.value}
                    onValueChange={this.onChange}
                />

                <hr />

                <pre>
                    {this.state.value}
                </pre>
            </div>
        );
    }
}

export default {
    rootName: 'Base',
    name: 'Rich Text Editor',
    component: <RichTextEditorView />
};
