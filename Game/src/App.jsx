import { useState } from 'react'
//import './App.css' //creo que no hace falta
import confetti from "canvas-confetti"

import { Square } from "./components/Square.jsx"
import { TURNS } from "./constants.js"
import { checkWinnerFrom, checkEndGame } from "./logic/board.js" //32. Añadimos aquí el checkEndGame
import { WinnerModal } from "./components/WinnerModal.jsx"
// import { saveGameToStorage, resetGameStorage } from "./logic/storage/index.js"

//27. Ponemos el square que estaba aquí en un componente aparte. Ponemos export antes de const y lo importamos arriba

//28. Sacamos las constantes de arriba de (turn y winner combos) y las ponemos en un archivo aparte que se llama constants.js y lo exportamos arriba
//y les ponemos export delante de const e importamos el archivo arriba

//29. Creamos la carpeta logic y ponemos el checkwinner y hacemos lo mismo que con los otros.
//creamos dentro los archivos board.js y ponemos dentro el checkwinner
//tenemos que importar en ese archivo el winner_combos. Y cambiamos el nombre de checkWinner por checkWinnerFrom
//le añadimos el export const... y lo importamos arriba
//y quitamos de arriba que estaba import { TURNS, WINNER_COMBOS } from... le quitamos el winner-combos
//en updateBoard abajo cambiamos el nombre de checkWinner por checkWinnerFrom: const newWinner = checkWinner(newBoard) 

//30. Creamos otro componente llamado Winner y sacamos todo eso de aquí.

//31. TODO ESTO LO DEBERÍAMOS HABER PUESTO APARTE DESDE EL PRINCIPIO. ESTÁ HECHO ASÍ PARA VER CÓMO COMPONETIZAR LO QUE SE PUEDA
//Poner la lógica que sea de JS puro aparte para poder usarlo con Vue, Angular, etc
//Podríamos sacar el board de abajo aparte también. Hacerlo nosotros

//32. Sacar fuera y hacer lo mismo con const checkEndGame y moverlo a board.

function App() {
//35a.
//console.log("render")

//5. Movemos board dentro de la App y vamos a convertirlo en un estado.
//Un estado es un valor que cada vez que cambie va a renderizar nuestro componente, así que cada vez que nuestro tablero cambie
//queremos que se vuelva a renderizar.
//Crear el hook useState y pasarle valor inicial que es el que hemos puesto antes.
//Ahora en lugar de una variable tenemos un array de dos posiciones, la posición y una forma de actualizarla.
//en lugar de null podríamos poner useState(["x", "x", "o", "x", "o", "o", "x, "o", "x"]) y en el return abajo en lugar de {index} poner {board[index]}
//y se verían las x y las o cada uno en su cuadradito.
const [board, setBoard] = useState(() => {
  const boardFromStorage = window.localStorage.getItem("board")
  return boardFromStorage ? JSON.parse(boardFromStorage) :
  (Array(9).fill(null))
})
//console.log(board)

//34. //todos los hooks (useState en este caso) no pueden estar dentro de un if, while, loop... tiene que estar en el cuerpo
//cambiamos el estado de arriba y va a inicializar dependiendo de si hay una partida guardada en local storage
// const [board, setBoard] = useState(() => {

  //35b.
  //console.log("inicializar estado del board")
  
  // const boardFromStorage = window.localStorage.getItem("board") //si lo pusiéramos fuera más arriba se ejecutaría en cada render de forma innecesaria y leer del local storage es lento
  //como el estado solo se inicializa una vez, si lo ponemos aquí solo se ejecutará una vez. Haremos lo mismo con los turnos.
  // return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)

//otra opción: 
//if (boardFromStorage) return JSON.parse(boardFromStorage)
//return Array(9).fill(null)
// })

//6.Necesitamos otro estado para ver de quién es el turno. Vamos a hacer que empiece el turno la x.
//Esto devuelve un array de dos posiciones: la primera es el valor del estado, y la segunda cómo actualizarlo.
//También necesitamos visualmente saber de quién es el turno. Vamos a crear otra sección llamada turn. Ver abajo que en el Square de los
//dos turnos (x, o) hemos creado una prop para saber si está seleccionado o no. Ver abajo.
//const [turn, setTurn] = useState(TURNS.X)

//36.Cambiamos lo de arriba también dependiendo de si hay algo guardado en el local storage
const [turn, setTurn] = useState(() => {
  const turnFromStorage = window.localStorage.getItem("turn")
  return turnFromStorage ?? TURNS.X // || esto mira si es falsy, y ?? si es null o undefined
})

//13. Crear un estado para ver quién ha ganado:
const [winner, setWinner] = useState(null) //vamos a utilizar null si no hay ganador y false si hay un empate
//podríamos hacer también como con los turn arriba para decir quién es el winner.

//18. Resetear juego volviendo el/los estados a sus valores iniciales (array 9 fill null, turn X)
//pasarle las mismas props y los mismos estados para que nuestra interfaz se replique
//no es una buena práctica hacer esto refrescando la página y cargándolo todo de nuevo si solo quieres resetear el estado de este componente
const resetGame = () => {
setBoard(Array(9).fill(null))
setTurn(TURNS.X)
setWinner(null)

// //aquí estaba el 37 pero lo sacamos fuera
// resetGameStorage()
// }
// const resetGameStorage = () => {
  //37.Asegurarnos que cuando reseteemos el juego reseteemos también lo que tenemos en el local storage:
      window.localStorage.removeItem("board")
      window.localStorage.removeItem("turn")
  }
//38. Mover lo del local storage fuera. Si estuviéramos usando el servir el local storage no funcionaría
//pero solo estamos usando el cliente

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

//33. Guardar aquí partida de forma local porque es cuando empieza el nuevo turno.
//vamos a guardar el estado del tablero en el local storage. Solo se puede guardar un string, por eso llamamos al método JSON.stringify para que nos convierta
//la array a string y después lo podamos volver a transformar:
window.localStorage.setItem("board", JSON.stringify(newBoard))
window.localStorage.setItem("turn", newTurn) //con turn como lo tenía él no funciona
// }

// saveGameToStorage({
//   board: newBoard,
//   turn: newTurn
// })

  //16. Revisamos si hay un ganador.
  const newWinner = checkWinnerFrom(newBoard) //le pasamos el nuevo tablero que tiene el último movimiento
    //le pasamos el valor actualizado porque el estado es asíncrono
    if (newWinner) {
      //alert(`El ganador es ${newWinner}`) //ponga la alerta antes o después del setWinner se muestra antes de mostrar la última x u o
      //porque los estados en React son asíncronos y no afectan al renderizado, eso significa que se ejecuta lo siguiente aunque no se haya actualizado aún el estado 
      //aquí o podemos fiarnos de tener el nuevo estado de winner.
      confetti() //26.Añadimos este efecto
      setWinner(newWinner)      
     //falta por hacer comprobar si se ha acabado el juego: 20. Ver si hay empate:
    } else if (checkEndGame(newBoard)) {
      setWinner(false) //empate.
    }
 }

