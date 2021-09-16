import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {addGun} from './../redux/action.js';


var actions = (dispacch) => {
  return {
    addGun: () => {
      dispacch(addGun());
    },
  };
};

var states = (Obj) => {
  return {
    counter: Obj.counter.state,
  };
};

@withRouter
@connect(
  states,
  actions,
)


class Book extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ccp: 0,
    };
  }

  addp = () => {
    console.log(778);
  };

  componentWillMount() {
    console.log(4);
  }

  componentDidMount() {

    // this.props.history.push('/book')

  }

  componentWillUnmount() {
    console.log(2);
  }

  componentWillUpdate() {
    console.log(5);
  }

  componentDidUpdate() {
    console.log(6);
  }

  componentWillReceiveProps(props) {
    console.log(3);
  }

  componentDidCatch() {
    console.log(7);
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(4);
    return true;
  }

  render() {
    return (<div>84488book</div>);
  }
}

export default Book;