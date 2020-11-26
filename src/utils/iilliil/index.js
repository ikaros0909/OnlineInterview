import * as otherColors from './colors';
import openColors from './colors';
import * as H_Func from './functional';
import * as H_Math from './math';
import * as H_Regex from './regex';
import * as H_RN from './RN';
import * as H_Scale from './scale';
import * as H_Theme from './theme';
import * as H_Time from './time';
import * as H_Utils from './utils';

const H_Colors = {
  ...otherColors,
  ...openColors,
};

export { H_Colors, H_Func, H_Math, H_Regex, H_RN, H_Scale, H_Theme, H_Time, H_Utils };

// const HC = { Colors, Func, Math, Regex, Time, Utils };
// export { HC };
