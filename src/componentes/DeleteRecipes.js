/*Importamos la base de datos */
import { db } from "../firebase";
/*importamos las funciones necesarias para manejar los datos */
import { doc, deleteDoc } from "firebase/firestore";

/*Creamos la función para eliminar una receta */

const deleteRecipe = async (id) => {
  try {
    /*Pausamos el flujo en espera de la promesa que busca la receta por Id */
    await deleteDoc(doc(db, "recipes", id));
    /*mensaje si si se pudo eliminar */
    alert("Receta eliminada con éxito!");

    /*capturamos el error si en caso hubo algún problema */
  } catch (error) {
    console.error("Error al eliminar la receta:", error);
  }
};

{
  /*Mapeamos las recetas para mostrarlas en una lista con un id unico */
  recipes.map((recipe) => (
    <li key={recipe.id}>
      <h3>{recipe.title}</h3>
      <p>{recipe.description}</p>
      {recipe.imageUrl && (
        <img src={recipe.imageUrl} alt={recipe.title} width="100" />
        /*Boton para eliminar la receta */
      )}

      <button onClick={() => deleteRecipe(recipe.id)}>Eliminar</button>
    </li>
  ));
}
