import React, { useEffect, useMemo, useState } from "react";
import Carousel from "react-multi-carousel";
import * as utils from "../../utils/post";
import ProgressiveImage from "../../components/CommonForBoth/ProgressiveImage";
import {
  Card,
  CardDeck,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  Row,
  Col,
  CardImg,
} from "reactstrap";
import "react-multi-carousel/lib/styles.css";
import img3 from "../../assets/images/empty.svg";
import "./dashboard.scss";
import { Link } from "react-router-dom";

const Recommendation = (props) => {
  const [drag, setDrag] = useState(false);
  const numberItem =
    window.screen.width > 1440 ? 5 : window.screen.width > 1024 ? 5 : 3;
  const [auto, setAuto] = useState(true);
  const [counter, setCounter] = useState(0);
  const loadingArr = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  ];

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  useEffect(() => {
    // if (counter > 0 && !auto) {
    //   setTimeout(setCounter(counter - 1), 1000);
    //   console.log(counter);
    // }
    // if (counter === 0 && !auto ) {
    //   setAuto(true);
    // }
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    if (counter === 5) {
      setAuto(false);
    }
    if (counter === 0) {
      setAuto(true);
    }
    return () => clearInterval(timer);
  }, [counter]);

  useEffect(() => {}, []);

  const textStyle = {
    maxWidth: "100%",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 3,
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  return (
    <>
      <Carousel
        additionalTransfrom={0}
        customLeftArrow={
          <CustomLeftArrow
            onBtnClick={() => {
              setCounter(5);
              // setTimeout(setAuto(true), 5000)
            }}
          />
        }
        customRightArrow={
          <CustomRightArrow
            onBtnClick={() => {
              setCounter(5);
              // setTimeout(setAuto(true), 5000)
            }}
          />
        }
        arrows={window.screen.width > 464 ? true : false}
        autoPlay={auto}
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
        {props.posts &&
          props.posts.map((post) => (
            <div className="h-100 pb-5 mx-2" key={post.pk}>
              <Card
                className="cursor-pointer h-100 tw-shadow-lg px-1 pt-1 my-3 recommend-hover animate-zoom"
                style={{ userSelect: "none", draggable: "none" }}
                // onMouseDown={() => setDrag(false)}
                // onMouseMove={() => setDrag(true)}
                // onMouseUp={() => {
                //   if (!drag) {
                //     window.open(post.url);
                //   }
                // }}
              >
                <ProgressiveImage
                  src={
                    post.feature_image == "" || !post.feature_image
                      ? img3
                      : post.feature_image
                  }
                  className="img-fluid"
                  style={{
                    borderTopLeftRadius: "0.25rem",
                    borderTopRightRadius: "0.25rem",
                    pointerEvents: "none",
                    userSelect: "none",
                    draggable: "none",
                  }}
                  placeholder={img3}
                />
                <CardText
                  className="text-center recommend-reason"
                  style={{
                    maxWidth: "100%",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    // paddingLeft:2,
                    // paddingRight:2,
                  }}
                >
                  {post.reason} 
                </CardText>
                <CardBody className="my-0 pb-0 px-3 pt-0 position-relative">
                  <CardTitle
                    style={{
                      // pointerEvents: "none",
                      userSelect: "none",
                      draggable: "none",
                    }}
                    
                  >
                    <span className="recommend-text">
                      <p
                        onMouseDown={() => setDrag(false)}
                        onMouseMove={() => setDrag(true)}
                        onMouseUp={() => {
                          if (!drag) {
                            window.open(post.url);
                          }
                        }}
                        style={textStyle}
                      >
                        {" "}
                        {post.title}{" "}
                      </p>
                    </span>

                  </CardTitle>

                  <CardText
                    style={{ pointerEvents: "none", userSelect: "none" }}
                    className="recommend-text"
                  >
                    {post.source_type[0] ? (
                      <img
                        src={utils.iconSource(Number(post.source_type[0]))}
                        alt=""
                        height="14"
                        className="mr-1"
                      />
                    ) : (
                      <img
                        src={utils.iconSource(1)}
                        alt=""
                        height="14"
                        className="mr-1"
                      />
                    )}
                    <small>
                      {" "}
                      {utils.relativeTime(post.publish_date)} - {post.source}
                    </small>
                  </CardText>

                  <CardTitle className="recommend-summary">
                  {post.summary !== null && post.summary !== '' && 
                      <span >
                        <Link to={`/summary-article?pk=${post.pk}`} target="_blank" className="recommend-summary-text">
                          Xem tóm tắt <i className='bx bx-link-external font-size-12'></i>
                        </Link>
                      </span>
                    }
                  </CardTitle>
                </CardBody>
              </Card>
            </div>
            
          ))}
      </Carousel>
    </>
  );
};

function CustomRightArrow({ onBtnClick, onClick }) {
  function handleClick() {
    // do whatever you want on the right button click

    onBtnClick();
    // ... and don't forget to call onClick to slide
    onClick();
  }

  return (
    <button
      onClick={handleClick}
      aria-label="Go to next slide"
      className="react-multiple-carousel__arrow react-multiple-carousel__arrow--right"
    />
  );
}

function CustomLeftArrow({ onBtnClick, onClick }) {
  function handleClick() {
    // do whatever you want on the right button click
    // console.log(test);
    // ... and don't forget to call onClick to slide
    onBtnClick();
    onClick();
  }

  return (
    <button
      onClick={handleClick}
      aria-label="Go to previous slide"
      className="react-multiple-carousel__arrow react-multiple-carousel__arrow--left"
    />
  );
}

export default Recommendation;
