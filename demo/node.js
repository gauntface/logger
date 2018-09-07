const {logger} = require('hopin-logger');

logger.setPrefix('Example');

logger.debug('Doing some debugging?');
logger.info('I hope to provide info');
logger.log('I\'m a friendly log.');
logger.warn('Oops, I\'m an warning.');
logger.error('Eek! I\'m an error.');

logger.group('I can group logs together.');
logger.log('Message in a group....');
logger.log('....awesome sauce.');
logger.groupEnd();
