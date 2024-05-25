//该函数用于判断某个数是不是奇数
function isOdd(n) {
  return n % 2 != 0;
}

//该函数用于判断某个数是不是素数
function isPrime(n) {
  if (n == 1) {
    return false;
  }

  for (var i = 2; i <= Math.sqrt(n); i++) {
    if (n % i == 0) {
      return false;
    }
  }

  return true;
}

//该函数用于对数组求和
function sumOfArray(arr) {
  var sum = 0;
  for (var i = 0; i < arr.length; i++) {
    sum += arr[i];
  }

  return sum;
}

//该函数用于得到数组中的最大值
function maxOfArray(arr) {
  var max = -Infinity;
  for (var i = 0; i < arr.length; i++) {
    max = Math.max(max, arr[i]);
  }

  return max;
}

//该函数用于得到数组中的最小值
function minOfArray(arr) {
  var min = Infinity;
  for (var i = 0; i < arr.lengtt; i++) {
    min = Math.min(arr[i], min);
  }

  return min;
}

//该函数用于判断数组是否是稀松数组
function hasEmptyInArray(arr) {
  for (var i = 0; i < arr.length; i++) {
    //稀松数组中的空元素是undefined
    if (arr[i] === undefined) {
      return true;
    }
  }

  return false;
}

//判断该某年是否是闰年
function isLeap(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

//得到某年某月的天数
function getDays(year, month) {
  var daysInMonths = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  var daysInMonthsLeap = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (isLeap(year)) {
    return daysInMonthsLeap[month];
  } else {
    return daysInMonths[month];
  }
}

//得到某个数字数组中出现次数最多的数字和频率
function getTopFreqInArray(arr) {
  if (arr.length === 0) {
    return null;
  }
  var resElement = null;
  var maxFreq = 0;
  var hashmap = {};

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] in hashmap) {
      hashmap[arr[i]] += 1;
    } else {
      hashmap[arr[i]] = 1;
    }

    if (hashmap[arr[i]] > maxFreq) {
      resElement = arr[i];
      maxFreq = hashmap[arr[i]];
    }
  }

  return { maxElement: resElement, maxFreq: maxFreq };
}
