

function formatoFecha(fecha)
{
    const today = new Date(fecha);
    console.log("today", today)
    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear();

    return `${year}-${month}-${day}`

}