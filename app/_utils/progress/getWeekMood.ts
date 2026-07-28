export const getWeekMood = (progress: number) => {
  if (progress < 20)
    return {
      image: "/images/stormy.png",
      title: "هفته آرومی بوده 🌧️",
      text: "هفته بعد هنوز فرصت داری، بهترین ها در انتظارت هستن!",
    };

  if (progress < 50)
    return {
      image: "/images/rainy.png",
      title: "کم کم داری جلو میری ☁️",
      text: "ادامه بده، بهترین ها در انتظارت هستن!",
    };

  if (progress < 80)
    return {
      image: "/images/cloudy.png",
      title: "هفته خوبی داشتی ⛅",
      text: "روندت رو حفظ کن، بهترین ها در انتظارت هستن!",
    };

  return {
    image: "/images/sunny.png",
    title: "درخشیدی ☀️",
    text: "به همین مسیر ادامه بده، بهترین ها در انتظارت هستن!",
  };
};
