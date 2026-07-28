export const getWeekMood = (progress: number) => {
  if (progress < 20)
    return {
      image: "/images/stormy1.png",
      title: "هفته آرومی بوده 🌧️",
      text: "هفته بعد هنوز فرصت داری، بهترین ها در انتظارت هستن!",
    };

  if (progress < 50)
    return {
      image: "/images/rainy1.png",
      title: "کم کم داری جلو میری ☁️",
      text: "ادامه بده، بهترین ها در انتظارت هستن!",
    };

  if (progress < 80)
    return {
      image: "/images/cloudy1.png",
      title: "هفته خوبی داشتی ⛅",
      text: "روندت رو حفظ کن، بهترین ها در انتظارت هستن!",
    };

  return {
    image: "/images/sunny1.png",
    title: "درخشیدی ☀️",
    text: "به همین مسیر ادامه بده، بهترین ها در انتظارت هستن!",
  };
};
