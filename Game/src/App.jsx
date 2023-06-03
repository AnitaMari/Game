import { useState } from 'react'
import './App.css'

//1.Crear constante para los turnos (un objeto):
const TURNS = {
  X: "X",
  O: "O"
}


//4.Crear un cuadrado, que es la posición desde donde se va a jugar en cada movimiento.
//Vamos a crear el cuadrado del tablero y vamos a utilizar como propiedades el children, que será lo que tenga dentro
//del tablero (la x o la o), vamos a tener también una forma de actualizar el tablero y vamos a dejar el index para saber
//la posición del cuadradito.
//Square sería un componente separado de la App que podemos reutilizar.
const Square = ({ children, isSelected, updateBoard, index }) => {
  // return (
  //   //vamos a renderizar lo que teníamos antes en el return de abajo.
  // <div className="square">
  //   {children}
  // </div>
  //   )

  //8. Le pasamos la prop isSelected para saber de quién es el turno. Ver 7
//vamos a decirle

  const className = `square ${isSelected ? "is-selected" : ""}`  
  
  // return (
  //   //ahora vamos a hacer mejor un renderizado condicional de quién es el turno.
  // <div className={className}>
  //   {children}
  // </div>
  //   )

  //10. Cambiar el return anterior y poner que onClick update Board
  //el onClick llama al handleClick que llama la updateBoard. Luego veremos qué le pasamos ahí
  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

//14.Podríamos crear arrays con las combinaciones ganadoras:
const WINNER_COMBOS = [
  [0, 1, 2], //si las x o las o están en esta posición
  [3, 4, 5], //las 3 primeras son las combinaciones ganadoras horizontales, las otras 3 las verticales, y las últimas 2 las diagonales
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],  
]

