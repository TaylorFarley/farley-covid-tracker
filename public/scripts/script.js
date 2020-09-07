let covidData = [];
let displayData = [];

document.querySelector('#buttonMe').addEventListener('click', () => {
    fetch(`/getVirus`)
    .then((response) => response.json())
    .then((data) => {
        const x = data.data.length
        covidData = data.data;
        displayData = covidData.filter(data => data["Province"] === 'Ontario');
        
        const n1 = (displayData[displayData.length-1].Cases - displayData[displayData.length-2].Cases)
        // console.log(displayData[displayData.length-1].Cases)
        // console.log(n1)
        
        console.log(displayData[displayData.length-1].Date + ' Count is : ' + n1)       
    })      
});

