import {isValidElement} from '../../../MyApp/Utils/helpers';
import {VOICE_OUTPUTS} from './Constants';

export const getRequiredRange = voiceResult => {
  let value;
  if (
    isValidElement(voiceResult) &&
    isValidElement(voiceResult.value) &&
    voiceResult.value.length > 0
  ) {
    voiceResult.value.forEach(data => {
      if (data.toLowerCase() === VOICE_OUTPUTS.ONE_MONTH.toLowerCase()) {
        value = 2;
      } else if (data.toLowerCase() === VOICE_OUTPUTS.ONE_DAY.toLowerCase()) {
        value = 1;
      } else if (data.toLowerCase() === VOICE_OUTPUTS.ONE_YEAR.toLowerCase()) {
        value = 3;
      }
    });
  }
  return value;
};
