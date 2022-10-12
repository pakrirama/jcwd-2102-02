import 'antd/dist/antd.css';
import { DatePicker } from 'antd';
import React , { useState } from "react";
import moment from 'moment';
// import { sortOptions } from '../../../lib/options';
import { useDispatch,useSelector  } from "react-redux";
import { Button } from '@chakra-ui/react';

const { RangePicker } = DatePicker;


function App() {
  const dispatch = useDispatch();

  const filter = useSelector((state) => state.filterReducer);
  const [state, setState] = useState();
  console.log(state)

  

  return (
    <div style={{ margin: 20 }}>
      < RangePicker
      value={state}
       
     

      onChange = {(v) => {
        dispatch({
          type: 'SET_FILTER',
          payload: {
            ...filter,
            ...v,
            dateFrom: value,
                dateTo: value,
            banner: false,
          },
        });
        console.log(filter);
      }}
        
       

      />
      <Button 
      onClick={() => {
            dispatch({
              type: "SET_FILTER",
              payload: {
                ...filter,
                dateFrom: state,
                dateTo: state,
                filter: state,
                banner: false,
                offset: 0,
              },
            });
            setState("");
            console.log("sadasdasdasdasdasdas");
            console.log(state);
            console.log(filter);
          }}>
        sds
      </Button>
    </div>
  );
}

export default App;