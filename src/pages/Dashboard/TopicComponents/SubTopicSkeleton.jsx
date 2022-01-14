import React, { useEffect, useMemo, useRef, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import img3 from "../../../assets/images/empty.svg";
import "./../dashboard.scss";

export const SubTopicSkeleton = (props) => {
  const numberItem =
    window.screen.width > 1440 ? 5 : window.screen.width > 1024 ? 5 : 3;
  const loadingArr = [1, 2, 3, 4, 5];
  const [imgHeight, setImgHeight] = useState(0);
  const ref = useRef(null);
  const [refVisible, setRefVisible] = useState(false);
  useEffect(() => {
    if (ref.current && imgHeight === 0) {
      const width = ref.current.offsetWidth;

      const height = (width / 4) * 3;
      setImgHeight(height);
    }
    // console.log(ref.current)
  }, [refVisible]);

  return (
    <>
      {loadingArr.map((post, i) => (
        <tr className="h-100 pb-5" key={i+999}>
          <td
            className="d-flex flex-start "
            style={{
              paddingLeft: 12,
              paddingRight: 0,
              paddingTop: 0,
              width: "80px",
            }}
          >
            <span
              ref={(el) => {
                ref.current = el;
                setRefVisible(!!el);
              }}
              className="skeleton-box skeleton-img avatar-sm-34"
              style={{
                width: "100%",
                // width: "64px",
                height: "48px",
              }}
            ></span>
          </td>

          <td
            style={{
              paddingRight: 12,
              paddingTop: 0,
              paddingLeft: 0,
              whiteSpace: "normal",
              wordWrap: "break-all",
              width: "390px",
            }}
          >
            <span className="skeleton-box" style={{ width: "100%" }}></span>
            <span className="skeleton-box" style={{ width: "20%" }}></span>
            <br />
            <span className="skeleton-box mt-2" style={{ width: "30%" }}></span>
          </td>
        </tr>
      ))}
    </>
  );
};

export const SubTopicSkeletonMobile = () => {
  const numberItem =
    window.screen.width > 1440 ? 5 : window.screen.width > 1024 ? 5 : 3;
  const loadingArr = [1, 2, 3, 4, 5, 6];
  const [imgHeight, setImgHeight] = useState(0);
  const ref = useRef(null);
  const [refVisible, setRefVisible] = useState(false);
  useEffect(() => {
    if (ref.current && imgHeight === 0) {
      const width = ref.current.offsetWidth;

      const height = (width / 4) * 3;
      setImgHeight(height);
    }
    // console.log(ref.current)
  }, [refVisible]);

  return (
    <>
      {loadingArr.map((post) => (
        <tr className="h-100 pb-5 mx-1">
          <td
            className="d-flex flex-start "
            style={{
              paddingLeft: 13,
              paddingRight: 0,
              paddingTop: 0,
            }}
          >
            <span
              ref={(el) => {
                ref.current = el;
                setRefVisible(!!el);
              }}
              className="skeleton-box skeleton-img avatar-sm-34"
              style={{
                // width: "100%",
                width: "64px",
                height: "48px",
              }}
            ></span>
          </td>

          <td
            style={{
              paddingRight: 12,
              paddingTop: 0,
              paddingLeft: 12,
              whiteSpace: "normal",
              wordWrap: "break-all",
              width: "390px",
            }}
          >
            <span className="skeleton-box" style={{ width: "100%" }}></span>
            <span className="skeleton-box" style={{ width: "20%" }}></span>
            <br />
            <span className="skeleton-box mt-2" style={{ width: "30%" }}></span>
          </td>
        </tr>
      ))}
    </>
  );
};
