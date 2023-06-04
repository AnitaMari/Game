//1.Crear constante para los turnos (un objeto):
export const TURNS = {
  X: "x", //se podrían poner emojis bonitos si quisiéramos. :x o :circle (ver qué hay que instalar)
  O: "o"
}

//14.Podríamos crear arrays con las combinaciones ganadoras:
export const WINNER_COMBOS = [
    [0, 1, 2], //si las x o las o están en esta posición
    [3, 4, 5], //las 3 primeras son las combinaciones ganadoras horizontales, las otras 3 las verticales, y las últimas 2 las diagonales
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],  
  ]