function App() {
//5. Movemos board dentro de la App y vamos a convertirlo en un estado.
//Un estado es un valor que cada vez que cambie va a renderizar nuestro componente, así que cada vez que nuestro tablero cambie
//queremos que se vuelva a renderizar.
//Crear el hook useState y pasarle valor inicial que es el que hemos puesto antes.
//Ahora en lugar de una variable tenemos un array de dos posiciones, la posición y una forma de actualizarla.
//en lugar de null podríamos poner useState(["x", "x", "o", "x", "o", "o", "x, "o", "x"]) y en el return abajo en lugar de {index} poner {board[index]}
//y se verían las x y las o cada uno en su cuadradito.
const [board, setBoard] = useState(Array(9).fill(null))
//console.log(board)

//6.Necesitamos otro estado para ver de quién es el turno. Vamos a hacer que empiece el turno la x.
//Esto devuelve un array de dos posiciones: la primera es el valor del estado, y la segunda cómo actualizarlo.
//También necesitamos visualmente saber de quién es el turno. Vamos a crear otra sección llamada turn. Ver abajo que en el Square de los
//dos turnos (x, o) hemos creado una prop para saber si está seleccionado o no. Ver abajo.
const [turn, setTurn] = useState(TURNS.X)

//13. Crear un estado para ver quién ha ganado:
const [winner, setWinner] = useState(null) //vamos a utilizar null si no hay ganador y false si hay un empate
//podríamos hacer también como con los turn arriba para decir quién es el winner.

//15.Creamos un método para comprobar el tablero y ver quién es el ganador.
//decirle que para cada combinación ganadora que tenemos en los winnercombos
//mirar primero si hay una x o un o, después si tiene lo mismo que el anterior, y lo mismo con el tercero
const checkWinner = (boardToCheck) => {
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


const updateBoard = (index) => {
 //12. Pasarle como parámetro el índice para saber en qué cuadradito estamos así podemos actualizar el board con esa información. 
 //Vamos a tener un nuevo board, que como recibe el índice vamos a ponerle el valor del turno actual (x u o). Y después lo actualizamos
 //vamos a decirle que no actualice esta posición si ya tiene algo.
  
  if (board[index] || winner) return //con esto no hace nada //17. Le añadimos o si hay un ganador, porque no tendría sentido seguir jugando.
//cuando tenemos una x u o en esta posición o hay un ganador no se actualiza esta posición

 //con esto de abajo actualizamos el tablero
  const newBoard = [...board]
  newBoard[index] = turn
  setBoard(newBoard)//como esta actualización del estado es asíncrona, no podemos fiarnos de que en la actualización
  //del checkwinner va a tener el valor actualizado

 //con esto cambiamos el turno
  const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
  setTurn(newTurn) //11.para actualizar el estado. Cada vez que haga click en un cuadrado cambio el turno

  //16. Revisamos si hay un ganador.
  const newWinner = checkWinner(newBoard) //le pasamos el nuevo tablero que tiene el último movimiento
    //le pasamos el valor actualizado porque el estado es asíncrono
    if (newWinner) {
      //alert(`El ganador es ${newWinner}`) //ponga la alerta antes o después del setWinner se muestra antes de mostrar la última x u o
      //porque los estados en React son asíncronos y no afectan al renderizado, eso significa que se ejecuta lo siguiente aunque no se haya actualizado aún el estado 
      //aquí o podemos fiarnos de tener el nuevo estado de winner.
      setWinner(newWinner)
    } //falta por hacer comprobar si se ha acabado el juego
}
//2.Crear el tablero que será un array que tendrá 9 posiciones que al principio será null. Originalmente estaba dentro de la app. Ver 4
//const board = Array(9).fill(null)
 
  return (  
    <main className="board"> 
      <h1>Tic-Tac-Toe</h1> 
      <section className="game">
        {
          // 3. Podríamos llamarlo cell o como querarmos pero lo que queremos renderizar por ahora
          // es la posición 0, 1... por eso lo vamos a llamar index. Se muestra el grid con los números del 0 al 8
          board.map((_, index) => {
            return (
              // esto se pasa arriba y ponemos en su lugar el nombre del componente
              // <div className="cell" key={index}>
              //   <span className="cell_content">
              //     {index}
              //   </span>
              // </div>
              //renderizamos el componente, y para renderizar una lista de elementos necesitamos
              //utilizar la key que es un identificador único de ese elemento. Lo renderizamos con el
              //map que devuelve un array. Es mejor usar una id si la tienes porque el index no es un identificador único
              //aunque en este caso sí porque nunca vamos a cambiar el índice de esas posiciones.
              //El propio índice se lo vamos a pasar como prop porque hemos visto en Square que lo necesitamos, y podríamos 
              //pasarle más cosas, pero por ahora está bien así.
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
                // 9.Pasarle el updateBoard que es una función que le dice lo que tiene que hacer, los pasos a seguir: cambiar el estado, actualizar turnos, ver si es el ganador...ver arriba.
                //no se pasa la ejecución sino la función porque no quieres que se ejecute 9 veces sino cuando el usuario haga click, estarías actualizando el board cada vez que lo renderizas.
                //queremos que la ejecución sea cuando haga click, por eso se la pasamos como parámetro
              >
                {/* 4. hemos dicho que teníamos el índice para ver cómo quedaba y las posiciones de cada cuadrado, pero lo vamos a quitar y dejar vacío. 
                {index} Tenemos que crear un estado para guardar cada vez que el usuario haga click en cada posición.
                Vamos a necesitar meter el board dentro de la aplicación, originalmente lo pusimos fuera porque cuando en el square se haga un click
                vamos a tener que actualizar el tablero para volver a renderizarlo y el usuario pueda ver si se ha puesto una x o un o*/}
                {board[index]}
              </Square>
            )
          })
        }
      </section>

      <section className="turn">
      {/* 7. Para saber de quién es el turno visualmente vamos a crear una prop llamada isSelected (tenemos que ir arriba y pasárselo a Square). Como tenemos un estado llamado turn, le vamos a decir que
      cuando el estado sea turns.x el estado seleccionado es el de la x y lo mismo con la o. Así el componente square cambia visualmente    */}
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>

      </section>

    </main>      
  )
}

export default App
