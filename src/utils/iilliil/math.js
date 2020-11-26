/**
 * @param input - 처리할 숫자
 * @param calDecimalPlace  - 계산할 소수점 자릿수
 * @param type - ceil: 올림 floor: 내림 round: 반올림
 */
export const handleCeilFloorRound = (input, calDecimalPlace, type) => {
  switch (type) {
    case 'ceil': {
      // 올림
      const C = Math.pow(10, calDecimalPlace - 1);
      const R = Math.ceil(input * C) / C;
      return R;
    }
    case 'floor': {
      // 내림
      const C = Math.pow(10, calDecimalPlace - 1);
      const R = Math.floor(input * C) / C;
      return R;
    }
    case 'round': {
      // 반올림
      const C = Math.pow(10, calDecimalPlace - 1);
      const R = Math.round(input * C) / C;
      return R;
    }
    default: {
      const C = Math.pow(10, calDecimalPlace - 1);
      const R = Math.round(input * C) / C;
      return R;
    }
  }
};
