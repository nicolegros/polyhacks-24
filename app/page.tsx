import Image from 'next/image'
export default function Home() {
  return (
    <main className="bg-chiffon w-full h-screen flex flex-col">
      <div className="bg-chiffon w-full h-16 justify-end align-middle flex pr-8">
        <button className="mx-4 text-lg hover:text-tangerine">Home</button>
        <button className="mx-4 text-lg hover:text-tangerine">About</button>
        <button className="mx-4 text-lg hover:text-tangerine">Map</button>
      </div>
      <div className="flex h-full">
        <div className="h-full justify-end items-center flex">
          <div className="flex flex-col justify-end w-3/4">
            <h1 className="text-7xl text-sacramento">Slogan</h1>
            <p className="py-8 text-sacramento text-md">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            </p>
            <div className="flex">
              <button className="bg-pine
                                  text-lg
                                  hover:bg-tangerine
                                  text-white
                                  w-48
                                  rounded-full
                                  p-4">Find local markets</button>
              <button className="mx-8 text-lg text-sacramento hover:text-tangerine underline">More information</button>
            </div>
          </div>

        </div>
        <div className="h-full w-full flex justify-center items-center">
          <Image
            className="rounded-3xl"
            src="/happy-farmer-cropped.jpg"
            width={600}
            height={600}
            alt="Happy farmer"
          />
        </div>
      </div>
    </main>
  );
}
