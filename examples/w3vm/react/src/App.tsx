import { saigon, createRoninModal } from "@roninbuilders/modal"

createRoninModal({
	chain: saigon,
	projectId: "cdbd18f9f96172be74c3e351ce99b908",
	darkMode: true,
})

function App() {
  return <ronin-button/>
}

export default App