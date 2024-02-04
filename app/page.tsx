import Image from 'next/image'
export default function Home() {
  return (
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
                                  p-4"><a href="/map">Find local markets</a></button>
            <button className="bg-pine
                                  text-lg
                                  hover:bg-tangerine
                                  text-white
                                  w-48
                                  rounded-full
                                  p-4"><a href="/producer">I&apos;m a producer!</a></button>
            <button className="mx-8 text-lg text-sacramento hover:text-tangerine underline"><a href="/about">More information</a></button>
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
  );
}
