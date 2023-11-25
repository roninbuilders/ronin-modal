import './App.css'
import { saigon, createRoninModal } from "@roninbuilders/modal"

createRoninModal({
	chain: saigon,
	projectId: "cdbd18f9f96172be74c3e351ce99b908",
})

async function getAddress(){
  try{
    const data: unknown = await fetch(`https://rns.rest/lookup/0x18655875fe028be58d685ddbf4a0a527aa1c1f08`)
    console.log("RNS data: ",data)
    if((data as { name: string })?.name) return (data as { name: string }).name
  }catch(e){console.log(e)}
}

function App() {
  return <>
	<ronin-button/>
	<button onClick={getAddress}>get address</button>
	</>
}

export default App