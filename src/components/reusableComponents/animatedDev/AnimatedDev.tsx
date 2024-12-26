import { ReactNode, useEffect, useState } from "react";
import './animated.css';

const AnimatedDev = ({ open, children}: { open: boolean, children: ReactNode }) => {
  const [isInDom, setIsInDom] = useState('hidden');

  if(open && isInDom === "hidden"){
    setIsInDom('flex')
  }
    
    useEffect(() => {
        
        let timeoutId: NodeJS.Timeout;

    if (!open && isInDom === "flex") {
      timeoutId = setTimeout(() => {
        setIsInDom("hidden");
       
      }, 500);
    } 

    return () => {
      clearTimeout(timeoutId);
    };
 
  }, [open]);
 
  return (
    <div className={`${open ? 'show flex-col ps-9 py-4 mb-[20px]' : 'close flex-col'} ${isInDom}  `}>
      {children}
    </div>
  );
};

export default AnimatedDev;