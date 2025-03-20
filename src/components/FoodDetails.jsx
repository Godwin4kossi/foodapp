import { useEffect, useState } from "react";
import styles from './fooddetails.module.css'

export default function FoodDetails({ foodId }){
    // const [food,setFood]=useState({})
    const [food, setFood] = useState({
      extendedIngredients: [],
      analyzedInstructions: [],
    });
    const [isLoading, setIsLoading] = useState(true)
    const URL = `https://api.spoonacular.com/recipes/${foodId}/information`
    const API_KEY = "8a15d5fe04a747ed8b8f17f18a758450"
    useEffect(()=>{
      async  function fetchFood(){
         const res = await fetch(`${URL}?apiKey=${API_KEY}`)
         const data = await res.json()
         console.log(data)
         setFood(data)
         setIsLoading(false)
        }
        fetchFood()
}, [foodId])
console.log(food.extendedIngredients)
    return (
      <div>
        <div className={styles.recipeCard}>
          <h1 className={styles.recipeName}>{food.title}</h1>
          <img className={styles.recipeImage} src={food.image} alt="" />
          <div className={styles.recipeDetails}>
            <span>
              <strong>⏰ {food.readyInMinutes} Minutes </strong>
            </span>
            <span>
              <strong>Serves 👪 {food.servings} </strong>
            </span>
            <span>
              <strong>
                {food.vegetarian ? "🥕 Vegetarian" : "🍖 None-Vegetarian"}
              </strong>
            </span>
            <strong>
              <span>{food.vegan ? "🐮 Vegan" : ""}</span>
            </strong>
          </div>
          <div>
            <strong>
              <span>${food.pricePerServing / 100} Per serving</span>
            </strong>
          </div>
          <h2>Ingredients</h2>
          {food.extendedIngredients.map((item) => ( <div>
            <h3>{item.name}</h3>
          </div>
          ))}
          <h2>Instructions</h2>
          <div className={styles.recipeInstructions}>
            <ol>
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                food.analyzedInstructions[0].steps.map((step) => (
                  <li>{step.step}</li>
                ))
              )}
            </ol>
          </div>
        </div>
      </div>
    );
}