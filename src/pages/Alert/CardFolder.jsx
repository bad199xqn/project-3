import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import {
  Col,
  Card,
  CardBody,
  UncontrolledTooltip,
  Media,
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  Modal,
} from "reactstrap";

import "./alert.scss";
import AlertExport from "./AlertExport";
import AlertExportModal from "./AlertExportModal";

const fontAwesomeStyle = {
  textAlign: "center",
  width: "1.25em",
  height: "1em",
  fill: "white",
  verticalAlign: "-0.25em",
};

class CardProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editFolderPk: null,
      newFolderName: null,
      delModalOpend: false,
      delType: "",
      delPk: null,
      showAlert: [],
    };
  }

  openModal = (type, pk) => {
    this.setState({
      delModalOpend: true,
      delType: type,
      delPk: pk,
    });
  };

  showMore = (folder_pk) => {
    const alerts = document.getElementsByClassName(
      `folder-${folder_pk} can-hide`
    );
    document.getElementsByClassName(
      "folder-" + folder_pk + "-down"
    )[0].className = `px-2 py-3 border-top folder-${folder_pk}-down hide-alert`;
    document.getElementsByClassName(
      "folder-" + folder_pk + "-up"
    )[0].className = `px-2 py-3 border-top folder-${folder_pk}-up show-alert`;
    for (let i = 0; i < alerts.length; i++) {
      alerts[
        i
      ].className = `px-3 py-3 border-top mx-2 mb-2 folder-${folder_pk} can-hide show-alert`;
    }
  };

  showLess = (folder_pk) => {
    const alerts = document.getElementsByClassName(
      `folder-${folder_pk} can-hide`
    );
    document.getElementsByClassName(
      "folder-" + folder_pk + "-up"
    )[0].className = `px-2 py-3 border-top folder-${folder_pk}-up hide-alert`;
    document.getElementsByClassName(
      "folder-" + folder_pk + "-down"
    )[0].className = `px-2 py-3 border-top folder-${folder_pk}-down show-alert`;
    for (let i = 0; i < alerts.length; i++) {
      alerts[
        i
      ].className = `px-3 py-3 border-top mx-2 mb-2 folder-${folder_pk} can-hide hide-alert`;
    }
  };

  componentDidMount() {
    // console.log(this.props.folders)
  }
  // hi???n th??? v?? ???n chi ti???t ch??? ?????
  onClickShowAlert = (key) => {
    if (window.innerWidth < 992) {
      //ki???m tra xem key ???? c?? trog sate ch??a?
      if (this.state.showAlert.filter((item) => item === key).length !== 0) {
        this.setState({
          showAlert: this.state.showAlert.filter((item) => item !== key)
        })
        //n???u c?? r???i x??a key ??i
      } else {
        this.setState({
          showAlert: [... this.state.showAlert, key]
        })
        //n???u ch??a c?? add th??m c??i m???i
      }
    }
  }
 
  render() {
    const textStyle = {
      maxWidth: "100%",
      display: "-webkit-box",
      WebkitBoxOrient: "vertical",
      lineHeight: 1.3,
      WebkitLineClamp: 2,
      overflow: "hidden",
      textOverflow: "ellipsis",
    };
    return (
      <React.Fragment>
                                <AlertExportModal/>
        {this.props.folders &&
          this.props.folders.map((folder, index) => (
            <Col xl="4" sm="6" key={"_project_" + folder.pk}>
              <Card style={this.state.showAlert.filter((item) => item === index).length !== 0 || window.innerWidth >= 992 ? { backgroundColor: "#EEEEEE" } : { backgroundColor: "#ffffff" }} >
                <CardBody>
                  <Media>
                    {/* vi???t css inline cho media --  marginLeft:-5px */}
                    <Media className="overflow-hidden" body style={{ marginLeft: '-5px' }}>
                      {this.state.editFolderPk !== folder.pk && (
                        // b???t s??? ki???n onClickShowAlert
                        <div className="d-flex justify-content-start" onClick={() => { this.onClickShowAlert(index) }}>
                          {/* vi???t css inline cho th??? i - marginTop:4px */}
                          {(window.innerWidth < 992 ? (
                            <>
                              <i className={this.state.showAlert.filter((item) => item === index).length !== 0 ? 'fas fa-sm fa-chevron-up' : 'fas fa-sm fa-chevron-down'} style={{ marginTop: '4px' }}></i>
                            </>
                          ) : '')

                          }

                          {/* vi???t css inline cho th??? h5-- paddingleft:9px */}
                          <h5 className="text-truncate font-size-15 m-0" style={{ paddingLeft: '9px' }}>
                            <Link to="#" className="text-dark">
                              {folder.name === "root_folder"
                                ? "Ch??a ?????t t??n"
                                : folder.name}
                              &nbsp;
                            </Link>
                          </h5>
                          <p className="text-muted mb-0" style={textStyle}>
                            - {folder.child_alerts.length} ch??? ?????
                          </p>

                        </div>
                      )}
                      {this.state.editFolderPk === folder.pk && (
                        <div
                          className="form-control d-flex align-items-center"
                          style={{ backgroundColor: "#EEEEEE" }}
                        >
                          <div className="align-items-baseline d-flex w-100">
                            <input
                              type="text"
                              className="mr-1 form-control-sm form-control"
                              autoFocus
                              aria-invalid="false"
                              value={this.state.newFolderName}
                              onChange={(e) =>
                                this.setState({ newFolderName: e.target.value })
                              }
                            />
                            <button
                              onClick={() => {
                                this.props.editFolder(
                                  this.state.editFolderPk,
                                  this.state.newFolderName
                                );
                                this.setState({
                                  editFolderPk: null,
                                });
                              }}
                              className="ml-auto mr-1 btn btn-success btn-sm"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                style={fontAwesomeStyle}
                              >
                                <path
                                  color="white"
                                  d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
                                ></path>
                              </svg>

                            </button>
                            <button
                              onClick={() =>
                                this.setState({
                                  editFolderPk: null,
                                })
                              }
                              type="button"
                              className="btn btn-danger btn-sm"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 352 512"
                                style={fontAwesomeStyle}
                              >
                                <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
                              </svg>
                            </button>
                          </div>
                        </div>
                      )}
                    </Media>
                    {this.state.editFolderPk !== folder.pk && (
                      <Media>
                        <div className="float-right ">
                          <UncontrolledDropdown>
                            <DropdownToggle
                              href="#"
                              className="card-drop"
                              tag="i"
                            >
                              <i className="bx bx-dots-horizontal-rounded font-size-18"></i>
                            </DropdownToggle>
                            <DropdownMenu right>
                              <DropdownItem
                                onClick={() =>
                                  this.setState({
                                    editFolderPk: folder.pk,
                                  })
                                }
                              >
                                <i className="bx bx-edit-alt font-size-16 mr-2"></i>
                                ?????i t??n nh??m ch??? ?????
                              </DropdownItem>
                              <DropdownItem
                                onClick={() =>
                                  this.openModal("folder", folder.pk)
                                }
                              >
                                <i className="bx bx-trash font-size-16 mr-2"></i>
                                X??a nh??m ch??? ?????
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </div>
                      </Media>
                    )}
                  </Media>
                </CardBody>
                {(window.innerWidth < 992 ? (
                  <>
                    <div
                      //fillter
                      className={this.state.showAlert.filter((item) => item === index).length !== 0 ? 'search-box chat-search-box border-top mx-2 mb-2' : 'search-box chat-search-box border-top mx-2 mb-2 d-none'}
                      style={{ borderRadius: "0.25rem" }}
                    >
                      <div
                        className="position-relative"
                        style={{ backgroundColor: "#EEEEEE" }}
                      >
                        <Input
                          type="text"
                          className="form-control"
                          placeholder="Th??m ch??? ?????"
                          style={{
                            backgroundColor: "#F8F8FB",
                            borderRadius: "0.25rem",
                          }}
                          onFocus={() => {
                            this.props.history.push("/alert-create");
                          }}
                        />
                        <i className="bx bx-plus search-icon"></i>
                      </div>
                    </div>
                    {folder.child_alerts.map((alert, key) => {
                      // className={`px-3 py-3 border-top mx-2 mb-2 folder-${folder.pk
                      // } ${key >= 3 ? "can-hide hide-alert" : "show-alert"}`}
                      return (
                        <div
                          style={{ backgroundColor: "#fff" }}
                          id={`folder-${folder.pk}_alert-${alert.pk}`}
                          key={`folder-${folder.pk}_alert-${alert.pk}`}
                          className={this.state.showAlert.filter(
                            (item) => item === index).length !== 0 ? `px-3 py-3 border-top mx-2 mb-2 folder-${folder.pk} show-alert` : `d-none px-3 py-3 border-top mx-2 mb-2 folder-${folder.pk} 
                            ${key >= 3 ? "can-hide hide-alert" : "show-alert"}`}
                        >
                          <div className="d-flex justify-content-between">
                            <Link
                              to={{
                                pathname: "/alert-detail",
                                search: `?displayKeyword=${alert.name}`,
                                state: {
                                  alertPk: alert.pk,
                                  publicToken: alert.public_token,
                                },
                              }}
                            >
                              <h6 style={{ color: "#495057" }}>
                                <i className="bx bx-error"></i> {alert.name}
                              </h6>
                            </Link>
                            <div>
                              <UncontrolledDropdown>
                                <DropdownToggle
                                  href="#"
                                  className="card-drop"
                                  tag="i"
                                >
                                  <i className="bx bx-dots-horizontal-rounded font-size-18"></i>
                                </DropdownToggle>
                                <DropdownMenu right>
                                  <Link
                                    to={{
                                      pathname: "/alert-create",
                                      search: `?alert=${alert.pk}&folder=${folder.name === "root_folder" ? "Ch??a ?????t t??n" : folder.name}`,
                                      state: {},
                                    }}
                                  >
                                    <DropdownItem>
                                      <i className="bx bx-edit-alt font-size-16 mr-2"></i>
                                      Ch???nh s???a ch??? ?????
                                    </DropdownItem>
                                  </Link>
                                  <DropdownItem
                                    onClick={() =>
                                      this.openModal("alert", alert.pk)
                                    }
                                  >
                                    <i className="bx bx-trash font-size-16 mr-2"></i>
                                    X??a ch??? ?????
                                  </DropdownItem>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </div>
                          </div>

                          <div
                            className="d-flex flex-start align-items-center"
                            style={{ marginTop: 0 }}
                          >
                            <p
                              className="mr-2"
                              style={{
                                // color: "#666D7C",
                                color: "#495057",
                                // fontSize: "12px",
                                // fontWeight: "400",
                                // fontFamily: "SF Pro Text",
                                margin: 0,
                              }}
                            >
                              <small>
                                C?? {alert.num_of_new_noti} th??ng b??o m???i
                              </small>
                            </p>

                            <Badge
                              style={{
                                padding: "4px",
                                borderRadius: "19px",
                                backgroundColor: "rgba(19, 195, 131, 0.1)",
                              }}
                            >
                              <p
                                className="mb-0"
                                style={{
                                  color: "#13C383",
                                  // fontSize: "12px",
                                  // fontWeight: "700",
                                  // fontFamily: "SF Pro Text",
                                  margin: 0,
                                }}
                              >
                                +{alert.num_of_new_mention}
                              </p>
                            </Badge>
                          </div>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <>
                    <div
                      className="search-box chat-search-box border-top mx-2 mb-2"
                      style={{ borderRadius: "0.25rem" }}
                    >
                      <div
                        className="position-relative"
                        style={{ backgroundColor: "#EEEEEE" }}
                      >
                        <Input
                          type="text"
                          className="form-control"
                          placeholder="Th??m ch??? ?????"
                          style={{
                            backgroundColor: "#F8F8FB",
                            borderRadius: "0.25rem",
                          }}
                          onFocus={() => {
                            this.props.history.push("/alert-create");
                          }}
                        />
                        <i className="bx bx-plus search-icon"></i>
                      </div>
                    </div>
                    {folder.child_alerts.map((alert, key) => {
                      return (
                        
                        <>
                        <div
                          className={`px-3 py-3 border-top mx-2 mb-2 folder-${folder.pk
                            } ${key >= 3 ? "can-hide hide-alert" : "show-alert"}`}
                          style={{ backgroundColor: "#fff" }}
                          id={`folder-${folder.pk}_alert-${alert.pk}`}
                          key={`folder-${folder.pk}_alert-${alert.pk}`}
                        >
                          <div className="d-flex justify-content-between">
                            <Link
                              to={{
                                pathname: "/alert-detail",
                                search: `?displayKeyword=${alert.name}`,
                                state: {
                                  alertPk: alert.pk,
                                  publicToken: alert.public_token,
                                },
                              }}
                            >
                              <h6 style={{ color: "#495057" }}>
                                <i className="bx bx-error"></i> {alert.name}
                              </h6>
                            </Link>
                            <div>
                              <UncontrolledDropdown>
                                <DropdownToggle
                                  href="#"
                                  className="card-drop"
                                  tag="i"
                                >
                                  <i className="bx bx-dots-horizontal-rounded font-size-18"></i>
                                </DropdownToggle>
                                <DropdownMenu right>
                                  <Link
                                    to={{
                                      pathname: "/alert-create",
                                      search: `?alert=${alert.pk}&folder=${folder.name === "root_folder" ? "Ch??a ?????t t??n" : folder.name}`,
                                      state: {},
                                    }}
                                  >
                                    <DropdownItem>
                                      <i className="bx bx-edit-alt font-size-16 mr-2"></i>
                                      Ch???nh s???a ch??? ?????
                                    </DropdownItem>
                                  </Link>
                                  <DropdownItem
                                  // onClick={() =>
                                  //   this.props.export(alert.pk, alert.name)
                                  // }
                                  >
                                    
                                    <AlertExport pk={alert.pk} name={alert.name} type="pdf">
                                    <i className="bx bx-download font-size-16 mr-2"></i> T???i b??o c??o (PDF)
                                    </AlertExport>
                                  </DropdownItem>
                                  <DropdownItem
                                  >
                                    
                                    <AlertExport pk={alert.pk} name={alert.name} type="xlsx">
                                    <i className="bx bx-download font-size-16 mr-2"></i> T???i danh s??ch tin (EXCEL)
                                    </AlertExport>
                                  </DropdownItem>

                                  <DropdownItem
                                  >
                                    <span  onClick={() => this.props.getShareAlertLinks(alert)}>
                                    <i className="fas fa-share  font-size-13 mr-2" style={{paddingLeft:'0.15rem'}}></i> Chia s??? ch??? ?????
                                    </span>
                                  </DropdownItem>

                                  <DropdownItem
                                    onClick={() =>
                                      this.openModal("alert", alert.pk)
                                    }
                                  >
                                    <i className="bx bx-trash font-size-16 mr-2"></i>
                                    X??a ch??? ?????
                                  </DropdownItem>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </div>
                          </div>

                          <div
                            className="d-flex flex-start align-items-center"
                            style={{ marginTop: 0 }}
                          >
                            <p
                              className="mr-2"
                              style={{
                                // color: "#666D7C",
                                color: "#495057",
                                // fontSize: "12px",
                                // fontWeight: "400",
                                // fontFamily: "SF Pro Text",
                                margin: 0,
                              }}
                            >
                              <small>
                                C?? {alert.num_of_new_noti} th??ng b??o m???i
                              </small>
                            </p>

                            <Badge
                              style={{
                                padding: "4px",
                                borderRadius: "19px",
                                backgroundColor: "rgba(19, 195, 131, 0.1)",
                              }}
                            >
                              <p
                                className="mb-0"
                                style={{
                                  color: "#13C383",
                                  // fontSize: "12px",
                                  // fontWeight: "700",
                                  // fontFamily: "SF Pro Text",
                                  margin: 0,
                                }}
                              >
                                +{alert.num_of_new_mention}
                              </p>
                            </Badge>
                          </div>
                        </div>
                        </>
                      );
                    })}
                  </>
                ))}
                {(window.innerWidth < 992 ? (
                  <>
                  </>
                ) : (
                  <>
                    {folder.child_alerts.length >= 3 && (
                      <>
                        <div
                          className={`px-2 py-3 border-top folder-${folder.pk}-down show-alert`}
                        >
                          <div
                            className={`d-flex flex-start align-items-center justify-content-center show-more-item`}
                            style={{ marginTop: 0, cursor: "pointer" }}
                            onClick={() => this.showMore(folder.pk)}
                          >
                            <p
                              style={{
                                color: "#495057",

                                margin: 0,
                              }}
                            >
                              <i className={`bx bx-chevron-down`}></i> Hi???n t???t c???
                            </p>
                          </div>
                        </div>

                        <div
                          className={`px-2 py-3 border-top folder-${folder.pk}-up hide-alert`}
                        >
                          <div
                            className={`d-flex flex-start align-items-center justify-content-center show-more-item`}
                            style={{ marginTop: 0, cursor: "pointer" }}
                            onClick={() => this.showLess(folder.pk)}
                          >
                            <p
                              style={{
                                color: "#495057",

                                margin: 0,
                              }}
                            >
                              <i className={`bx bx-chevron-up`}></i> Thu g???n
                            </p>
                          </div>
                        </div>
                      </>
                    )}
                  </>
                ))}

              </Card>
              <Modal
                isOpen={this.state.delModalOpend}
                toggle={() => {
                  this.setState({ delModalOpend: false });
                }}
              >
                <div className="modal-header">
                  <button
                    type="button"
                    onClick={() => this.setState({ delModalOpend: false })}
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  {this.state.delType === "folder" && (
                    <h5>Nh??m c???nh ch??? ????? n??y s??? b??? x??a ?</h5>
                  )}
                  {this.state.delType === "alert" && (
                    <h5>ch??? ????? n??y s??? b??? x??a ?</h5>
                  )}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    onClick={() => this.setState({ delModalOpend: false })}
                    className="btn btn-secondary waves-effect"
                    data-dismiss="modal"
                  >
                    H???y
                  </button>
                  <button
                    onClick={() => {
                      if (this.state.delType === "alert") {
                        this.props.deleteAlert(this.state.delPk);
                        this.setState({
                          delModalOpend: false,
                          delType: "",
                          delPk: null,
                        });
                      }
                      if (this.state.delType === "folder") {
                        this.props.deleteFolder(this.state.delPk);
                        this.setState({
                          delModalOpend: false,
                          delType: "",
                          delPk: null,
                        });
                      }
                    }}
                    type="button"
                    className="btn btn-primary waves-effect waves-light"
                  >
                    ?????ng ??
                  </button>
                </div>
              </Modal>
            </Col>
          ))
        }
      </React.Fragment>
    );
  }
}

export default withRouter(CardProject);
