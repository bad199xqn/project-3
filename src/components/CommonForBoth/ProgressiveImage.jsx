import React, { Component } from "react";

class ProgressiveImage extends Component {
  static defaultProps = {
    alt: "",
  };

  constructor(props) {
    super(props);
    // initially set loading to true and current src of image to placeholder image
    this.state = {
      loading: true,
      currentSrc: props.placeholder,
    };
  }

  componentDidMount() {
    const { src } = this.props;
    // start loading original image
    const imageToLoad = new Image();
    imageToLoad.src = src;
    imageToLoad.onload = () =>
      // When image is loaded replace the image's src and set loading to false
      this.setState({ currentSrc: src, loading: false });
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      const { src } = this.props;
      // start loading original image
      const imageToLoad = new Image();
      imageToLoad.src = src;
      imageToLoad.onload = () =>
        // When image is loaded replace the image's src and set loading to false
        this.setState({ currentSrc: src, loading: false });
    }
  }

  render() {
    const { currentSrc, loading } = this.state;
    const { alt, style } = this.props;
    return (
      
      <img
        src={currentSrc}
        loading="lazy"
        className="ProgressiveImage"
        style={{
          ...style,
          opacity: loading ? 0.5 : 1,
          transition: "opacity .15s linear",

        }}
        alt={alt}
      />
    );
  }
}

export default ProgressiveImage;
