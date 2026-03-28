type Month = {
  Mar: string;
};

export const getDateFormater = () => {
  const date = new Date();
  const dateString = date.toDateString().split(" ");
  let newDate2 = date.toLocaleDateString("fa").split("/");
  console.log(date.toDateString());
  let day: string = dateString[0];
  let month: string = newDate2[1];
  let daynum: string = newDate2[2];

  switch (day) {
    case "Sat":
      day = "شنبه";
      break;
    case "Sun":
      day = "یکشنبه";
      break;
    case "Mon":
      day = "دوشنبه";
      break;
    case "Tue":
      day = "سه شنبه";
      break;
    case "Wed":
      day = "چهارشنبه";
      break;
    case "Thu":
      day = "پنجشنبه";
      break;
    case "Fri":
      day = "جمعه";
      break;
    default:
      break;
  }

  switch (month) {
    case "۱":
      month = "فروردین";
      break;
    case "۱۲":
      month = "اسفند";
    default:
      break;
  }

  if (daynum[0] == "0") {
    daynum = daynum.slice(1);
  }

  return { day, month, daynum };
};
