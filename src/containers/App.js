import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as CounterActions from '../actions/CounterActions';
import RichTextEditor from '../components/RichTextEditor';
import MarkupDemoPanel from './MarkupDemoPanel';
import StateDemoPanel from './StateDemoPanel';

// import Footer from '../components/Footer';

/**
 * It is common practice to have a 'Root' container/component require our main App (this one).
 * Again, this is because it serves to wrap the rest of our application with the Provider
 * component to make the Redux store available to the rest of the app.
 */
export default class App extends Component {
    constructor(props) {
        super(props);

        this.onChange = (value) => {
            this.setState({ value });
        };

        this.getMarkup = (markup) => {
            this.setState({ markup });
        };

        this.renderInnerMarkup = () => this._renderInnerMarkup();
        this.renderReturnedContent = (value) => this._renderReturnedContent(value);

        this.state = {
            value: (`
                        <h1>Text editing shouldn't be hard.</h1>
                        <p>It should be <em>easy</em>.</p>
                        <p><br></p>
                        <p>Use <strong>react-rich-text-editor </strong>(<em>powered</em> by <em><ins>draft-js</ins></em>)* to add links or lists: &nbsp;</p>
                        <ul>
                          <li>Unordered,</li>
                          <li>like this one.</li>
                        </ul>
                        <p><br></p>
                        <ol>
                          <li>Or ordered,</li>
                          <li>like this one.</li>
                        </ol>
                        <blockquote>* <sub>subscripts</sub> and <sup>superscripts</sup> are easy too!</blockquote>
                    `)
        };
    }

    _renderInnerMarkup() {
        const markup = { __html: this.state.markup };
        return markup;
    }

    _renderReturnedContent(value) {
        if (typeof value === 'string') {
            return value;
        } else {
            return JSON.stringify(value, null, 2);
        }
    }

    render() {
        return (
                <div className="main-app-container">
                    <div className="main-app-nav">RTE</div>
                    <div>
                        <br />
                        <RichTextEditor
                            value={this.state.value}
                            onValueChange={this.onChange}
                            returnHTML={this.getMarkup}
                        />

                        <hr />

                        <StateDemoPanel
                            stateToRender={this.renderReturnedContent(this.state.value)}
                        />

                        <hr />

                        <MarkupDemoPanel
                            markup={this.renderInnerMarkup}
                            rawMarkup={this.state.markup}
                        />
                    </div>
                    {/* <Footer />*/}
                </div>
                );
    }
}

App.propTypes = {
    counter: PropTypes.number.isRequired,
    actions: PropTypes.object.isRequired
};

/**
 * Keep in mind that 'state' isn't the state of local object, but your single
 * state in this Redux application. 'counter' is a property within our store/state
 * object. By mapping it to props, we can pass it to the child component Counter.
 */
function mapStateToProps(state) {
    return {
        counter: state.counter
    };
}

/**
 * Turns an object whose values are 'action creators' into an object with the same
 * keys but with every action creator wrapped into a 'dispatch' call that we can invoke
 * directly later on. Here we imported the actions specified in 'CounterActions.js' and
 * used the bindActionCreators function Redux provides us.
 *
 * More info: http://redux.js.org/docs/api/bindActionCreators.html
 */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(CounterActions, dispatch)
    };
}

/**
 * 'connect' is provided to us by the bindings offered by 'react-redux'. It simply
 * connects a React component to a Redux store. It never modifies the component class
 * that is passed into it, it actually returns a new connected componet class for use.
 *
 * More info: https://github.com/rackt/react-redux
 */

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
