import Header from "./components/Header";
import WaterTracker from "./components/WaterTracker";

function App() {

  return (
    <>
      <Header />
        
      <h2
        className="text-center text-white font-bold text-4xl mx-auto my-10 uppercase bg-pink-600 max-w-2xl py-5 px-10 rounded-lg"
      >Tu Consumo de agua</h2>
      <div className="max-w-3xl mx-auto border border-gray-100 bg-white shadow-lg rounded-lg mt-10 p-10">
        <WaterTracker />
      </div>
    </>
  )
}

export default App;