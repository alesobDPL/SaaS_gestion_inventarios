
//Format date to dd-mm-yyyy - hh:mm
export const formatDate = (isoString: string)=>{
    const date = new Date(isoString);
    return date.toLocaleDateString("es-CL", {
        year:"2-digit",
        month: "2-digit",
        day: "2-digit",
      /*   hour:"2-digit",
        minute:"2-digit" * 
        if you need activate once again this time of date*/

    })
}