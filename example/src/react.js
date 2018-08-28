import React from 'react';

/**
 * @class TimerExample
 * @extends {React.Component}
 */
class TimerExample extends React.Component {
    /**
     * The displayName string is used in debugging messages. Usually, you don’t
     * need to set it explicitly because it’s inferred from the name of the
     * function or class that defines the component. You might want to set it
     * explicitly if you want to display a different name for debugging
     * purposes or when you create a higher-order component.
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
      this.setState({ elapsed: new Date() - this.props.start });
    }

    render() {
      const elapsed = Math.round(this.state.elapsed / 100);

      // This will give a number with one digit after the decimal dot (xx.x):
      const seconds = (elapsed / 10).toFixed(1);

      // Although we return an entire <p> element, react will smartly update
      // only the changed parts, which contain the seconds variable.
      return (
        <p>This example was started <b>{seconds} seconds</b> ago.</p>
      );
    }
}

export default TimerExample;
