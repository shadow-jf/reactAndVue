import { combineReducers } from 'redux';

import {counter} from './ruducer.js';
import {mcounter} from './mreducer.js';
// //多个reduce联合使用;
export default combineReducers({counter,mcounter});
// export default counter

