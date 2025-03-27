import { useState } from "react";
import { db, storage } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "../Styles/FormStyles.css";
/*creamos la función del form de las recetas  */
const RecipeForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);

  /* evitamos que se recargue la página*/
  const handleSubmit = async (e) => {
    e.preventDefault();
    /*cambiamos el estado a true para indicar que está cargando */
    setLoading(true);

    try {
      /*variable para guardar la url de la imagen */
      let imageUrl = "";
      /*verificamos si subimos una imagen */
      if (image) {
        /*creamos una referencia al archivo en firestore */
        const imageRef = ref(storage, `recipes/${image.name}`);
        /*subimos la imagen */
        await uploadBytes(imageRef, image);
        /*obtenemos la url de descarga de la imagen */
        imageUrl = await getDownloadURL(imageRef);
      }

      /*guardamos los datos de la receta en la colección */
      await addDoc(collection(db, "recipes"), {
        title,
        description,
        imageUrl,
        createdAt: new Date(),
      });
      /*limpiamos el formulario */
      setTitle("");
      setDescription("");
      setImage(null);
      alert("Receta agregada con éxito!");
    } catch (error) {
      /*si algo falla manejamos el error */
      console.error("Error al agregar la receta:", error);
    } finally {
      /*actualizamos el estado */
      setLoading(false);
    }
  }; /*retornamos el form que nos permite llenar la recipe */
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Guardando..." : "Agregar Receta"}
      </button>
    </form>
  );
};

export default RecipeForm;
