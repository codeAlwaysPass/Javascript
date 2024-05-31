var MyFunctions = {
  isOdd: function (n) {
    return n % 2 != 0;
  },

  isPrime: function (n) {
    if (n == 1) {
      return false;
    }

    for (var i = 2; i <= Math.sqrt(n); i++) {
      if (n % i == 0) {
        return false;
      }
    }

    return true;
  },

  sumOfArray: function (arr) {
    var sum = 0;
    for (var i = 0; i < arr.length; i++) {
      sum += arr[i];
    }

    return sum;
  },

  maxOfArray: function (arr) {
    var max = -Infinity;
    for (var i = 0; i < arr.length; i++) {
      max = Math.max(max, arr[i]);
    }

    return max;
  },

  minOfArray: function (arr) {
    var min = Infinity;
    for (var i = 0; i < arr.lengtt; i++) {
      min = Math.min(arr[i], min);
    }

    return min;
  },

  hasEmptyInArray: function (arr) {
    for (var i = 0; i < arr.length; i++) {
      //稀松数组中的空元素是undefined
      if (arr[i] === undefined) {
        return true;
      }
    }

    return false;
  },

  isLeap: function (year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  },

  getDays: function (year, month) {
    var daysInMonths = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var daysInMonthsLeap = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (this.isLeap(year)) {
      return daysInMonthsLeap[month];
    } else {
      return daysInMonths[month];
    }
  },

  getTopFreqInArray: function (arr) {
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
  },

  //为数组排序,要考虑到这个数组的所有可能
  sort: function (arr, compare) {
    if (!compare) {
      compare = function (a, b) {
        if (a > b) {
          return 1;
        } else if (a === b) {
          return 0;
        } else {
          return -1;
        }
      };
    }

    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < arr.length - i - 1; j++) {
        if (compare(arr[j], arr[j + 1]) > 0) {
          var temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
  },

  //按照指定的条件对某个数组进行筛选
  filter: function (arr, callback) {
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
      if (callback(arr, i)) {
        newArr.push(arr[i]);
      }
    }

    return newArr;
  },

  //按照指定的条件，得到某个数组中第一个满足条件的元素
  find: function (arr, callback) {
    if (arr.length === 0) {
      return null;
    }
    for (var i = 0; i < arr.length; i++) {
      if (callback(arr, i)) {
        return arr[i];
      }
    }

    return null;
  },

  //按照指定的条件，得到某个数组中满足条件的元素数量
  count: function (arr, callback) {
    var num = 0;
    for (var i = 0; i < arr.length; i++) {
      if (callback(arr, i)) {
        num += 1;
      }
    }

    return num;
  },

  getRandom: function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  },

  getAge: function (year, month, day) {
    var now = new Date();
    var dec = now.getFullYear() - year;
    if (month === 2 && day === 29 && !this.isLeap(now.getFullYear())) {
      day = 28;
    }
    var birthdayThisYear = new Date(now.getFullYear(), month - 1, day);
    if (birthdayThisYear > now) {
      dec--;
    }
    return dec;
  },

  getDateString: function (date) {
    var year = date.getFullYear().toString().padStart(4, "0");
    var month = (date.getMonth() + 1).toString().padStart(2, "0");
    var day = date.getDay().toString().padStart(2, "0");

    var hours = date.getHours().toString().padStart(2, "0");
    var minutes = date.getMinutes().toString().padStart(2, "0");
    var seconds = date.getSeconds().toString().padStart(2, "0");

    return `${year}年-${month}月-${day}日 ${hours}:${minutes}${seconds}`;
  },
};
