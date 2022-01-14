import React, { Component, useEffect, useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import moment from "moment";

function DoughnutChart(props) {
    const [options, setOptions] = useState(
        {
            toolbox: {
                show: false,
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                data: ['Tích cực', 'Trung tính', 'Tiêu cực'],
                textStyle: {
                    color: ['#74788d']
                }
            },
            color: ["#19CE8C", "#8692A3", "#FF4A5E"],
            series: [
                {
                    name: 'Tổng giá trị',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: [
                        { value: 33, name: 'Tích cực' },
                        { value: 33, name: 'Trung tính' },
                        { value: 33, name: 'Tiêu cực' },
                    ]
                }
            ]
        }
    );

        useEffect(() => {
            setOptions(
                {
                    backgroundColor: "#fff",
                    toolbox: {
                        show: false,
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        // orient: 'vertical',
                        // x: 'left',
                        top: '0%',
                        data: ['Tích cực', 'Trung tính', 'Tiêu cực'],
                        textStyle: {
                            color: ['#74788d']
                        },
                        
                    },
                    color: ["#19CE8C", "#8692A3", "#FF4A5E"],
                    series: [
                        {
                            name: 'Tổng giá trị',
                            type: 'pie',
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '30',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: [
                                { value: props.data.pos, name: 'Tích cực' },
                                { value: props.data.neu, name: 'Trung tính' },
                                { value: props.data.neg, name: 'Tiêu cực' },
                            ]
                        }
                    ]
                }
            )
        }, [props.data])

        const onChartClick = (event) => {
            let d = new Date();
            d.setDate(d.getDate()-props.interval);
            const start_date = moment(d).format('DD-MM-YY')
            switch (event.data.name) {
                case "Tích cực":
                    props.onChartClick(start_date, "1", props.interval)
                    break;
                    case "Tiêu cực":
                        props.onChartClick(start_date, "2", props.interval)
                        break;
                        case "Trung tính":
                            props.onChartClick(start_date, "3,4", props.interval)
                            break;
            
                default:
                    break;
            }
        }

        let onEvents={
            'click': onChartClick
        }
        

        return (
            <React.Fragment>
                <ReactEcharts style={{ height: "287px" }} option={options} onEvents={onEvents}/>
            </React.Fragment>
        );
}
export default React.memo(DoughnutChart) ;