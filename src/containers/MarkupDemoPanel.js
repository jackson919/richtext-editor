import React, { Component, PropTypes } from 'react';
import { Panel, Tabs, Tab } from 'react-bootstrap';

export default class MarkupDemoPanel extends Component {
    render() {
        return (
            <Panel>
                <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                    <Tab eventKey={1} title="Raw Markup">
                        <pre
                            style={{
                                width: '600px',
                                maxWidth: '600px',
                                maxHeight: '250px',
                                marginTop: '10px',
                                fontSize: '10px'
                            }}
                        >
                            {this.props.rawMarkup}
                        </pre>
                    </Tab>
                    <Tab eventKey={2} title="Rendered HTML">
                        <div
                            style={{
                                width: '600px',
                                maxWidth: '600px',
                                maxHeight: '250px',
                                marginTop: '10px',
                                overflow: 'auto'
                            }}
                        >
                            <div dangerouslySetInnerHTML={this.props.markup()}></div>
                        </div>
                    </Tab>
                </Tabs>
            </Panel>
        );
    }
}

MarkupDemoPanel.propTypes = {
    rawMarkup: PropTypes.string,
    markup: PropTypes.any
};
