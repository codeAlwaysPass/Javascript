var tank = {
  direction: "U",
  left: 500,
  top: 400,
  dom: document.querySelector("img"),
  rate: 4,
  show: function () {
    this.dom.style.left = this.left + "px";
    this.dom.style.top = this.top + "px";
    this.dom.src = "imgs/tank" + this.direction + ".gif";
  },
};

//切换方向和移动
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowUp") {
    tank.direction = "U";
    tank.top -= tank.rate;
  } else if (e.key === "ArrowDown") {
    tank.direction = "D";
    tank.top += tank.rate;
  } else if (e.key === "ArrowLeft") {
    tank.direction = "L";
    tank.left -= tank.rate;
  } else if (e.key === "ArrowRight") {
    tank.direction = "R";
    tank.left += tank.rate;
  }

  tank.show();
});

//shift加速
document.addEventListener("keydown", function (e) {
  if (e.key === "Shift") {
    tank.rate *= 2;
  }
});

//松开shitf
document.addEventListener("keyup", function (e) {
  if (e.key === "Shift") {
    tank.rate /= 2;
  }
});
