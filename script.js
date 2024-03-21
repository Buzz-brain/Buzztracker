let openMenu = document.getElementById("openMenu");
let menuOverlay = document.getElementsByClassName("menuOverlay")[0];
let remove = document.getElementsByClassName("remove")[0];

openMenu.addEventListener("click", function () {
  menuOverlay.style.transform = "translate(0%)";
  openMenu.src = "menuSwitch.png"
});
remove.addEventListener("click", function () {
  menuOverlay.style.transform = "translate(-100%)";
  openMenu.src = "menu.png"
});


const checkError = (error) => {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      locationDiv.innerText = "Please allow access to location";
      break;
    case error.POSITION_UNAVAILABLE:
      locationDiv.innerText = "Location Information unavailable";
      locationMap.innerText = "Unable to get map location"
      break;
    case error.TIMEOUT:
      locationDiv.innerText = "The request to get user location timed out";
      break;
  }
};


const showLocation = async (position) => {
  var locationForm = document.locationForm
  let response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
  );
  let data = await response.json();
  locationDiv.innerText = `${data.display_name}`;
  locationMap.innerText = ""
  locationMap.style.border = "none" 

  console.log(position.coords.latitude);
  console.log(position.coords.longitude);

  let map = document.createElement("iframe");
  map.style.width = "100%"
  map.style.height = "100%"
  map.src =
    "https://maps.google.com/maps?q=" +
    position.coords.latitude +
    "," +
    position.coords.longitude +
    "&output=embed";
  locationMap.append(map);
};



window.onload = function () {
  let locationDiv = document.getElementById("locationDiv");
  let locationMap = document.getElementById("locationMap");

  locationDiv.innerText = "Getting Location...";
  locationMap.innerText = "Getting Map Location...";

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showLocation, checkError);
  } else {
    locationDiv.innerText = "The browser does not support geolocation";
  }

};