//2.Crear el tablero que será un array que tendrá 9 posiciones que al principio será null. Originalmente estaba dentro de la app. Ver 4
//const board = Array(9).fill(null)
 
  return (  
    <main className="board"> 
      <h1>Tic-Tac-Toe</h1> 

      {/* 19. Poner también un botón fuera */}
      <button onClick={resetGame}>Reset del juego</button>

      {/* A.SECCIÓN PARA EL JUEGO */}
      <section className="game"> 
        {
          // 3. Podríamos llamarlo cell o como querarmos pero lo que queremos renderizar por ahora
          // es la posición 0, 1... por eso lo vamos a llamar index. Se muestra el grid con los números del 0 al 8
          //23a.al principio puso _, index porque no estábamos usando _ y lo puso así. Después lo cambió por square
          board.map((square, index) => {
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
                {/* {board[index]} 23b.cambiamos esto por lo de abajo. Funciona igual*/}
                {square}
              </Square>
              //24. Vamos a añadir una dependencia que se llama canva confetti para darle efectos
              //npm install canvas-confetti -E e importarlo arriba
            )
          })
        }
      </section>

      {/* B.SECCIÓN PARA LOS TURNOS */}
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
      
      <WinnerModal resetGame={resetGame} winner={winner} />
    
    {/* C.SECCIÓN. 27. Al final la sacamos y modificamos un poco. Ver WinnerModal. Y la ponemos justo arriba y le pasamos el resetGame y el winner */}
      {/* 17. hacer sección con renderizado condicional: Si el winner es diferente a null que es por defecto, vamos a hacer algo.
      Vamos a poner también un footer para que después podamos reiniciar la partida  */}
     
     {/* {
        winner !== null && (
          <section className="winner">
            <div className="text">
              <h2>
                {
                  winner === false 
                  ? "Empate"
                  : "Ganó: "
                }
              </h2>

              <header className="win">
                {winner && <Square>{winner}</Square>}
              </header>

              <footer> */}
                {/* Poner un botón para resetear el juego. Ver arriba. */}
                {/* <button onClick={resetGame}>Empezar de nuevo</button>
              </footer>
            </div>
          </section>
        )
      } */}
    
    </main>      
  )
}

export default App
