import { set } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Card,
  CardBody,
  Col,
} from "reactstrap";
import "./dashboard.scss";
import PerfectScrollbar from "react-perfect-scrollbar";

const TopicsModal = (props) => {
  const [topicSlide, setTopicSlide] = useState(props.topicSlide);

  const topicClick = (topic) => {
    if (!topicSlide.find((t) => t.id === topic.id) && topicSlide.length < 10) {
      const topicArr = [...topicSlide, topic];
      setTopicSlide(topicArr);
    }

    if (topicSlide.find((t) => t.id === topic.id) && topicSlide.length > 1) {
      const topicArr = topicSlide.filter((t) => t.id !== topic.id);
      setTopicSlide(topicArr);
    }
  };

  useEffect(() => {
    setTopicSlide(props.topicSlide);
  }, [props.topicSlide]);

  return (
    <div>
      <Modal isOpen={props.modal} toggle={props.toggle}>
        <ModalHeader toggle={props.toggle} className="text-center">
          <h5 className="">Chọn chủ đề quan tâm</h5>
        </ModalHeader>
        <ModalBody style={{ backgroundColor: "#F8F8FB" }}>
          <PerfectScrollbar
            style={{ maxHeight: 400, width: "100%" }}
            options={{ suppressScrollX: true, useBothWheelAxes: false }}
          >
            <Row>
              {props.topics.map((topic) => (
                <Col xs={4} key={topic.id}>
                  <Card
                    className={
                      topicSlide.find((t) => t.id === topic.id)
                        ? ""
                        : "modal-topic"
                    }
                    style={{
                      boxShadow: "none",
                      // borderColor: "rgba(255, 255, 255, 1)",
                      // borderWidth: 1,
                      // border: "1px solid rgba(255, 255, 255, 0.1)",
                      backgroundColor: "#f8f8fb",
                      // opacity:0.4
                    }}
                    onClick={() => topicClick(topic)}
                  >
                    <CardBody className="p-1 cursor-pointer ">
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
                            borderColor: "rgb(69,70,231,0.2)",
                            borderWidth: 1,
                            border: "1px solid rgb(69,70,231,0.2)",
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
                </Col>
              ))}
            </Row>
          </PerfectScrollbar>
        </ModalBody>
        <ModalFooter className="d-flex flex-column align-items-center pt-0">
          {topicSlide.length < 10 ? <p className="mb-2">Chọn tối đa 10 chủ đề bạn quan tâm nhất</p> : <h5 className="mb-2 text-danger">Bạn đã chọn tối đa 10 chủ đề</h5>} 
          <Button color="primary" onClick={() => props.submit(topicSlide)}>
            Hoàn thành
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default TopicsModal;
