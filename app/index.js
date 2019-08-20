var React = require('react');
var ReactDOM = require('react-dom');
require('./index.css');

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    // describes what the UI will look like
    render() {
        return(
            <div>
                that's pretty cool
            </div>
        )
    }
 }

 ReactDOM.render(<App />, document.getElementById('app'));