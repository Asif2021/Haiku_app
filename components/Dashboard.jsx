import { ObjectId } from "mongodb"
import { getCollection } from "../lib/db"
import Haiku from "./Haiku"

async function getHaikus(id){
const collection = await getCollection("haikus")
const results = await collection.find({author:ObjectId.createFromHexString(id)}).sort({_id:-1}).toArray()
return results
}



async function Dashboard(props) {
    const haikus = await getHaikus(props.user.userId)
  return (
    <div>
<h2 className="text-center text-gray-600 text-2xl mb-5 font-bold">Your Haikus</h2>

{
    haikus.map((haiku, index)=>{
        haiku._id = haiku._id.toString()
        haiku.author = haiku.author.toString()
return <Haiku haiku={haiku} key={index}/>
    })
}
    </div>
  )
}
export default Dashboard