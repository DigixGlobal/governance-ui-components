import React from 'react';
import ReactDOM from 'react-dom';
// import './css/index.css';
import './global-styles';

import App from './ui';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
