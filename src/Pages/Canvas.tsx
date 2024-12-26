import  { useState, useEffect } from 'react';
import './hstyle.css'
import AnimatedDev from '../components/reusableComponents/animatedDev/AnimatedDev';

function LocationTracker() {
  const [location, setLocation] = useState<Location>({ lat: null, lng: null });
  const [error, setError] = useState<string | null>(null);
const [open, setOpen] = useState(false)
  useEffect(() => {
    function notifyMe() {
      if (!("Notification" in window)) {
        // Check if the browser supports notifications
        alert("This browser does not support desktop notification");
      } else if (Notification.permission === "granted") {
        // Check whether notification permissions have already been granted;
        // if so, create a notification
         new Notification("Hi there!");
        // …
      } else if (Notification.permission !== "denied") {
        // We need to ask the user for permission
        Notification.requestPermission().then((permission) => {
          // If the user accepts, let's create a notification
          if (permission === "granted") {
             new Notification("Hi there!");
            // …
          }
        });
      }
    
      // At last, if the user has denied notifications, and you
      // want to be respectful there is no need to bother them anymore.
    }
    // notifyMe()
  }, []);

  return (
    <>
    <AnimatedDev open={open}>
    <button onClick={()=> setOpen(!open)} >open</button>
    </AnimatedDev>

    <button className=' text-center w-[100px]' onClick={()=> setOpen(!open)} >open</button>
    </>
  );
}

export default LocationTracker;
