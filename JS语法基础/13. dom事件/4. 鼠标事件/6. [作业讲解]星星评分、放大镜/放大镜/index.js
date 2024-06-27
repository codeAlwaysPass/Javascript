//配置
var config = {
  smallbg: "images/mouse.jpg",
  bigbg: "images/mouseBigSize.jpg",
  divBig: document.querySelector(".big"),
  divSmall: document.querySelector(".small"),
  divMove: document.querySelector(".small .move"),
  smallImgSize: {
    width: 350,
    height: 350,
  },
  divBigSize: {
    width: 540,
    height: 540,
  },
  bigImgSize: {
    width: 800,
    height: 800,
  },
};

//计算可移动div的宽高
//可移动div的尺寸/小图尺寸 = 大图尺寸/大div尺寸

//初始化
function init() {
  //计算可移动的div的宽高
  config.moveSize = {
    width:
      (config.divBigSize.width / config.bigImgSize.width) *
      config.smallImgSize.width,
    height:
      (config.divBigSize.height / config.bigImgSize.height) *
      config.smallImgSize.height,
  };

  initDivBg();

  initMove();

  initDivSmallEvent();

  //初始化div背景
  function initDivBg() {
    config.divSmall.style.background = `url("${config.smallbg}")no-repeat left top/100% 100%`;
    config.divBig.style.background = `url("${config.bigbg}")no-repeat`;
  }

  //初始化可移动的div
  function initMove() {
    config.divMove.style.width = config.moveSize.width + "px";
    config.divMove.style.height = config.moveSize.height + "px";
  }

  //初始化小图div的鼠标事件
  function initDivSmallEvent() {
    config.divSmall.onmouseenter = function () {
      config.divMove.style.display = "block";
      config.divBig.style.display = "block";
      setBigBgPosition();
    };

    config.divSmall.onmouseleave = function () {
      config.divMove.style.display = "none";
      config.divBig.style.display = "none";
    };

    config.divSmall.onmousemove = function (e) {
      var offset = getOffset(e);
      setPosition(offset);
      setBigBgPosition();
    };

    //设置大图背景图位置
    function setBigBgPosition() {
      var style = getComputedStyle(config.divMove);
      var left = parseFloat(style.left);
      var top = parseFloat(style.top);

      var bgleft = (left / config.smallImgSize.width) * config.bigImgSize.width;
      var bgtop = (top / config.smallImgSize.height) * config.bigImgSize.height;

      config.divBig.style.backgroundPosition = `-${bgleft}px -${bgtop}px`
    }

    //设置divMove的坐标
    function setPosition(offset) {
      var left = offset.x - config.moveSize.width / 2;
      var top = offset.y - config.moveSize.height / 2;
      if (left < 0) {
        left = 0;
      }
      if (top < 0) {
        top = 0;
      }
      if (left > config.smallImgSize.width - config.moveSize.width) {
        left = config.smallImgSize.width - config.divMove.width;
      }
      if (top > config.smallImgSize.height - config.moveSize.height) {
        top = config.smallImgSize.height - config.divMove.height;
      }
      config.divMove.style.left = left + "px";
      config.divMove.style.top = top + "px";
    }

    //根据鼠标事件参数, 得到鼠标在smalldiv中的坐标
    function getOffset(e) {
      if (e.target === config.divSmall) {
        //事件源是小图
        return {
          x: e.offsetX,
          y: e.offsetY,
        };
      } else {
        //事件源是divMove
        var style = getComputedStyle(config.divMove);
        var left = parseFloat(style.left);
        var top = parseFloat(style.top);
        return {
          x: e.offsetX + left + 1, //+1是因为边框存在
          y: e.offsetY + top + 1,
        };
      }
    }
  }
}

init();
