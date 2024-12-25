export const formatDateToString = (date: Date | null) => {
    if (date) {


      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;
      return formattedDate


    }
  };

  export const formatDateTime = (date: Date | null) => {
    console.log(date)
    if(date){
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day  = date.getDate()

      let hours = date.getHours()
      const minutes = date.getMinutes()
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours= hours ? hours : 12; 
      
      return `${year}-${month}-${day} ${hours}:${minutes}${ampm}`
    }
  }