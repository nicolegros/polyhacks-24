
export function Navbar() {
  return (
      <div className="bg-chiffon w-full h-16 justify-end align-middle flex pr-8 pt-8">
        <button className="mx-4 text-lg hover:text-tangerine"><a href="/">Home</a></button>
        <button className="mx-4 text-lg hover:text-tangerine"><a href="/about">About</a></button>
        <button className="mx-4 text-lg hover:text-tangerine"><a href="/map">Map</a></button>
      </div>
  )
}
