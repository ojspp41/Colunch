/**
 * 한글 문자열에서 초성, 중성, 종성을 분리하는 함수
 * @param {string} text 분리할 문자열
 * @returns {Array} 초성, 중성, 종성으로 분리된 배열
 */
const decomposeHangul = (text) => {
  const CHOSUNG = [
    "ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ",
  ];
  const JUNGSUNG = [
    "ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅗ", "ㅘ", "ㅙ", "ㅚ", "ㅛ", "ㅜ", "ㅝ", "ㅞ", "ㅟ", "ㅠ", "ㅡ",
    "ㅢ", "ㅣ",
  ];
  const JONGSUNG = [
    "", "ㄱ", "ㄲ", "ㄳ", "ㄴ", "ㄵ", "ㄶ", "ㄷ", "ㄹ", "ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ", "ㅀ", "ㅁ", "ㅂ", "ㅄ", "ㅅ",
    "ㅆ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ",
  ];

  let result = [];

  for (const char of text) {
    const code = char.charCodeAt(0) - 0xac00; // 한글 유니코드 시작값(0xAC00)에서 빼기
    if (code >= 0 && code <= 11171) { // 유니코드 범위 확인
      const chosungIndex = Math.floor(code / 588); // 초성 인덱스
      const jungsungIndex = Math.floor((code % 588) / 28); // 중성 인덱스
      const jongsungIndex = code % 28; // 종성 인덱스

      result.push({
        chosung: CHOSUNG[chosungIndex],
        jungsung: JUNGSUNG[jungsungIndex],
        jongsung: JONGSUNG[jongsungIndex],
      });
    } else {
      result.push({
        chosung: char,
        jungsung: "",
        jongsung: "",
      }); // 한글이 아닌 경우 그대로 추가
    }
  }

  return result;
};

export default decomposeHangul;
