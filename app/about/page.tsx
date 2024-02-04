
import Image from 'next/image'

export default function About() {
  return (
    <>
      <div className="img-background flex justify-center items-center h-96 mt-8">
        <p className="text-7xl text-white">A positive approach to food waste</p>
      </div>

      <p className="p-8 text-sacramento text-lg">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
      </p>

      <div className="flex justify-between items-center flex-row px-8">
        <div className="aspect-square bg-salmon text-sacramento w-full h-full mr-8 p-4 flex justify-center items-center flex-col text-2xl text-center">
          <span className="text-8xl">47%</span> of food waste is generated in households
        </div>
        <div className="bg-sacramento w-full h-full mx-4 p-4 flex justify-center items-center flex-col text-2xl text-center text-salmon">
          <span className="text-8xl">60%</span> of food waste occurs during production
        </div>
        <div className="bg-yellow-50 w-full h-full ml-8 p-4 flex justify-center items-center flex-col text-2xl text-center">
          <span className="text-8xl">56.5 M</span> tons of CO2 equivalent emissions created annually
        </div>
      </div>
      <h1 className="text-5xl text-sacramento mt-8 mx-8">Slogan</h1>
    </>
  )
}
