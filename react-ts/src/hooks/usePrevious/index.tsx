import React,{useEffect,useRef} from 'react'

const  usePrevious=(value) =>{
    const ref = useRef(0);
        useEffect(() => {
        ref.current = value;
        });
    return ref.current;
  }
export default usePrevious