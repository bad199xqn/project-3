import React, { useEffect, useRef, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import "./dashboard.scss";

export const NewArticleTableSkeleton = () => {
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
        <tr>
          <td style={{ width: "10%" }}>
            <span className="skeleton-box" style={{ width: "100%" }}></span>
          </td>
          <td
            style={{
              whiteSpace: "normal",
              wordWrap: "break-all",
              maxWidth: "30vw",
              width: "45%",
            }}
          >
            <span className="skeleton-box" style={{ width: "100%" }}></span>
            <span className="skeleton-box" style={{ width: "30%" }}></span>
          </td>

          <td style={{ width: "10%" }}>
            <span className="skeleton-box" style={{ width: "100%" }}></span>
          </td>

          <td style={{ width: "15%" }}>
            <span className="skeleton-box" style={{ width: "100%" }}></span>
          </td>

          <td style={{ width: "15%" }}>
            <span className="skeleton-box" style={{ width: "100%" }}></span>
          </td>
          <td style={{ width: "5%" }}>
            <span className="skeleton-box" style={{ width: "100%" }}></span>
          </td>
        </tr>
      ))}
    </>
  );
};

export const NewArticleTableSkeletonMobile = () => {
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
        <tr>
          <td style={{ width: "5%", padding: 0 }}>
            {/* <span className="skeleton-box" style={{ width: "100%" }}></span> */}
          </td>
          <td style={{ width: "60%" }}>
            <span className="skeleton-box" style={{ width: "100%" }}></span>
            <br />
            <span className="skeleton-box" style={{ width: "50%" }}></span>
          </td>
          <td style={{ width: "25%", padding: 0, paddingLeft: "12px" }}>
            <span className="skeleton-box" style={{ width: "100%" }}></span>
          </td>
          <td style={{ width: "10%" }}>
            {/* <span
              className="skeleton-box"
              style={{ width: "100%", padding: 0 }}
            ></span> */}
          </td>
        </tr>
      ))}
    </>
  );
};
