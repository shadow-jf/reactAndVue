import React from 'react';
import { withRouter, Router, HashRouter, Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { addGun } from './../redux/action.js';

import Book from 'lazy!./book.js';
import Music from 'lazy!./music.js';

var actions = (dispacch) => {
    return {
        addGun: () => {
            dispacch(addGun())
        }
    }
}

var states = (Obj) => {
    return {
        counter: Obj.counter.state
    }
}
@withRouter
@connect(
    states,
    actions
)

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            num: 0
        }
    }
    addp = () => {
        console.log(778);
    }
    componentWillMount() {
        console.log(4);
    }
    componentDidMount() {

        console.log(1)
        // this.props.history.push('/book')

    }
    componentWillUnmount() {
        console.log(2);
    }
    componentWillUpdate(nextProps) {
        console.log(5, nextProps, this.props)
    }
    componentDidUpdate() {
        console.log(6)
    }
    componentWillReceiveProps(props) {
        console.log(3, this.props);
    }
    componentDidCatch() {
        console.log(7)
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log(4);
        return true
    }

    render() {
        return (
            // <div>
            //     <div>现在有{this.props.counter}</div>
            //     <button onClick={this.props.addGun}>增加</button>
            //     <div></div>
            // </div>
            <div className="index">
                <Switch>
                    <Route path='/' component={Book}></Route>
                    <Route path='/book' component={Book}></Route>
                    <Route path='/music' component={Music}></Route>
                </Switch>
            </div>
        )
    }
}




// App=withRouter(connect(states,actions)(App))

export default App