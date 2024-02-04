
import Image from 'next/image'

export default function About() {
  return (
    <>
      <div className="img-background flex justify-center items-center h-96 mt-8">
        <p className="text-7xl text-white">A positive approach to food waste</p>
      </div>

    
      <h1 className="text-5xl text-sacramento font-bold mt-16 mx-8"> From Farm to Fork</h1>
      <div className="p-8 text-sacramento text-lg italic mx-8">
      "Food that is grown, raised, caught, or harvested, but never eaten, is considered to be food loss and waste. For example, a piece of fruit that is damaged during transport; food items in grocery stores that spoil before they can be sold; leftovers from a meal prepared at home that are not eaten; or food dishes prepared in a restaurant that are never served and are instead discarded. The term food loss applies from the point of maturity of a crop, finishing, catch, or harvest up to, but excluding, the retail stage; whereas food waste is applied to the retail and final food preparation and consumption stages."
      </div>
      <p className="mx-8 leading-tight text-sacramento text-lg text-right">
        Environment and Climate Change Canada (ECCC)
      </p>
    
    
      <h1 className="text-4xl mt-8 text-center text-sacramento font-bold mt-16 mx-8"> 
      3 astonishing statistics about food waste and food lost in Canada:
        </h1>
      
    
      <div className="flex justify-between items-center flex-row px-8">
        <div className="aspect-square bg-sacramento text-tangerine w-full h-full mr-8 p-4 flex justify-center items-center flex-col text-2xl text-center">
          <span className="text-8xl">47%</span> of food waste is generated in households
        </div>
        <div className="bg-tangerine w-full h-full mx-4 p-4 flex justify-center items-center flex-col text-2xl text-center text-sacramento">
          <span className="text-8xl">60%</span> of food waste occurs during production
        </div>
        <div className="bg-sacramento w-full h-full ml-8 p-4 flex justify-center items-center flex-col text-2xl text-center text-tangerine">
          <span className="text-8xl">56.5 M</span> tons of CO2 equivalent emissions created annually
        </div>
      </div>
    

    <div className ="bg-chiffon">
      <h1 className="text-5xl text-sacramento font-bold mt-16 mx-8"> Autres ressources</h1>

      <div className="flex">
       <button className="mx-8 mt-8 text-lg text-pine font-bold hover:text-tangerine underline"><a href="https://lepanierbleu.ca/">Le panier bleu</a></button>
      </div>

      <div className="flex">
       <p className="p-8 text-sacramento text-lg">Shopping local is better. Le Panier Bleu proposes local alternatives to international e-commerce giants. Order online from over 530 Quebec commerce and more than 250 000 products to browse from. 
      </p>
      </div>

      <div className="flex">
      <button className="mx-8 text-lg text-pine font-bold hover:text-tangerine underline"><a href="https://www.toogoodtogo.com">Too Good To Go</a></button>
      </div>
      <div className="flex">
       <p className="p-8 text-sacramento text-lg">Too Good To Go has an ambitious goal: to inspire and empower everyone to fight food waste. The problem is simple: too much food is being thrown away. Rescue unsold fresh food from an untimely fate at your favourite spots. Download the app today, reduce food waste while saving your wallet!
      </p>
      </div>

      <div className="flex">
       <button className="mx-8 text-lg text-pine font-bold hover:text-tangerine underline"><a href="https://www.recyc-quebec.gouv.qc.ca/citoyens/mieux-consommer/gaspillage-alimentaire/">En apprendre plus sur le gaspillage alimentaire</a></button>       
      </div>

      <div className="flex">
       <p className="p-8 text-sacramento text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
      </p>
      </div>
    </div>
    </>
  )
}
