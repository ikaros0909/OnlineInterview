import { Dimensions, StatusBar } from 'react-native';
const { width, height } = Dimensions.get('window');

let WIDTH = width;
let HEIGHT = height;
if (width < height) {
  WIDTH = height;
  HEIGHT = width;
}
export const WINDOW_WIDTH = WIDTH;
export const WINDOW_HEIGHT = HEIGHT;
export const WINDOW_HEIGHT_EXCEPT_STATUSBAR = HEIGHT - StatusBar.currentHeight;

// 개발하는 환경의 WIDTH, HEIGHT  를 입력하고 진행하세요
// console.log({ WIDTH, HEIGHT }); 1280 748
const TEST_DEVICE_WIDTH = 1280;
const TEST_DEVICE_HEIGHT = 748;
const TEST_DEVICE_DIAGONAL = Math.sqrt(TEST_DEVICE_WIDTH ** 2 + TEST_DEVICE_HEIGHT ** 2);

export const scale = (size) => (WIDTH / TEST_DEVICE_WIDTH) * size;
export const verticalScale = (size) => (HEIGHT / TEST_DEVICE_HEIGHT) * size;
export const digonalScale = (size) => (Math.sqrt(WIDTH ** 2 + HEIGHT ** 2) / TEST_DEVICE_DIAGONAL) * size;
export const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

export const s = scale;
export const vs = verticalScale;
export const ds = digonalScale;
export const ms = moderateScale;
