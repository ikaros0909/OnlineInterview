export const getThemeColors = (NEISCode) => {
  if (NEISCode === 'A000008888') {
    const result = {
      BG_COLOR: '#e5e7ec', // 배경색: 컨텐츠 뒤에 까는 도화지

      CONTENTS_BOX_COLOR: '#ffffff', // 컨텐츠 박스 색
      CONTENTS_DIVIDER_COLOR: '#ebeef3', // 컨텐츠 디바이더 색
      CONTENTS_TEXT_COLOR: '#333333', // 컨텐츠 위 텍스트 색

      DARK_CONTENTS_BOX_COLOR: '#bdc7d6', // 어두운 컨텐츠 박스 색
      DARK_CONTENTS_TEXT_COLOR: '#000000', // 어두운 컨텐츠 위 텍스트 색

      THEME_COLOR: '#0561be', // 테마색
      THEME_COLOR_TEXT: '#1f487e', // 어두운 테마색
      THEME_COLOR_LIGHT: '#bdc7d6', // 밝은 테마색
      THEME_BUTTON_TEXT_COLOR: '#ffffff', // 테마위에 올리는 글자색

      INACTIVE_COLOR: '#999999', // 배경위 비활성화 색
      ALERT_COLOR: 'red', // 경고 색
    };
    return result;
  }

  const result = {
    BG_COLOR: '#e5e7ec', // 배경색: 컨텐츠 뒤에 까는 도화지

    CONTENTS_BOX_COLOR: '#ffffff', // 컨텐츠 박스 색
    CONTENTS_DIVIDER_COLOR: '#ebeef3', // 컨텐츠 디바이더 색
    CONTENTS_TEXT_COLOR: '#333333', // 컨텐츠 위 텍스트 색

    DARK_CONTENTS_BOX_COLOR: '#e5e7ec', // 어두운 컨텐츠 박스 색
    DARK_CONTENTS_TEXT_COLOR: '#000000', // 어두운 컨텐츠 위 텍스트 색

    THEME_COLOR: '#0561be', // 테마색
    THEME_COLOR_TEXT: '#1f487e', // 어두운 테마색
    THEME_COLOR_LIGHT: '#bdc7d6', // 밝은 테마색
    THEME_BUTTON_TEXT_COLOR: '#ffffff', // 테마위에 올리는 글자색

    INACTIVE_COLOR: '#999999', // 배경위 비활성화 색
    ALERT_COLOR: 'red', // 경고 색
  };
  return result;
};

export default getThemeColors;
