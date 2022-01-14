import React from 'react';
import { useRecoilState, useSetRecoilState } from "recoil";
import { pendingListState } from '../../recoil/atom-export';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {api_v1} from '../../services/api';


const SearchExport = (props) => {
    const key = useSelector(state => state.Login.userKey ? state.Login.userKey.key : '')
    const setNewExport = useSetRecoilState(pendingListState)
    
    const startExport = (keyword) => {
        const fileName = keyword + ".xlsx";
        var data = JSON.stringify({
            "keyword": keyword,
          });
          
          var config = {
            method: 'post',
            url: `${api_v1}/export_search_results/?format=json`,
            headers: { 
              'Authorization': `Token ${key}`, 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios(config)
          .then( (response) => {
            const data = response.data;
            setNewExport({id: data.task_id, name: fileName, action:'add', type:'search'})
          })
          .catch(function (error) {
            console.log(error);
          });
       
  
        
    }
    return (
        <>
            <div onClick={() => startExport(props.keyword)}>
                {props.children}
            </div>
        </>
    )
}

export default SearchExport;