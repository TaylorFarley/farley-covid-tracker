let covidData = [];
let displayData = [];






const selectElement = document.querySelector('#selectProv');

selectElement.addEventListener('change', (event) => {
  const selectedProv = event.target.value
  console.log(selectedProv)
  fetch(`/getVirus`)
    .then((response) => response.json())
    .then((data) => {
        covidData = data.data;
        displayData = covidData.filter(data => data["Province"] === selectedProv);
          
         
                    let n1 = (displayData[displayData.length-1].Cases - displayData[displayData.length-2].Cases)
                    let Displaydate = moment(displayData.Date).format("YYYY-MM-DD")        
                    let output = 'On ' + Displaydate + ' there were ' + n1 + ' new cases '+' in ' + selectedProv 
                    document.querySelector('#displayStats').innerHTML=output                         
                    window.scrollTo({
                        top: 500,
                        left: 100,
                        behavior: 'smooth'
                      });
       
                })
        })
              
 
  












//location services

document.querySelector('#buttonMe').addEventListener('click', () => {
    fetch(`/getVirus`)
    .then((response) => response.json())
    .then((data) => {
        covidData = data.data;
        displayData = covidData.filter(data => data["Province"] === 'Ontario');
        //geolocation
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
          } else { 
            document.querySelector('#displayStats').innerHTML="Geolocation is not supported by this browser."
          
          }
          function showPosition(position) {
           console.log(position.coords.latitude)
           
                fetch('/reverseGeocode', {
                    method: 'post',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                    long: position.coords.longitude,
                    lat: position.coords.latitude
                    })
                }).then((response) => response.json())
                .then((data) => {
                    console.log(data.data.address.state)
                    let n1 = (displayData[displayData.length-1].Cases - displayData[displayData.length-2].Cases)
                    let Displaydate = moment(displayData.Date).format("YYYY-MM-DD")        
       
                    let output = 'On ' + Displaydate + ' there were ' + n1 + ' new cases '+' in ' + data.data.address.state  
                    document.querySelector('#displayStats').innerHTML=output
                    window.scrollTo({
                        top: 500,
                        left: 100,
                        behavior: 'smooth'
                      });
       
       
       
                })
        }
              
 
    })      
});

