import _defaultDeep from 'lodash.defaultsdeep';
import {Config, def} from './envFiles/env.def';
import {dev} from './envFiles/env.dev';
import {stag} from './envFiles/env.stag';

let config: Config;

switch (process.env.NODE_ENV) {
	case 'development':
		config = dev;
		break;
	case 'staging':
		config = stag;
		break;
	default:
		config = def;
		break;
}

_defaultDeep(config, def);

export default config;