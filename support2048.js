function getPosTop(i, j){
  return 20 + i*120;
}
function getPosLeft(i, j){
  return 20 + j*120;
}
function getNumberBackgroundColor(number){
  switch (number) {
    case 2: return "#eee4da"; break;
    case 4: return "#ede0c8"; break;
    case 8: return "#f2b179"; break;
    case 16: return "#f59563"; break;
    case 32: return "#f67c5f"; break;
    case 64: return "#f65e3b"; break;
    case 128: return "#edcf72"; break;
    case 256: return "#edcc61"; break;
    case 512: return "#9c0"; break;
    case 1024: return "#33b5e5"; break;
    case 2048: return "#09c"; break;
    case 4096: return "#a6c"; break;
    case 8192: return "#93c"; break;
  }
  return "black";
}
function getNumberColor(number){
  if(number <= 4) return "#776e65";
  return "white";
}
function nospace(board){
  for(var i = 0; i < 4; i++){
    for(var j = 0; j < 4; j++){
      if(board[i][j] == 0) return false;
    }
  }
  return true;
}
function canMoveLeft(board){
  for(var i = 0; i < 4; i++){
    for(var j = 0; j < 4; j++){
      if(board[i][j] != 0){
        if(board[i][j-1] == 0 || board[i][j-1] == board[i][j]){
          //对于判断是否能左移，只需判断左边一格位置即可
          return true;
        }
      }
    }
  }
  return false;
}
function canMoveRight(board){
  for(var i = 0; i < 4; i++){
    for(var j = 0; j < 4; j++){
      if(board[i][j] != 0){
        if(board[i][j+1] == 0 || board[i][j+1] == board[i][j]){
          //对于判断是否能右移，只需判断左边一格位置即可
          return true;
        }
      }
    }
  }
  return false;
}
function canMoveUp(board){
  for(var j = 0; j < 4; j++){
    for(var i = 0; i < 4; i++){
      if(board[i][j] != 0){
        if(i > 0){ //这个判断是必须的，由于二维数组第一项必须保证对，而之前的第二项不需要check
          if(board[i-1][j] == 0 || board[i-1][j] == board[i][j]){
            return true;
          }
        }
      }
    }
  }
  return false;
}
function canMoveDown(board){
  for(var j = 0; j < 4; j++){
    for(var i = 0; i < 4; i++){
      if(board[i][j] != 0){
        if(i < 3){ //这个判断是必须的，由于二维数组第一项必须保证对，而之前的第二项不需要check
          if(board[i+1][j] == 0 || board[i+1][j] == board[i][j]){
            return true;
          }
        }
      }
    }
  }
  return false;
}
function noBlockHorizontal(row, col1, col2, board){
  //从board[row][col1]开始到col2之间判断有无元素，不含头尾
  for(var i = col1 + 1; i < col2; i++) if(board[row][i] != 0) return false;
  return true;
}
function noBlockVertical(row1, row2, col, board){
  //从board[row][col1]开始到col2之间判断有无元素，不含头尾
  for(var i = row1 + 1; i < row2; i++) if(board[i][col] != 0) return false;
  return true;
}
function nomove(board){
  if(canMoveLeft(board) || canMoveRight (board) ||
  canMoveUp(board) || canMoveDown(board)) return false;
  return true;
}