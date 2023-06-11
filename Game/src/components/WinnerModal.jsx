import { Square } from "./Square.jsx" //lo importamos porque lo necesitamos abajo

export function WinnerModal ({ winner, resetGame }) { //poner entre () lo que vamos a necesitar. Ver abajo
    if (winner === null) return null

    const winnerText = winner === false ? "Draw" : "The Winner is: "

{/* C.SECCIÓN  
17. hacer sección con renderizado condicional: Si el winner es diferente a null que es por defecto, vamos a hacer algo.
 Vamos a poner también un footer para que después podamos reiniciar la partida. 
En el 27 la hemos extraido aquí y modificado. 
Poner el renderizado lo más limpio posible  */}

    return (
        <section className="winner">
            <div className="text">
              <h2>{winnerText}</h2>

              <header className="win">
                {winner && <Square>{winner}</Square>}
              </header>

              <footer>
                {/* Poner un botón para resetear el juego. Ver arriba. */}
                <button onClick={resetGame}>Start Over</button>
              </footer>
            </div>
          </section>
        )          
}