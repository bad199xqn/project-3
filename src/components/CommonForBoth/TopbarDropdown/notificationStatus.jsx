import { indexOf } from 'lodash';
import React,{useEffect} from 'react'
import { Link,useHistory} from 'react-router-dom'
import * as ultils from '../../../utils/post';
const NotificationStatus = (props) => {
  // console.table(props)
  // console.log('login',props.login)
 // dùng history khi thay đổi url thì render lại thông báo
    const history = useHistory();
    useEffect(() => {

    }, [history])
    return (
        <>
          <Link 
          key={props.notification.pk}
            onClick={()=>props.notificationStatus(props.notification)}
            to={{
            pathname: "/alert-detail",
            search: `?displayKeyword=${props.notification.alert_name}`,
            state: {
                alertPk: props.notification.alert,
                publicToken: null
                }
              }}
            className="text-reset notification-item">
            <div className="media bg-light">
              <div className="media-body">
                <h6 className="mt-0 mb-1">{`"${props.notification.alert_name} " có ${props.notification.count} bài viết mới`}</h6>
                <div className="font-size-12 text-muted">
                  <p className="mb-1">Có {props.notification.count} đề cập mới từ {props.soures}</p>
                  <p className="mb-0"><i className="mdi mr-1 mdi-clock-outline"></i>{ultils.publishDate(props.notification.date)}</p>
                </div>
              </div>
            </div>
          </Link>
        </>
    )
}

export default NotificationStatus
