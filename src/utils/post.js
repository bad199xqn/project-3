import moment from "moment";
import News from "../assets/images/News.svg";
import MXH from "../assets/images/MXH.svg";
import Blog from "../assets/images/Blog.svg";
import Youtube from "../assets/images/Youtube.svg";

export const sentimentalityText = (sentimentality) => {
  if (sentimentality == 1) return "Tích cực";
  if (sentimentality == 2) return "Tiêu cực";
  if (sentimentality == 3) return "Trung tính";
  if (sentimentality == 4) return "Trung tính";
  if (sentimentality == 0) return "Trung tính";
};

export const sentimentalityColor = (sentimentality) => {
  if (sentimentality == 1) return "success";
  if (sentimentality == 2) return "danger";
  if (sentimentality == 3) return "warning";
  if (sentimentality == 4) return "warning";
  if (sentimentality == 0) return "warning";
};

export const relativeTime = (time) => {
  const now = moment();
  const pub_date = moment(time);
  const minutes_coutn = now.diff(pub_date, "minutes");
  const hours_coutn = now.diff(pub_date, "hours");
  const days_count = now.diff(pub_date, "days");
  const months_count = now.diff(pub_date, "months");

  if (minutes_coutn < 60) {
    return minutes_coutn + " phút trước";
  } else if (hours_coutn < 24){
    return hours_coutn + " giờ trước";
  } else if(days_count < 30){
    return days_count + " ngày trước";
  }else{
    return months_count + " tháng trước";
  }

  // if (minutes_coutn < 60) {
  //   return minutes_coutn + " phút trước";
  // } else {
  //   if (hours_coutn < 24) {
  //     return hours_coutn + " giờ trước";
  //   } else {
  //     return days_count + " ngày trước";
  //   }
  // }
};

export const publishDate = (date) => {
  const pub_date = moment(date);
  const publish_date =
    pub_date.format("HH:mm") + " " + pub_date.format("DD-MM-YYYY");
  return publish_date;
};

export const iconSource = (source) => {
  switch (source) {
    case 1:
      return News;
      break;

    case 2:
      return Blog;
      break;

    case 3:
      return MXH;
      break;

    case 4:
      return Youtube;
      break;
    default:
      break;
  }
};
