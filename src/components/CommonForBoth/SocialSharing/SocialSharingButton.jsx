
import React from "react";

const encodeURI = (string) => {
    if (typeof string === 'undefined') {
      return ''
    }
  
    return encodeURIComponent(string)
  }

const SocialSharingButton = (props) => {
    const url = encodeURI(props.url);
    const shareText = encodeURI(props.shareText)
  const getUrl = (type) => {

    switch (type) {
      case "Facebook":
        return `https://facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case "Twitter":
        return `https://twitter.com/intent/tweet/?text=${shareText}&url=${url}`;
        break;
      case "LinkedIn":
        return `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${shareText}&summary=${shareText}&source=${url}`;
        break;
      case "Telegram":
        return `https://telegram.me/share/url?text=${shareText}&url=${url}`;
        break;
      case "Viber":
        return "https://3p3x.adj.st/?adjust_t=u783g1_kw9yml&adjust_fallback=https%3A%2F%2Fwww.viber.com%2F%3Futm_source%3DPartner%26utm_medium%3DSharebutton%26utm_campaign%3DDefualt&adjust_campaign=Sharebutton&adjust_deeplink=" + encodeURIComponent("viber://forward?text=" + decodeURI(shareText + " " + url));
        break;
      case "WhatsApp":
        return `whatsapp://send?text=${shareText}%20${url}`;
        break;
      case "Email":
        return `mailto:?subject=${shareText}&body=${url}`;
        break;

      default:
        break;
    }
    return null;
  };

  const getIcon = (type) => {

    switch (type) {
      case "Facebook":
        return 'fab fa-facebook-f text-white';
        break;
      case "Twitter":
        return 'fab fa-twitter text-white';
        break;
      case "LinkedIn":
        return 'fab fa-linkedin-in text-white';
        break;
      case "Telegram":
        return 'fab fa-telegram-plane text-white';
        break;
      case "Viber":
        return 'fab fa-viber text-white';
        break;
      case "WhatsApp":
        return 'fab fa-whatsapp text-white';
        break;
      case "Email":
        return 'mdi mdi-email-outline text-white';
        break;

      default:
        break;
    }
    return null;
  };

  const getColor = (type) => {

    switch (type) {
      case "Facebook":
        return '#4267B2';
        break;
      case "Twitter":
        return '#52A2F3';
        break;
      case "LinkedIn":
        return '#3B77B5';
        break;
      case "Telegram":
        return '#0088cc';
        break;
      case "Viber":
        return '#7360F3';
        break;
      case "WhatsApp":
        return '#66D367';
        break;
      case "Email":
        return 'rgb(136,136,136)';
        break;

      default:
        break;
    }
    return null;
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <a target='_blank' href={getUrl(props.type)} class="btn btn-circle btn-lg d-flex align-items-center justify-content-center mb-2" style={{backgroundColor: getColor(props.type)}}>
        <i class={getIcon(props.type)}></i>
      </a>
      <p className="">{props.type}</p>
    </div>
  );
};

export default SocialSharingButton;
