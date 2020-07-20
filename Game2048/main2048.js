var board = new Array();
var score = 0;
var hasConflicted = new Array();//该数组用于实现一次移动在每个格子只会发生一次合并

$(document).ready(function(){ //程序加载完毕后执行的主函数
  newgame();//初始化和点击按钮有相同功能
});
function newgame(){
  //初始化棋盘格
  init();
  //随机生成两个数字
  generateOneNumber();
  generateOneNumber();
}
function init(){
  for(var i = 0; i < 4; i++){
    for(var j = 0; j < 4; j++){
      var gridCell = $("#grid-cell-"+i+"-"+j);
      gridCell.css('top', getPosTop(i, j));
      gridCell.css('left', getPosLeft(i, j));
    }
  }

  for(var i = 0; i < 4; i++){
    board[i] = new Array();
    hasConflicted[i] = new Array();
    for(var j = 0; j < 4; j++){
      board[i][j] = 0;
      hasConflicted[i][j] = false;
    }
  }
  updateBoradView();

  score = 0;
}
function updateBoradView(){
  $(".number-cell").remove();
  for(var i = 0; i < 4; i++){
    for(var j = 0; j < 4; j++){
      $("#grid-container")
      .append('<div class="number-cell" id="number-cell-'+i+'-'
      +j+'"></div>');
      var theNumberCell = $('#number-cell-'+i+'-'+j);

      if(board[i][j] == 0){
        theNumberCell.css('width', '0px');
        theNumberCell.css('height', '0px');
        theNumberCell.css('top', getPosTop(i,j) + 50); //中心
        theNumberCell.css('left', getPosLeft(i,j) + 50);
      }
      else{
        theNumberCell.css('width', '100px');
        theNumberCell.css('height', '100px');
        theNumberCell.css('top', getPosTop(i,j));
        theNumberCell.css('left', getPosLeft(i,j));
        theNumberCell.css('background-color',
        getNumberBackgroundColor(board[i][j]));//背景色设置
        theNumberCell.css('color', getNumberColor(board[i][j]));//前景色设置
        theNumberCell.text(board[i][j]);
      }

      hasConflicted[i][j] = false;
    }
  }
}
function generateOneNumber(){
  if(nospace(board)) return false;

  //随机一个位置
  var randx = parseInt(Math.floor(Math.random()*4));
  var randy = parseInt(Math.floor(Math.random()*4));

  var times = 0;
  while(times < 50){ //让系统生成随机数次数不要太多，因为后期空格少，试错次数会变多
    if(board[randx][randy] == 0) break;
    randx = parseInt(Math.floor(Math.random()*4));
    randy = parseInt(Math.floor(Math.random()*4));
    times++;
  }
  if(times == 50){ //随机数老猜不中，那么人工生成位点，选取遍历过程中第一个符合条件的位点
    for(var i = 0; i < 4; i++){
      for(var j = 0; j < 4; j++){
        if(board[i][j] == 0){
          randx = i;
          randy = j;
        }
      }
    }
  }

  //随机一个数字 2或4 各0.5概率
  var randNumber = Math.random() < 0.5 ? 2 : 4;

  //在随机位置显示随机数字 并显示动画
  board[randx][randy] = randNumber;
  showNumberWithAnimation(randx, randy, randNumber);

  return true;
}
$(document).keydown(function(event){
  switch (event.keyCode) {
    case 37://left
        if(moveLeft()){
          setTimeout("generateOneNumber()", 210);
          setTimeout("isgameover()", 300);
        }
        break;
    case 65://A
        if(moveLeft()){
          setTimeout("generateOneNumber()", 210);
          setTimeout("isgameover()", 300);
        }
        break;
    case 38://up
        if(moveUp()){
          setTimeout("generateOneNumber()", 210);
          setTimeout("isgameover()", 300);
        }
        break;
    case 87://W
        if(moveUp()){
          setTimeout("generateOneNumber()", 210);
          setTimeout("isgameover()", 300);
        }
        break;
    case 39://right
        if(moveRight()){
          setTimeout("generateOneNumber()", 210);
          setTimeout("isgameover()", 300);
        }
        break;
    case 68://D
        if(moveRight()){
          setTimeout("generateOneNumber()", 210);
          setTimeout("isgameover()", 300);
        }
        break;
    case 40://down
        if(moveDown()){
          setTimeout("generateOneNumber()", 210);
          setTimeout("isgameover()", 300);
        }
        break;
    case 83://S
        if(moveDown()){
          setTimeout("generateOneNumber()", 210);
          setTimeout("isgameover()", 300);
        }
        break;
    default:
        break;
  };
});
function isgameover(){
  if(nospace(board) && nomove(board)) gameover();
}
function gameover(){
  alert("我是你爸爸");
}
function moveLeft(){
  if(!canMoveLeft(board)) return false;
  //moveleft coed here
  for(var i = 0; i < 4; i++){
    for(var j = 0; j < 4; j++){
      if(board[i][j] != 0){
        for(var k = 0; k < j; k++){
          if(board[i][k] == 0 && noBlockHorizontal(i, k, j, board)){
            //move
            showMoveAnimation(i, j, i, k); //从ij移动到ik
            board[i][k] = board[i][j];
            board[i][j] = 0;
            continue;
          }else if(board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board)
          && !hasConflicted[i][k]){
            //move
            showMoveAnimation(i, j, i, k); //从ij移动到ik
            //add
            board[i][k] += board[i][j];
            board[i][j] = 0;
            score += board[i][k];
            updateScore(score);
            hasConflicted[i][k] = true;
            continue;
          }
        }
      }
    }
  }
  //updateBoradView();
  setTimeout("updateBoradView()", 200);//数字移动操作在数组层面完成后需要在前端显示处刷新
  //但是由于动画在前面，如果强行刷新，则会中断动画，因此需要等待200ms直到动画结束
  //同时将hasConflicted重置
  return true;
}
function moveRight(){
  if(!canMoveRight(board)) return false;
  //moveleft coed here
  for(var i = 3; i > -1; i--){//逆坐标正方向的移动应从高往低以保证迭代正确
    for(var j = 3; j > -1; j--){
      if(board[i][j] != 0){
        for(var k = 3; k > j; k--){
          if(board[i][k] == 0 && noBlockHorizontal(i, j, k, board)){
            //move
            showMoveAnimation(i, j, i, k); //从ij移动到ik
            board[i][k] = board[i][j];
            board[i][j] = 0;
            continue;
          }else if(board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board)
          && !hasConflicted[i][k]){
            //move
            showMoveAnimation(i, j, i, k); //从ij移动到ik
            //add
            board[i][k] += board[i][j];
            board[i][j] = 0;
            score += board[i][k];
            updateScore(score);
            hasConflicted[i][k] = true;
            continue;
          }
        }
      }
    }
  }
  //updateBoradView();
  setTimeout("updateBoradView()", 200);//数字移动操作在数组层面完成后需要在前端显示处刷新
  //但是由于动画在前面，如果强行刷新，则会中断动画，因此需要等待200ms直到动画结束
  return true;
}
function moveUp(){
  if(!canMoveUp(board)) return false;
  for(var j = 0; j < 4; j++){
    for(var i = 0; i < 4; i++){
      if(board[i][j] != 0){
        for(var k = 0; k < i; k++){
          if(board[k][j] == 0 && noBlockVertical(k, i, j, board)){
            //move
            showMoveAnimation(i, j, k, j); //从ij移动到ik
            board[k][j] = board[i][j];
            board[i][j] = 0;
            continue;
          }else if(board[k][j] == board[i][j] && noBlockVertical(k, i, j, board)
          && !hasConflicted[k][j]){
            //move
            showMoveAnimation(i, j, k, j); //从ij移动到ik
            //add
            board[k][j] += board[i][j];
            board[i][j] = 0;
            score += board[k][j];
            updateScore(score);
            hasConflicted[k][j] = true;
            continue;
          }
        }
      }
    }
  }
  //updateBoradView();
  setTimeout("updateBoradView()", 200);//数字移动操作在数组层面完成后需要在前端显示处刷新
  //但是由于动画在前面，如果强行刷新，则会中断动画，因此需要等待200ms直到动画结束
  return true;
}
function moveDown(){
  if(!canMoveDown(board)) return false;
  for(var j = 3; j > -1; j--){
    for(var i = 3; i > -1; i--){
      if(board[i][j] != 0){
        for(var k = 3; k > i; k--){//要注意up/down在html上坐标的位置和实际不同
          //因此要从k比i大的地方开始循环，即从屏幕下往上循环
          if(board[k][j] == 0 && noBlockVertical(i, k, j, board)){
            //move
            showMoveAnimation(i, j, k, j); //从ij移动到ik
            board[k][j] = board[i][j];
            board[i][j] = 0;
            continue;
          }else if(board[k][j] == board[i][j] && noBlockVertical(i, k, j, board)
          && !hasConflicted[k][j]){
            //move
            showMoveAnimation(i, j, k, j); //从ij移动到ik
            //add
            board[k][j] += board[i][j];
            board[i][j] = 0;
            score += board[k][j];
            updateScore(score);
            hasConflicted[k][j] = true;
            continue;
          }
        }
      }
    }
  }
  //updateBoradView();
  setTimeout("updateBoradView()", 200);//数字移动操作在数组层面完成后需要在前端显示处刷新
  //但是由于动画在前面，如果强行刷新，则会中断动画，因此需要等待200ms直到动画结束
  return true;
}
