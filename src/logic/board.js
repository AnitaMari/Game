import {WINNER_COMBOS } from "../constants.js"

//29. Le cambiamos el nombre que tenía de checkWinner por checkWinnerFrom

//15.Creamos un método para comprobar el tablero y ver quién es el ganador.
//decirle que para cada combinación ganadora que tenemos en los winnercombos
//mirar primero si hay una x o un o, después si tiene lo mismo que el anterior, y lo mismo con el tercero
export const checkWinnerFrom = (boardToCheck) => {
    //revisamos todas las combinaciones ganadoras para ver si x u o ganó
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo 
      if (
        boardToCheck[a] && // 0 -> x u o
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a] //x u o (el ganador sería el que esté en el primer elemento a)
      }
    }
    //si no hay ganador:
    return null
  }

  //22.
export const checkEndGame = (newBoard) => {
    //si comprobamos que todos los movimientos se han hecho porque ya no son null, si no hay más espacios vacíos
    return newBoard.every((square) => square !== null) //si en todos los square hay algo diferente a null porque ya se ha escrito x u o. Devolverá true
  }