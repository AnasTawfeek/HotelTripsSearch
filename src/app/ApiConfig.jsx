import _ from 'lodash';
import SafeUrlAssembler from 'safe-url-assembler';

/**
 * Generic
 */
export const RootUrl = 'https://api.myjson.com/';

/**
 * News
 */
export const GetHotelsApi =  SafeUrlAssembler(RootUrl)
                            	 .template('/bins/tl0bp')
                            	 .toString();
