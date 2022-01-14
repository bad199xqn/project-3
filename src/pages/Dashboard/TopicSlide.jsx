import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import { Card, CardHeader, CardBody, CardTitle, CardText } from "reactstrap";
import "react-multi-carousel/lib/styles.css";
import "./dashboard.scss";

const TopicSlide = (props) => {
  const [drag, setDrag] = useState(false);
  const numberItem =
    window.screen.width > 1440 ? 9 : window.screen.width > 1024 ? 8 : 6;
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

  return (
    <>
      <Carousel
        additionalTransfrom={0}
        arrows={true}
        autoPlaySpeed={3000}
        centerMode={false}
        className=""
        containerClass="container-with-dots"
        dotListClass=""
        draggable
        focusOnSelect={false}
        // infinite
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
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464,
            },
            items: 6,
            partialVisibilityGutter: 30,
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0,
            },
            items: 3,
            partialVisibilityGutter: 30,
          },
        }}
        showDots={false}
        sliderClass=""
        slidesToSlide={2}
        swipeable
      >
        {props.topics.map((topic) => (
          <div
            className="hoverImages"
            style={{ userSelect: "none", draggable: "none" }}
            key={topic.id}
          >
            <Card
              style={{
                boxShadow: "none",
                borderColor: "rgba(255, 255, 255, 1)",
                borderWidth: 1,
                border: "1px solid rgba(255, 255, 255, 0.1)",
                backgroundColor: "#f8f8fb",
                userSelect: "none",
                draggable: "none",
              }}
            >
              <CardBody
                className="p-1 cursor-pointer "
                onMouseDown={() => setDrag(false)}
                onMouseMove={() => setDrag(true)}
                onMouseUp={() => {
                  if (!drag) {
                    props.onTopicClick(topic);
                  }
                }}
              >
                <div className="chart-area text-center mb-1">
                  <img
                  loading="lazy"
                    className=" tw-shadow-xl"
                    src={topic.thumbnail}
                    style={{
                      width: 90,
                      height: 90,
                      borderRadius: 45,
                      backgroundColor: "#fff",
                      pointerEvents: "none",
                      userSelect: "none",
                      draggable: "none",
                    }}
                  />
                </div>
                <div className="chart-area text-center mt-3">
                  <h6
                    style={{
                      fontWeight: 600,
                      pointerEvents: "none",
                      userSelect: "none",
                      draggable: "none",
                    }}
                  >
                    {topic.display}
                  </h6>
                </div>
              </CardBody>
            </Card>
          </div>
        ))}
      </Carousel>
    </>
  );
};

export default TopicSlide;
