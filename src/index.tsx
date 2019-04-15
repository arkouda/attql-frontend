import React from 'react';
import ReactDOM from 'react-dom';
// import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom'
import {Home} from './pages/home'

const CoreApp = () => (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        
        {/* <Route path="/TabularView" component={TabularView}></Route> */}
        {/* <Redirect from="/" to="/TabularView"></Redirect>  */}
      </Switch>
    </BrowserRouter>
);

ReactDOM.render(<CoreApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
