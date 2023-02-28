import BASE_URL from "./BASE_URL"
import axios from 'axios'

export const follow = (currentId, followedId)=>{
    axios.post(`${BASE_URL}/follow`,{
        followerId:currentId,
        followedId:followedId
    })
    .then((res)=>{
        console.log(res)
    })
}
export function priceToString(price) {
    if(price!==undefined){
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    } else { return null }
}