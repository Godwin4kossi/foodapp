import { useEffect, useState } from "react";

const URL = "https://api.spoonacular.com/recipes/complexSearch";
const API_KEY = "8a15d5fe04a747ed8b8f17f18a758450";
export default function Search({ foodData,setFoodData }) {
    const [query, setQuery] = useState("pizza");
    // Synteax of the useEffect hook
    useEffect(() => {
      async  function fetchFood(){
          const res = await fetch(`${URL}?query=${query}&apiKey=${API_KEY}`)
          const data = await res.json()
          console.log(data.results)
          setFoodData(data.results)
        }
        fetchFood()
    }, [query])
    return <div>
        <input value={query} onChange={(e) => setQuery(e.target.value)} type="text" />
    </div>
}