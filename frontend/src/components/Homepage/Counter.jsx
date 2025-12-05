import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

export default function StatsCounter() {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.3,
    });

    const stats = [
        { number: 15, suffix: "+", label: "Offices" },
        { number: 20000, suffix: "k+", label: "Numbers Sold" },
        { number: 16000, suffix: "k+", label: "Happy Clients" },
        { number: 500000, suffix: "+", label: "VIP Numbers" },
    ];

    return (
        <div
            ref={ref}
            className="bg-[url(./assets/bg.jpg)] bg-contain bg-center"

        >

            <div className="relative w-full py-8 sm:py-16  bg-[#17565DE6]">


                {/* Semi-transparent overlay */}
                {/* <div className="absolute inset-0 opacity-90"></div> */}

                <h1 className="text-xl sm:text-3xl font-semibold text-center text-white px-4 [text-shadow:2px_2px_2px_#000]">NumberATM Trusted by 100+ satisfied clients</h1>
                <h2 className=" text-center text-sm sm:text-xl text-white font-medium [text-shadow:2px_2px_2px_#000]">Reserve your VIP mobile number</h2>
                {/* Stats content */}
                <div className="relative max-w-6xl mt-8 mx-auto grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 text-center px-4 ">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-black/50 backdrop-blur-md p-6 rounded-2xl shadow-xl flex flex-col items-center justify-center transition-transform duration-300 hover:scale-105 border border-[#f5c037]"
                        >
                            <h2 className="text-3xl sm:text-4xl font-bold text-white [text-shadow:2px_2px_2px_#000]">
                                {inView ? (
                                    <CountUp
                                        start={0}
                                        end={stat.number}
                                        duration={2.5}
                                        separator=","
                                    />
                                ) : (
                                    0
                                )}
                                {stat.suffix}
                            </h2>
                            <p className="text-white text-sm sm:text-base mt-2 [text-shadow:2px_2px_2px_#000]">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
