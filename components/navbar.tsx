import Image from "next/image";

export function Navbar() {
  return (
    <div className="flex justify-between align-middle px-8 pt-8">
      <Image
        className="rounded-3xl"
        src="/green-basket-icon.png"
        width={60}
        height={20}
        alt="Happy farmer"
      />
      <div className="bg-chiffon w-full h-16 justify-end align-middle flex">

        <button className="mx-4 text-lg hover:text-tangerine"><a href="/">Home</a></button>
        <button className="mx-4 text-lg hover:text-tangerine"><a href="/about">About</a></button>
        <button className="mx-4 text-lg hover:text-tangerine"><a href="/map">Map</a></button>
      </div>
    </div>
  )
}
