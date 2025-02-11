import { saigon, createRoninModal } from "@roninbuilders/modal"

createRoninModal({
	chain: saigon,
	projectId: "cdbd18f9f96172be74c3e351ce99b908",
	waypoint:{
		clientId: "0e188f93-b419-4b0f-8df4-0f976da91ee6"
	}
})

function App() {
  return <ronin-button/>
}

export default App