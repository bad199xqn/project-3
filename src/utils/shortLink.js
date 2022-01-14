import axios from "axios";


export const copyToClipboard = str => {
    // const el = document.createElement('textarea');
    // el.value = str;
    // el.setAttribute('readonly', '');
    // el.style.position = 'absolute';
    // el.style.left = '-9999px';
    // document.body.appendChild(el);
    // el.select();
    // document.execCommand('copy');
    // document.body.removeChild(el);
    // let input = document.createElement("input");
    // input.style.opacity = "0";
    // input.style.position = "fixed";
    // input.value = str;
    // document.body.appendChild(input);

    // input.focus();
    // input.setSelectionRange(0, input.value.length);
    // document.execCommand("Copy");

    // input.remove();
    navigator.clipboard.writeText(str)
  };

  export const getShortLink =  (url, title, featureImg) => {
    const d = new Date();
const publish_time = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}T${d.getHours()}:${d.getMinutes()}:${d.getSeconds}` 
  const data = JSON.stringify({
    payload: {
      title: title,
      href: url,
      feature_url:featureImg,
        // "https://vnalert.vn/wp-content/uploads/2021/04/image-16-2.png",
        
      content: " ",
      alias: null,
      description: " ",
      source: "adminpage",
      destination_group: " ",
      destination_publish_time: publish_time,
    },
  });

  var config = {
    method: "post",
    url: "https://go.vnalert.vn/admin/generate-shorten-link",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config)
    .then( (response) => {
        if (response.data.success) {
            const link = response.data.data.replace("go.vnalert.vn/", "go.vnalert.vn/out/")
            
            return link
        } else {
            return ''
        }
     
    })
    .catch( (error) => {
        return ''
    });
    
};



