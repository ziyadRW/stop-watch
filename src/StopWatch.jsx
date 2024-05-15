import React ,{useState, useEffect, useRef} from 'react'
import './App.css'
const StopWatch = () => {

  const [isRunning, setIsRunning]= useState(false);
  const [elapsedTime, setElapsedTime]= useState(0);
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(Date.now());
  
  useEffect( ()=>{

    if(isRunning){
      intervalIdRef.current=setInterval(()=>{
        setElapsedTime(Date.now()-startTimeRef.current);
      },10)
    }
    return()=>{
      clearInterval(intervalIdRef.current);
    }
     
  } ,[isRunning]);

  const start = ()=>{
    setIsRunning(true);
    startTimeRef.current= Date.now()-elapsedTime;
  }

  const stop = ()=>{ 
    setIsRunning(false);
  }

  const reset = ()=>{
    setElapsedTime(0);
    setIsRunning(false);
  }

  const formatTime=()=>{
    let hours=Math.floor((elapsedTime/(1000*60*60)));
    let minutes=Math.floor((elapsedTime/(1000*60)) %60);
    let seconds=Math.floor((elapsedTime/1000)%60);
    let milleseconds=Math.floor((elapsedTime%1000)/10);

    hours=String(hours).padStart(2, "0");
    minutes=String(minutes).padStart(2, "0");
    seconds=String(seconds).padStart(2, "0");
    milleseconds=String(milleseconds).padStart(2, "0");

    
      if(hours==='00'){
        return `${minutes}:${seconds}:${milleseconds}`
      }
      else{
        return `${hours}:${minutes}:${seconds}`
      }
  }
  return (
    <div className='stopWatch'>
      <div className="display">
        {formatTime()}
      </div>
      <div className='controles'>
          <button onClick={start} className="button-Start">Start</button>
          <button onClick={stop} className="button-Stop">Stop</button>
          <button onClick={reset} className="button-Reset">Reset</button>     
      </div>
    </div>
  )
}

export default StopWatch