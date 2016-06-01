import React, { Component, PropTypes } from 'react';
import { Panel } from 'react-bootstrap';

const panelTitle = () => {
    return (
        <h3>Editor State: Draft + Immutable</h3>
    );
};

export default class StateDemoPanel extends Component {
    render() {
        return (
            <Panel
                header={panelTitle()}
                bsStyle="info"
            >
                <pre
                    style={{
                        width: '600px',
                        maxWidth: '600px',
                        minHeight: '200px',
                        maxHeight: '200px',
                        fontSize: '10px'
                    }}
                >
                    {this.props.stateToRender}
                </pre>
            </Panel>
        );
    }
}

StateDemoPanel.propTypes = {
    stateToRender: PropTypes.string
};
