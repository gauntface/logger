import {NodeLogger} from './NodeLogger';
import {nodeFactory} from './nodeFactory';

export {NodeLogger as Logger};
export {nodeFactory as factory};

const logger = new NodeLogger();
export {logger};
