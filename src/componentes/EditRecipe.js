import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, query, onSnapshot } from "firebase/firestore";
import EditRecipe from "./EditRecipe";

/*creamos la función que muestra y edita las recipes */
const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [editingRecipe, setEditingRecipe] = useState(null);

  useEffect(() => {
    /*consultamos a la colección en firebase */
    const q = query(collection(db, "recipes"));
    /*escuchamos los cambios y actualizamos */
    const unsubscribe = onSnapshot(q, (snapshot) => {
      /*Mapeamos los documentos para estrcuturarlos en el estado */
      const recipesData = snapshot.docs.map((doc) => ({
        /*obtenemos datos de la receta */
        id: doc.id,
        ...doc.data(),
      }));
      /**}actualizamos el estado */
      setRecipes(recipesData);
    });
    /*detemos cuando el componente se desmonta */
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h2>Recetas</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            {/*mostramos el titulo elegido */}
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
            {/*si agregamos foto la mostramos (no funcionó xd) */}
            {recipe.imageUrl && (
              <img src={recipe.imageUrl} alt={recipe.title} width="100" />
            )}
            {/*botón para editar */}
            <button onClick={() => setEditingRecipe(recipe)}>
              Editar
            </button>{" "}
          </li>
        ))}
      </ul>
      {/* si hay una receta que editar mostramos el componente editrecipes */}
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
