import React from 'react';

/**
 * @class TimerExample
 * @extends {React.Component}
 */
class TimerExample extends React.Component {
    /**
     * The displayName string used in debugging messages.
     * @static
     * @name TimerExample.displayName
     */
    static displayName = 'TimerExample';

    constructor(props) {
        super(props);
        this.state = { elapsed: 0 };
    }

    /**
     * Called by React when the component has been rendered on the page. We can
     * set the interval here.
     * @method TimerExample.prototype.componentDidMount
     */
    componentDidMount() {
        this.timer = setInterval(this.tick, 50);
    }

    /**
     * Called immediately before the component is removed from the page and
     * destroyed. We can clear the interval here.
     * @method TimerExample.prototype.componentWillUnmount
     */
    componentWillUnmount() {
        clearInterval(this.timer);
    }

    /**
     * Called every 50 ms to update the elapsed counter. Calling setState causes
     * the component to be re-rendered.
     * @method TimerExample.prototype.tick
     */
    tick() {
        this.setState({elapsed: new Date() - this.props.start});
    }

    render() {
        var elapsed = Math.round(this.state.elapsed / 100);

        // This will give a number with one digit after the decimal dot (xx.x):
        var seconds = (elapsed / 10).toFixed(1);

        // Although we return an entire <p> element, react will smartly update
        // only the changed parts, which contain the seconds variable.
        return <p>This example was started <b>{seconds} seconds</b> ago.</p>;
    }
}

export default TimerExample;
