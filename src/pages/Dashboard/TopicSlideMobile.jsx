import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import { Card, CardHeader, CardBody, CardTitle, CardText } from "reactstrap";
import "react-multi-carousel/lib/styles.css";
import "./dashboard.scss";

const TopicSlideMobile = (props) => {
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

  console.log(props)

  return (
    <>
      <Carousel
        additionalTransfrom={0}
        arrows={false}
        autoPlaySpeed={2000}
        centerMode={false}
        className="m-0 bg-light"
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
            items: 4,
            partialVisibilityGutter: 30,
          },
        }}
        showDots={false}
        sliderClass="m-0"
        slidesToSlide={2}
        swipeable
      >
        {props.topics.map((topic) => (
          <div
            className="m-0 ml-1"
            style={{ userSelect: "none", draggable: "none" }}
          >
            <Card
              style={{
                boxShadow: "none",
                // borderColor: "rgba(255, 255, 255, 1)",
                // borderWidth: 1,
                backgroundColor: props.topicTrendingKeyword.id !== topic.id ? "#F5F6F8" : "#ffffff",
                userSelect: "none",
                draggable: "none",
              }}
              className="m-0"
            >
              <CardBody
                className="p-1 cursor-pointer"
                onMouseDown={() => setDrag(false)}
                onMouseMove={() => setDrag(true)}
                onMouseUp={() => {
                  if (!drag) {
                    props.onTopicClick(topic);
                  }
                }}
                style={{ height: "25px", borderRadius: "5px"}}
              >
                <div className="chart-area text-center">
                  <h6
                    style={{
                      fontWeight: 600,
                      pointerEvents: "none",
                      userSelect: "none",
                      draggable: "none",
                      color: props.topicTrendingKeyword.id !== topic.id && "gray"
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
}

export default TopicSlideMobile
