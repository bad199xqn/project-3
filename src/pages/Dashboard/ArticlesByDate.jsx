import React, { Component } from 'react';
import { Container, Row, Col } from "reactstrap";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import NewArticleTable from "./NewArticleTable";
import moment from "moment";


//Import Breadcrumb


class ArticlesByDate extends Component {
    state = {
        keywordDetailsParams: {
            keyword: '',
            duration: "days",
            page: 1,
            range_filter: 0,
            start_date: "",
            interval: 1,
            sentimentality_filter: "1,2,3"
          },
    }

    componentDidMount() {
        if((this.state.keywordDetailsParams.start_date !== this.props.location.state.start_date) || (this.state.keywordDetailsParams.sentimentality_filter !== this.props.location.state.sentimentality_filter)) {
            this.setState({
                keywordDetailsParams: {
                    ...this.state.keywordDetailsParams,
                    start_date: this.props.location.state.start_date,
                    sentimentality_filter: this.props.location.state.sentimentality_filter,
                    interval: this.props.location.state.interval,
                    page: 1
                }
            }, () => this.props.keywordDetailsRequest(this.state.keywordDetailsParams))
        }

    }

    articlePaginationHandle = (page) => {
        this.setState(
            {
                keywordDetailsParams: {
                    ...this.state.keywordDetailsParams,
                    page: page
                },
            },
            () => this.props.keywordDetailsRequest(this.state.keywordDetailsParams)
          );
    }
    render() {
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>

                    <Row>
              <Col xs="12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0">Tin tức trong ngày</h4>
                </div>
              </Col>
            </Row>
            {(this.props.keywordDetails === null) &&
            <NewArticleTable
            // tableTitle={`Tin trong ngày ${moment(this.props.keywordDetails.results[1].publish_date).format('DD-MM-YYYY')}`}
              isLoading={true}
              list={[]}
              page={1}
              paginationClick={this.articlePaginationHandle}
            />
    }
            {(this.props.keywordDetails !== null) &&
            <NewArticleTable
            tableTitle={`Tin trong ngày ${moment(this.props.keywordDetails.results[1].publish_date).format('DD-MM-YYYY')}`}
              isLoading={this.props.keywordDetailsLoading}
              list={this.props.keywordDetails.results}
              page={this.state.keywordDetailsParams.page}
              paginationClick={this.articlePaginationHandle}
            />
    }
                    </Container>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      keywordDetails: state.KeywordDetails.keywordDetailsData,
      keywordDetailsLoading: state.KeywordDetails.loading,
      statisticsLoading: state.SearchingStatistics.loading,
      login: state.Login,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      keywordDetailsRequest: (keywordDetailsParams) => {
        dispatch({
          type: "KEYWORD_DETAILS_REQUEST",
          payload: keywordDetailsParams,
        });
      },
    };
  };

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(ArticlesByDate));