import Image from "next/image";

const WeekSect = () => {
  return (
    <div className="bg-[#f8fafc] flex justify-between p-5 rounded-3xl shadow mb-5">
      <div className="flex items-center"> 
        <Image src="/images/bulb.png" alt="cloudy" width={75} height={10} />
      </div>
      <div className="flex flex-col gap-4 justify-center text-center">
        <h1 className="text-2xl font-semibold">هفته خوبی داشته باشی!</h1>
        <h1 className="text-gray-600 font-semibold">
          همین روند رو ادامه بده، بهترین ها در انتظارت هستن 🌱
        </h1>
      </div>
      <Image src="/images/cloudy.png" alt="cloudy" width={180} height={20} />
    </div>
  );
};

export default WeekSect;
