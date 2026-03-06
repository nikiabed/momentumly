

type Month = {
  Mar: string;
};
export const getDateFormater = (day: string, month: string, daynum:string) => {
  switch (day) {
    case "Sat":
      day = "شنبه";
      break;
    case "Sun":
      day = "یک شنبه";
      break;
    case "Mon":
      day = "دو شنبه";
      break;
    case "Tue":
      day = "سه شنبه";
      break;
    case "Wed":
      day = "چهارنشبه";
      break;
    case "Thr":
      day = "پنجشنبه";
      break;
    case "Fri":
      day = "جمعه";
      break;
    default:
      break;
  }

  const mon: Month = {
    Mar: "مارس",
  };

  switch (month) {
    case "Mar":
      month = mon.Mar;
      break;
    default:
      break;
  }

  if (daynum[0]=='0'){
    daynum = daynum.slice(1)
  }

  return { day, month, daynum };
};
