// const api_url = "https://api.covidtracking.com/v1/states/info.json" 

mapboxgl.accessToken = 'pk.eyJ1IjoiY2hpcmF5dTE0MzQiLCJhIjoiY2wwMmNya2NqMHJqbjNicWc5bWkzeWJuaCJ9.Uz7yuYWyUpMz_5YYVZbRDg';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  zoom :4
});
function updateMap(){
    fetch(`data.json`, {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
  
      })
  
    .then(responce => responce.json())
    .then(rsp => {
        console.log(rsp.data)
        rsp.data.forEach(element => {
            latitude = element.latitude
            longitude = element.longitude
            cases = element.infected;
            if(cases > 255){
                color = "red"
            }
            else{
                color = `rgb(${cases},100,0)`;
            }

            //Mark on Map
            new mapboxgl.Marker({
                draggable: false,
                color: color
                })
                .setLngLat([longitude, latitude])
                .addTo(map);
        });
    })
}
updateMap()
const layerList = document.getElementById('menu');
const inputs = layerList.getElementsByTagName('input');
 
for (const input of inputs) {
input.onclick = (layer) => {
const layerId = layer.target.id;
map.setStyle('mapbox://styles/mapbox/' + layerId);
};
}