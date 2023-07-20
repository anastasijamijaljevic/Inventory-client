import axios from "axios";

const api = axios.create({
    baseURL:"http://localhost:5209/"
})

 

export default {api,fetch};



// const [inventory,setInventory] = useState([]);


// FUNKCIJA ZA FETCHANJE (SAMO ZA GET)
//   const fetch = async () =>{
//     try{
//       const result = await api.get("api/Inventory");
//       const data = result.data;
//       setInventory(data);
//       //console.log(data)
//       }
//     catch(error){
//       console.log(error)
//     }
//   }



//   useEffect(() => {
//     fetch();
//   },[]);


  {/* Ovako uzimaj sta ti treba za inventory (Umesto Item.name koristis Item.mark i td)
        {inventory.map((item,index) => {
          return(
            <p key={index}>{item.name}</p>
          )
  })} 
  */}