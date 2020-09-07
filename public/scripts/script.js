let covidData = [];
let displayData = [];

document.querySelector('#buttonMe').addEventListener('click', () => {
    fetch(`/getVirus`)
    .then((response) => response.json())
    .then((data) => {
  
        covidData = data.data;
        displayData = covidData.filter(data => data["Province"] === 'Ontario');
        
        const n1 = (displayData[displayData.length-1].Cases - displayData[displayData.length-2].Cases)

        const Displaydate = moment(displayData.Date).format("YYYY-MM-DD")
 
        console.log(Displaydate + ' Count is : ' + n1)       
        console.log(Displaydate)
    })      
});

