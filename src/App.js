import "./styles.css";
import RecipeForm from "./componentes/RecipesForm";
import RecipeList from "./componentes/RecipesList";

export default function App() {
  return (
    <div>
      <h1>Recipe manager</h1>
      <RecipeForm />
      <RecipeList />
    </div>
  );
}
