import * as R from 'ramda';

// error handling 없이 무조건 null return
export const checkTC = (fn) => {
  try {
    return fn();
  } catch (e) {
    return null;
  }
};
export const isNull = (val) => {
  return String(val) === 'NULL' ? null : val;
};

export const isBoolean = (val) => {
  return String(val) === '0' ? false : String(val) === '1';
};

export const auth = (params) => {
  return '';
};

// data sorting
// * array JSON 형식의 데이터를 요청한 컬럼들을 기준으로 정렬하여 리턴
// ex) dSort(["AColumn", "BColumn"], arrayJson);
// return => [{"AColumn": 1, "BColumn": 1}, {"AColumn": 1, "BColumn": 2}, {"AColumn": 2, "BColumn": 1}]
export const dSort = (columns, data) => {
  return R.pipe(R.sortBy(R.props(columns)))(data);
};

// data sorting + asc, desc 기능 추가
// * array JSON 형식의 데이터를 요청한 컬럼들을 기준으로 정렬하여 리턴
// 컬럼명 끝에 :R 을 추가 시 해당 컬럼은 desc 처리
// ex) dSortWith(["AColumn:D", "BColumn"], arrayJson);
export const dSortWith = (columns, data) => {
  const colItems = columns.map((item, i) => {
    return item.indexOf(':D') === -1 ? R.ascend(R.prop(item)) : R.descend(R.prop(item.replace(':D', '')));
  });

  return R.sortWith(colItems, data);
};

// data grouping
// * 특정컬럼들을 추출하여 grouping 하여 array JSON 형식으로 리턴
// ex) dGroup(["AColumn", "BColumn"], arrayJson);
// ex2) dGroup(["AColumn", "BColumn"], arrayJson, ["AColumn"]);
// return => [{"AColumn": 5, "BColumn": 6}, {"AColumn": 4, "BColumn": 2}, {"AColumn": 3, "BColumn": 8}]
export const dGroup = (columns, data, sort) => {
  const result = R.pipe(R.map(R.props(columns)), R.map(JSON.stringify), R.uniq, R.map(JSON.parse), R.map(R.zipObj(columns)))(data);
  if (typeof sort === 'undefined') return result;
  return dSortWith(sort, result);
};

// data Filter
// * AND 연산으로 컬럼의 벨류값들이 정확히 일치하는 행을 array JSON 형식으로 리턴
// ex) dFilter([{"AColumn": "a"}, {"BColumn": "b"}], arrayJson);
// return => [{"AColumn" : "a", "BColumn": "b", "CColumn" : "c"}]
export const dFilter = (fieldName, data) => {
  let tmpData = data;
  fieldName.map((item) => {
    if (item[Object.keys(item)[0]] !== '') {
      tmpData = R.filter(R.propEq(Object.keys(item)[0], item[Object.keys(item)[0]]))(tmpData);
    }
  });

  return tmpData;
};
// data Fillter IN
// * IN 연산으로 벨류값을 array내 벨류값을 포함하면 해당값을 리턴
// ex) dFilterIn("FailType", [1, 2, 3], userList);
// return => [{SuhumNo: "BOAA10004", ApplicantName: "***", DisplayName: "진리_전자_473", SelTypeCode: "O", SelTypeName: "진리자유전형", …}]
export const dFilterIn = (fieldName, fieldArr, data) => {
  let tmpData = data;
  if (fieldArr.length > 0) {
    tmpData = R.filter(R.compose(R.flip(R.contains)(fieldArr), R.prop(fieldName)), tmpData);
  }
  return tmpData;
};

// data Filter LIKE
// * AND 연산으로 컬럼의 벨류값들이 LIKE로 일치하는 행을 array JSON 형식으로 리턴
// ex) dFilter([{"AColumn": "a"}, {"BColumn": "b"}], arrayJson);
// return => [{"AColumn" : "a", "BColumn": "b", "CColumn" : "c"}]
export const dFilterLike = (fieldName, data) => {
  let tmpData = data;
  fieldName.map((item) => {
    if (item[Object.keys(item)[0]] !== '') {
      tmpData = R.filter(
        R.where({
          [Object.keys(item)[0]]: R.contains(item[Object.keys(item)[0]]),
        }),
      )(tmpData);
    }
  });
  return tmpData;
};

