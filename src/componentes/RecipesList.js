import { useState, useEffect } from "react";
import { db } from "../firebase";
import "../Styles/RecipeList.css";
import {
  collection,
  query,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";
import EditRecipe from "./EditRecipe";

/*creamos la función de lista de las recetas */

const RecipeList = () => {
  /*estado para almacenar las listas de las recetas */
  const [recipes, setRecipes] = useState([]);
  /*manejamos el estado de la receta que se esta editando */
  const [editingRecipe, setEditingRecipe] = useState(null);

  useEffect(() => {
    /*hacemos una consulta a la colección de recetas  */
    const q = query(collection(db, "recipes"));
    /*suscribimos el componente a los cambios en la base de datos */
    const unsubscribe = onSnapshot(q, (snapshot) => {
      /*mapeamos los documentos de la base de datos y guardamos los datos  */
      const recipesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      /*actualizamos el estado */
      setRecipes(recipesData);
    });
    /*limpiamos cuando el componente se desmonta  */
    return () => unsubscribe();
  }, []);

  /*creamos la función para borrar una receta */
  const deleteRecipe = async (id) => {
    try {
      /*eliminamos la receta por id */
      await deleteDoc(doc(db, "recipes", id));
      alert("Receta eliminada con éxito!");
    } catch (error) {
      /*manejamos el error si algo saliera mal*/
      console.error("Error al eliminar la receta:", error);
    }
  };
  /*retornamos la lista de recetas que hay */
  return (
    <div>
      <h2>Recetas</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
            {recipe.imageUrl && (
              <img src={recipe.imageUrl} alt={recipe.title} width="100" />
            )}
            <button onClick={() => setEditingRecipe(recipe)}>Editar</button>{" "}
            {/* Botón para editar */}
            <button onClick={() => deleteRecipe(recipe.id)}>
              Eliminar
            </button>{" "}
            {/* Botón para eliminar */}
          </li>
        ))}
      </ul>

      {/* Mostrar el formulario de edición solo si se ha seleccionado una receta para editar */}
      {editingRecipe && (
        <div>
          <h3>Editar Receta</h3>
          <EditRecipe recipe={editingRecipe} setEditing={setEditingRecipe} />
        </div>
      )}
    </div>
  );
};

export default RecipeList;
