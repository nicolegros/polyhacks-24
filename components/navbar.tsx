import Image from "next/image";

export function Navbar() {
    return (
        <div className="flex justify-between align-middle px-8 pt-8">
            <a href="/">
                <Image
                    className="rounded-3xl"
                    src="/green-basket-icon.png"
                    width={60}
                    height={20}
                    alt="Happy farmer"
                />
            </a>
            <div className="bg-chiffon w-full h-16 justify-end align-middle flex">

                <button className="text-sacramento mx-4 text-lg hover:text-tangerine"><a href="/">Home</a></button>
                <button className="text-sacramento mx-4 text-lg hover:text-tangerine"><a href="/about">About</a></button>
                <button className="text-sacramento mx-4 text-lg hover:text-tangerine"><a href="/map">Map</a></button>
                <button className="text-tangerine mx-4 text-lg hover:text-sacramento"><a href="/producer">I&apos;m a producer!</a></button>
            </div>
        </div>
    )
}
