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

//NEW FUNCTION TO REWRITE


document.querySelector('#buttonMe').addEventListener('click', () => {
    window.scrollTo({
        top: 500,
        left: 100,
        behavior: 'smooth'
      });
    var el = document.querySelector('#loading');
    el.style.display = 'inline-block';
    navigator.geolocation.getCurrentPosition((position) => {
        //store those lat and long in here
        let lat = position.coords.latitude
        let long = position.coords.longitude

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
            let provFound = data.data.address.state

            fetch(`/getVirus`)
            .then((response) => response.json())
            .then((data) => {
                covidData = data.data;
                displayData = covidData.filter(data => data["Province"] === provFound);
                console.log(displayData)
                let n1 = (displayData[displayData.length-1].Cases - displayData[displayData.length-2].Cases)
                    let Displaydate = moment(displayData.Date).format("YYYY-MM-DD")        
       
                    let output = 'On ' + Displaydate + ' there were ' + n1 + ' new cases '+' in ' + provFound  
                    document.querySelector('#displayStats').innerHTML=output
                    
            })
            
        })
            
    })


})

