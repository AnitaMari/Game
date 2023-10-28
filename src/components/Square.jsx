//4.Crear un cuadrado, que es la posición desde donde se va a jugar en cada movimiento.
//Vamos a crear el cuadrado del tablero y vamos a utilizar como propiedades el children, que será lo que tenga dentro
//del tablero (la x o la o), vamos a tener también una forma de actualizar el tablero y vamos a dejar el index para saber
//la posición del cuadradito.
//Square sería un componente separado de la App que podemos reutilizar.
export const Square = ({ children, isSelected, updateBoard, index }) => {
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