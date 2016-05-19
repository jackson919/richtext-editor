import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as CounterActions from '../actions/CounterActions';
import RichTextEditor from '../components/RichTextEditor';
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

        this.renderInnerMarkup = () => this._renderInnerMarkup();

        this.state = {
            value: (`
                <h1>Text editing shouldn't be hard.</h1>
                <p>It should be <em>easy</em>.</p>
                <p><br/></p>
                <p>Use <strong>react-rich-text-editor </strong>(<em>powered</em> by<em> </em><em><ins>draft-js</ins></em>)* to add <a href="www.google.com">links</a> or lists:</p>
                <ul>
                  <li>Unordered,</li>
                  <li>like this one.</li>
                </ul>
                <ol>
                  <li>Or ordered,</li>
                  <li>like this one.</li>
                </ol>
                <p>* subscripts and superscripts are easy too!</p>
            `)
        };
    }

    _renderInnerMarkup() {
        const markup = { __html: this.state.value };
        return markup;
    }

    render() {
    // we can use ES6's object destructuring to effectively 'unpack' our props
        return (
                <div className="main-app-container">
                    <div className="main-app-nav">RTE</div>
                    <div>
                        <br />
                        <RichTextEditor
                            value={this.state.value}
                            onValueChange={this.onChange}
                        />

                        <hr />

                        <pre style={{ width: '600px', maxWidth: '600px', overflowX: 'scroll' }}>
                            {this.state.value}
                        </pre>

                        <hr />

                        <div dangerouslySetInnerHTML={this.renderInnerMarkup()}></div>
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
