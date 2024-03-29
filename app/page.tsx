import Image from 'next/image'

export default function Home() {
    return (
        <div className="flex h-full lg:flex-row flex-col-reverse justify-center items-center">
            <div className="h-full lg:justify-end  justify-center items-center flex">
                <div className="flex flex-col lg:justify-end justify-center md:ml-16 mx-4 xl:w-3/4 w-full">
                    <h1 className="lg:text-7xl text-5xl text-sacramento max-lg:mt-4">GreenBasket</h1>
                    <p className="py-8 text-sacramento text-md">
                        To fight against food waste and support local farmers, GreenBasket generates a map with all the
                        local markets and businesses near you. </p>
                    <div className="flex md:flex-row flex-col max-md:justify-center max-md:items-center">
                        <button className="bg-pine
                                  text-lg
                                  hover:bg-tangerine
                                  text-white
                                  w-48
                                  rounded-full
                                  p-4
                                  max-md:mb-4"><a href="/map">Find local markets</a></button>
                        <button className="mx-8 text-lg text-sacramento hover:text-tangerine underline"><a
                            href="/about">More information</a></button>
                    </div>
                </div>

            </div>
            <div className="h-full w-full flex justify-center items-center">
                <Image
                    className="md:rounded-3xl"
                    src="/happy-farmer-cropped.jpg"
                    width={600}
                    height={600}
                    alt="Happy farmer"
                />
            </div>
        </div>
    );
}
