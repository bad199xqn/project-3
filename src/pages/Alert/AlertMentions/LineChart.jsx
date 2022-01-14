import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import {connect} from "react-redux";

class LineChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            markLine_xAxis: []
        }
    }
    getOption = (pos, neg, total, pos_count, neg_count, total_count, xaxis) => {
        const legend_data = [{name: 'Tích cực', value: pos_count}, {name: 'Tiêu cực', value: neg_count}, {name: 'Tổng số tin', value: total_count}, ]
        return {

            title: {
                text: this.props.keyword
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['Tích cực', 'Tiêu cực', 'Tổng số tin'],
                // orient: 'vertical',
                bottom: 0,
                formatter: (name) => {
                    let itemValue = legend_data.filter(item => item.name === name)
                    return `${name}: ${itemValue[0].value}`
                }
            },
           grid: {
                zlevel: 0,
                x: 50,
                x2: 50,
                y: 30,
                y2: 30,
                bottom: '60px',
                borderWidth: 0,
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: xaxis,
                axisLable: {
                    color: "#ffffff"
                },
                axisLine: {
                    lineStyle: {
                        color: "#74788d"
                    }
                }
            },
            yAxis: {
                type: 'value',
                axisLable: {
                    color: "#ffffff"
                },
                axisLine: {
                    lineStyle: {
                        color: "#fff"
                    }
                }
            },
            series: [
                {
                    name: 'Tích cực',
                    type: 'line',
                    stack: '',
                    data: pos,
                    symbolSize: 10,
                },
                {
                    name: 'Tiêu cực',
                    type: 'line',
                    stack: '',
                    data: neg,
                    symbolSize: 10,
                },
       
                {
                    name: 'Tổng số tin',
                    type: 'line',
                    stack: '',
                    data: total,
                    symbolSize: 10,
                    markLine: {
                        data: [...this.state.markLine_xAxis],
                        symbol:['none', 'none'],
                        itemStyle: {
                            normal: {
     
                                label: {
                                show: false,
                                    textStyle: {
                                        fontSize: 10,
                                        fontWeight: "bolder",
                                    },
                                }
                            },
                        },
                   }
                },
            ],
            color: ['#19CE8C','#FF4A5E', '#3E64FF'],
            textStyle: {
                color: ['#74788d']
            }
            
        };
    };
    componentDidMount() {
 
    }

    onChartClick = (param,echarts) => {
        // console.log(param)
        if (this.state.markLine_xAxis[0] !== undefined) {
            if (param.dataIndex !== this.state.markLine_xAxis[0].xAxis) {
                this.setState({
                    markLine_xAxis: [{xAxis: param.dataIndex}]
                },
                () => this.props.onChartClick(param.name)
                )
            }
            else {
                this.setState({
                    markLine_xAxis: []
                },
                () => this.props.onChartClick('')
                )
            }
        }
        else {
            this.setState({
                markLine_xAxis: [{xAxis: param.dataIndex}]
            },
            () => this.props.onChartClick(param.name)
            )
        }

    }
    render() {
        let onEvents={
            'click': this.onChartClick
        }
        let pos_data = [];
        let neg_data = [];
  
        let total_data = [];
        let categories_x = [];

        const alertMentionsData= this.props.alertMentionsStatistics;

        if(this.props.alertMentionsStatistics) {
            this.props.alertMentionsStatistics.positive_series.map((sen) => {
                pos_data=[...pos_data, sen.count]
            });
    
            this.props.alertMentionsStatistics.negative_series.map((sen) => {
                neg_data=[...neg_data, sen.count]
            });
    
    
            this.props.alertMentionsStatistics.total_series.map((sen) => {
                total_data=[...total_data, sen.count];
                categories_x=[...categories_x, sen.group_date];
            });
    

        }
        return (
            <React.Fragment>
              <ReactEcharts style={{ height: "350px" }} option={this.getOption(pos_data,neg_data,total_data, alertMentionsData.positive_count, alertMentionsData.negative_count, alertMentionsData.total_count, categories_x)} 
                onEvents={onEvents}
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      alertMentionsStatistics: state.AlertMentionsStatistics.alertMentionsStatisticsData,
    };
  };

export default connect(mapStateToProps, null)(LineChart);