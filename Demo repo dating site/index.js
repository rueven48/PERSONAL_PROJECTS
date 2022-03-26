/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter,Route,Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware,compose } from 'redux';
import promiseMiddleware from 'redux-promise';
import Header from './components/header';
import Home from './components/Pages/home';
import RegisterStep1 from './components/Pages/registerStep1';
import RegisterStep2 from './components/Pages/registerStep2';
import RegisterStep3 from './components/Pages/registerStep3';
import RegisterStep4 from './components/Pages/registerStep4';
import Main from './components/Pages/main'; 
import Search from './components/Pages/search';
import Mailbox from './components/Pages/mailbox';
import Views from './components/Pages/views';
import Likes from './components/Pages/likes';
import Favorites from './components/Pages/favorites';
import bootstrap from 'bootstrap/dist/css/bootstrap.css';
import './sass/main.scss';

// REDUCERS
import reducers from './reducers';

// REDEUX DEV TOOLS EXTENSION 
window.devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
const enhancers = compose(
    window.devToolsExtension?window.devToolsExtension(): f => f
);


const createStoreWithMiddleware = applyMiddleware(promiseMiddleware)(createStore);

ReactDOM.render(
<Provider store={createStoreWithMiddleware(reducers,enhancers)}>
    
    <BrowserRouter >
    
        <div >
            <Header/>
                        
            <Switch>
                <Route  path="/favorites" component={Favorites}/>
                
                <Route  path="/likes" component={Likes}/>

                <Route  path="/views" component={Views}/>   

                <Route  path="/mailbox" component={Mailbox}/>                
                
                <Route  path="/search" component={Search}/> 
                    
                <Route path="/main" component={Main}/>

                <Route path="/registerStep4" component={RegisterStep4}/>

                <Route path="/registerStep3" component={RegisterStep3}/>

                <Route path="/registerStep2" component={RegisterStep2}/>
                
                <Route path="/registerStep1" component={RegisterStep1}/>
                                                                                                                    
                <Route path="/" component={Home}/>                               
            </Switch>
        </div>
        
    </BrowserRouter>
</Provider>, document.getElementById('root'));