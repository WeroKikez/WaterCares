const Header = () => {
  return (
    <header className="bg-blue-600 py-8 max-h-72 flex justify-between">
      <button
        className="uppercase text-white font-black text-lg mx-10 my-auto items-center"
      >
        Casa Enriquez
      </button>  

      <h1 className="uppercase text-center font-black text-4xl text-white">
        Water Cares
      </h1>

      <button
        className="uppercase text-white mx-10 my-auto" 
      >
        Emiliano Enriquez
      </button>
    </header>
  )
}

export default Header;