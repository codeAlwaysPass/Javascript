//进行整个区域的全局配置
var gameConfig = {
  width: 500,
  height: 500,
  rows: 3, //分成几行几列
  cols: 3,
  isOver: false,
  imgurl: "img/lol.png", //图片路径, 选择运行资源的相对路径, 所以是index.html的路径
  dom: document.getElementById("game"), //游戏dom对象
};

//每一小块的宽高
gameConfig.pieceWidth = gameConfig.width / gameConfig.cols;
gameConfig.pieceHeight = gameConfig.height / gameConfig.rows;

//div的数量
gameConfig.pieceNumber = gameConfig.rows * gameConfig.cols;

//包含小方块信息的数组
var blocks = [];

//小方块的构造函数
function Block(left, top, isVisible) {
  this.left = left;
  this.top = top;
  this.correctLeft = this.left;
  this.correctTop = this.top;

  this.dom = document.createElement("div");
  this.dom.style.width = gameConfig.pieceWidth + "px";
  this.dom.style.height = gameConfig.pieceHeight + "px";
  this.dom.style.background = `url("${gameConfig.imgurl}")  -${this.correctLeft}px -${this.correctTop}px`;
  this.dom.style.position = "absolute";
  this.dom.style.border = "1px solid #fff";
  this.dom.style.boxSizing = "border-box";
  this.dom.style.cursor = "pointer";
  this.dom.style.transition = ".5s";

  if (!isVisible) {
    this.dom.style.display = "none";
  }

  this.show = function () {
    this.dom.style.left = this.left + "px";
    this.dom.style.top = this.top + "px";
  };

  //判断当前方块是否在正确的位置上
  this.isCorrect = function () {
    return (
      isEqual(this.left, this.correctLeft) && isEqual(this.top, this.correctTop)
    );
  };

  this.show();

  gameConfig.dom.appendChild(this.dom);
}

//初始化游戏
function init() {
  //1. 初始化游戏的容器
  initGameDom();

  //2. 初始化小方块
  //2.1 准备好一个数组, 数组的每一项是一个对象, 记录了每一个小方块的信息
  initBlocksArray();

  //2.2 数组洗牌
  shuffle();

  //3. 注册点击事件
  regEvent();

  //初始化函数
  function initGameDom() {
    gameConfig.dom.style.width = gameConfig.width + "px";
    gameConfig.dom.style.height = gameConfig.height + "px";
    gameConfig.dom.style.border = "2px solid #ccc";
    gameConfig.dom.style.position = "relative";
  }

  //初始化小方块数组
  function initBlocksArray() {
    for (var i = 0; i < gameConfig.rows; i++) {
      for (var j = 0; j < gameConfig.cols; j++) {
        var isVisible = true;
        if (i === gameConfig.rows - 1 && j === gameConfig.cols - 1) {
          isVisible = false;
        }
        blocks.push(
          new Block(
            j * gameConfig.pieceWidth,
            i * gameConfig.pieceHeight,
            isVisible
          )
        );
      }
    }
  }

  //打乱方块
  function shuffle() {
    /*
    [
        {left:0,top:0}
        ...
    ]
    */
    for (var i = 0; i < blocks.length - 1; i++) {
      //随机产生一个下标, 将数组的当前项和随机项进行交换
      var index = getRandom(0, blocks.length - 2);
      swap(blocks[i], blocks[index]);
    }
  }

  function getRandom(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
  }

  function swap(b1, b2) {
    //1. 交换left
    var temp = b1.left;
    b1.left = b2.left;
    b2.left = temp;

    //2. 交换top
    temp = b1.top;
    b1.top = b2.top;
    b2.top = temp;

    //3. 重新显示
    b1.show();
    b2.show();
  }

  //注册点击事件
  function regEvent() {
    blocks.forEach(function (b) {
      b.dom.onclick = function () {
        if (gameConfig.isOver) {
          return;
        }
        //交换当前方块和看不见的方块的坐标位置
        var inVisibleBlock = blocks.find(function (b) {
          return b.dom.style.display === "none";
        });
        //判断是否可以交换
        if (
          (b.top === inVisibleBlock.top &&
            isEqual(
              Math.abs(b.left - inVisibleBlock.left),
              gameConfig.pieceWidth
            )) ||
          (b.left === inVisibleBlock.left &&
            isEqual(
              Math.abs(b.top - inVisibleBlock.top),
              gameConfig.pieceHeight
            ))
        ) {
          swap(b, inVisibleBlock);
        }
        //游戏结束判定
        isWin();
      };
    });
  }

  //游戏结束判定
  function isWin() {
    var wrongs = blocks.filter(function (item) {
      return !item.isCorrect();
    });
    if (wrongs.length === 0) {
      //游戏结束, 去掉所有边框
      gameConfig.isOver = true;
      blocks.forEach(function (b) {
        b.dom.style.border = "none";
        b.dom.style.display = "block";
      });
    }
  }
}

function isEqual(n1, n2) {
  return parseInt(n1) === parseInt(n2);
}

init();