// data Duplication
export const dDuplicate = R.reduce(R.concat, []);

//숫자형 데이터인 경우 1000단위 ","를 넣어서 리턴
// ex) comma("2000")
// return "2,000"
export const comma = (value) => {
  //Number.isInteger(value)
  return typeof value === 'number' ? value.toLocaleString(navigator.language, { minimumFractionDigits: 0 }) : value;
};

// 데이터(학생부 비교과나 자기소개서 등에 쓰이는)\n 반영해 화면에 보여주는 함수
export const enterData = (data, fontSize) => {
  if (data === null) {
    return <p />;
  } else {
    return data.split(/(♨|\n)/).map((item, i) => {
      return (
        <p key={i} style={{ fontSize: fontSize }}>
          {item}
        </p>
      );
    });
  }
};

export const enterToBr = (data) => {
  if (data) {
    //console.log(data.indexOf(/(\n)/));
  }
  return data ? data.replace(/(\n|♨|\/EOR\/)/gi, '<br />') : '';
};

export const bindKeyword = (keyword, originalData) => {
  if (!originalData) return '';

  let rtnData = originalData;

  keyword.map((item, i) => {
    if (item.Keyword.trim() !== '') {
      //공백이 업로드된경우 시스템 먹통됨을 방지
      const Keyword = item.Keyword.replace(/([()[{*+.$^\\|?])/g, '\\$1');
      const filter = new RegExp(Keyword, 'g');
      const replaceValue = `<b style="${item.Style}">${item.Keyword}</b>`;
      rtnData = rtnData.replace(filter, replaceValue);
    }
  });
  return rtnData;
};

// stateJsonCopy
// state의 json array를 copy시 사용
// 목적: 새로운 객체 만드는거
export const stateJsonCopy = (data) => {
  return JSON.parse(JSON.stringify(data));
};

// 필수체크
// let val = validation(this.state, { exception: ["evalName"] });
export const validation = (data, opts) => {
  var result = { success: true };
  var opt = opts || {};
  var exception = opt.exception || [];
  var include = opt.include || [];
  var value = opt.value || '';

  for (var key in data) {
    let check = false;
    if (typeof data[key] !== 'string') {
      check = true;
      continue;
    }
    //컬럼 제외
    for (var s in exception) {
      if (exception[s] === key) {
        check = true;
        break;
      }
    }
    if (check) continue;

    //컬럼 지정
    let includeCheck = false;
    for (var k in include) {
      if (include[k] === key) {
        includeCheck = true;
        break;
      }
    }
    if (include.length > 0 && !includeCheck) continue;
    //컬럼비교
    if (data[key] === value) {
      result = { success: false, column: key };
      return result;
    }
  }
  return result;
};

// 데이터 비교
// val = compare(this.state, {compare: ["evalName", "groupName"]});
export const compare = (data, opts) => {
  var opt = opts || {};
  var compare = opt.compare || [];
  let sPre = '';

  if (compare.length < 2) return false;

  for (var i in compare) {
    var s = compare[i];
    if (i > 0 && data[sPre] !== data[s]) {
      return { success: false, column: s };
    }
    sPre = s;
  }
  return { success: true, column: sPre };
};

// json 데이터의 특정 컬럼 bool 체크 유무 확인(1개이상인지)
export const jsonDataChecked = (data, column) => {
  column = column || 'check';
  let checked = false;
  for (var i in data) {
    if (data[i][column]) {
      checked = true;
      break;
    }
  }
  return checked;
};

export const maskingText = (text, maskingWord, useLength, appendText, use) => {
  if (use) {
    const maskingArray = new Array(useLength ? useLength : text.length).fill(maskingWord || '*');

    let rtnText = maskingArray.join('');

    if (appendText) rtnText = rtnText + appendText;

    return rtnText;
  }
  return text;
};

// Blob -> String 변환
export const parseBlob = async (file) => {
  const reader = new FileReader();
  reader.readAsText(file);
  return await new Promise((resolve, reject) => {
    reader.onload = function (event) {
      resolve(reader.result);
    };
  });
};

export const getBlindText = (parent, node, isPre, point) => {
  const getNode = (parent, node, isPre) => {
    let fn = isPre ? 'previousSibling' : 'nextSibling';
    return parent !== node.parentNode ? node.parentNode[fn] : node[fn];
  };

  const params = isPre ? [0, point] : [point, node.textContent.length];
  let text = node.textContent.substring(...params);
  node = getNode(parent, node, isPre, point);

  // 문자열 앞뒤에 공백이 아닌경우 어절을 ++
  let wordCnt = 2;

  let p = point;

  while (node) {
    p = p + node.textContent.length;
    text = isPre ? node.textContent + text : text + node.textContent;
    node = getNode(parent, node, isPre, point);
  }

  // 문자열 앞뒤 공백 OR 문자열 확인
  const firstWord = isPre ? text.substring(p - 1, p) : text.slice(0, 1);
  const wordCheck = firstWord.match(/(\n|\t|\s)/);
  if (!wordCheck) wordCnt++;

  // 앞뒤 문자열에서 공백, 탭, 엔터를 SPACE 로 변경 및 SPACE로 해당 어절 스플릿
  text = text.replace(/(\r|\n|\t)/g, ' ');
  let word = text.split(' ');

  // 배열내 공백 값 제거
  word = word.filter((x) => !!x);

  // 앞뒤 어절 wordCnt 갯수만큼 추출
  let sLen = isPre ? wordCnt * -1 : 0;
  let eLen = isPre ? word.length : wordCnt;
  word = word.slice(sLen, eLen);

  // 양옆 공백값 생성
  const leftSpace = !isPre && wordCheck ? ' ' : '';
  const rightSpace = isPre && wordCheck ? ' ' : '';

  return `${leftSpace}${word.join(' ')}${rightSpace}`;
};

export const bindMasking = (maskingArr, originalData) => {
  if (!originalData) return '';
  if (!maskingArr) return originalData;

  let rtnData = originalData;
  maskingArr.map((item, i) => {
    if (item.value.trim() !== '') {
      //공백이 업로드된경우 시스템 먹통됨을 방지
      const bvalue = item.value.replace(/([()[{*+.$^\\|?])/g, '\\$1');
      const filter = new RegExp(bvalue, 'g');
      const masking = item.value.replace(/./g, '*');
      //maskingValue가 ***일경우 글자수만큼 * 처리하고 그렇지 않을경우 maskingValue를 사용함 danny 2018.11.20
      rtnData = rtnData.replace(filter, item.maskingValue === '***' ? masking : item.maskingValue);
    }
  });
  return rtnData;
};

export const stdev = (arr) => {
  const n = arr.length;
  if (n === 0) return {};
  const sum = arr.reduce((a, b) => a + b);

  const mean = sum / n;

  let variance = 0.0;
  let v1 = 0.0;
  let v2 = 0.0;
  let stddev = 0.0;

  if (n != 1) {
    for (var i = 0; i < n; i++) {
      v1 = v1 + (arr[i] - mean) * (arr[i] - mean);
      v2 = v2 + (arr[i] - mean);
    }

    v2 = (v2 * v2) / n;
    variance = (v1 - v2) / (n - 1);
    if (variance < 0) {
      variance = 0;
    }
    stddev = Math.sqrt(variance);
  }

  return {
    mean: Math.round(mean * 1000) / 1000,
    variance: variance,
    deviation: Math.round(stddev * 1000) / 1000,
  };
};

// 소수점 0제거
// decimalZeroRemove("99.20000", 5)
export const decimalZeroRemove = (value, len) => {
  if (len === undefined) len = 5;
  const cipher = parseInt('1' + new Array(len + 1).join('0'), 10);
  if (isNaN(value) || value === '' || value === undefined || value === null) {
    return value;
  } else {
    return (value * cipher) / cipher;
  }
};

export const replaceHTMLTAG = (data) => {
  // 에디터블에서는 원본에 "<,>" 문자가 태그로 인식되어 사라짐
  let ConvertTag = [
    { value: '<', maskingValue: '&lt;' },
    { value: '>', maskingValue: '&gt;' },
  ];

  return data ? bindMasking(ConvertTag, data) : '';
};
