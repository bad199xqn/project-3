import React, { useEffect, useMemo, useRef, useState } from "react";
import Carousel from "react-multi-carousel";
import * as utils from "../../utils/post";
import ProgressiveImage from "../../components/CommonForBoth/ProgressiveImage";
import {
  Card,
  CardBody,

} from "reactstrap";
import "react-multi-carousel/lib/styles.css";
import img3 from "../../assets/images/empty.svg";
import "./dashboard.scss";

const RecommendationSkeleton = (props) => {
  const numberItem =
    window.screen.width > 1440 ? 5 : window.screen.width > 1024 ? 5 : 3;
  const loadingArr = [1, 2, 3, 4, 5,6];
  const [imgHeight, setImgHeight] = useState(0);
  const ref = useRef(null);
  const [refVisible, setRefVisible] = useState(false)
  useEffect(() => {
        if (ref.current && imgHeight === 0) {
      const width = ref.current.offsetWidth;
      
      const height = (width/4) * 3;
      setImgHeight(height)
      
    }
    // console.log(ref.current)
  }, [refVisible ]);




  return (
    <>
      <Carousel
        additionalTransfrom={0}
        arrows={window.screen.width > 464 ? true : false}
        autoPlay={false}
        autoPlaySpeed={5000}
        centerMode={false}
        className=""
        containerClass="container-with-dots"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024,
            },
            items: numberItem,
            partialVisibilityGutter: 40,
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0,
            },
            items: 1,
            partialVisibilityGutter: 30,
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464,
            },
            items: 2,
            partialVisibilityGutter: 30,
          },
        }}
        showDots={false}
        sliderClass=""
        slidesToSlide={window.screen.width > 464 ? 2 : 1}
        swipeable
      >
        {
          loadingArr.map((post) => (
            <div className="h-100 pb-5 mx-2">
              <Card className="cursor-pointer h-100 tw-shadow-lg px-1 pt-1 animate-zoom my-3" >
                <span
                ref={el => { ref.current = el; setRefVisible(!!el); }}
                  className="skeleton-box skeleton-img"
                  style={{ width: "100%", height: imgHeight }}
                ></span>

                <CardBody className="my-0 pb-0 px-3 pt-2">
                  <span
                    className="skeleton-box mt-2"
                    style={{ width: "100%" }}
                  ></span>
                                    <span
                    className="skeleton-box mt-1"
                    style={{ width: "100%" }}
                  ></span>
                                                      <span
                    className="skeleton-box mt-1"
                    style={{ width: "55%" }}
                  ></span>
                </CardBody>
              </Card>
            </div>
          ))}

        
      </Carousel>
    </>
  );
};



export default RecommendationSkeleton;
