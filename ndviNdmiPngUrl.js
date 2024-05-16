var roi = ee.FeatureCollection("projects/ee-learning-rahi/assets/BGD_adm3");
var upzla = roi.filter(ee.Filter.eq("NAME_3", "Maulvibazar S."))
Map.centerObject(upzla,10)
Map.addLayer(upzla,{},"Maulvibazar S.")

var s2 = ee.ImageCollection('LANDSAT/LC09/C02/T1_L2')
          .filterBounds(upzla)
          .filterDate('2023-01-01', '2023-12-31')
          .filter(ee.Filter.lt("CLOUD_COVER",10))
print(s2)
function calNDMI(image){
  var ndmi = image.normalizedDifference(["SR_B6","SR_B5"]).rename("NDMI")
  return ndmi
}
var ndmiCollection = s2.map(calNDMI)
print(ndmiCollection)

var ndmi2 = ndmiCollection.median()
var vizParam = {
  min: -1,
  max: 1,
  palette: ["blue","cyan","lime","yellow","green",]
}
Map.addLayer(ndmi2.clip(upzla),vizParam,"NDMI")
var ndmiPng = ndmi2.clip(upzla).getThumbURL({
  palette: ["blue","cyan","lime","yellow","green"],
  region: upzla.geometry(), 
  scale: 30, 
  format: 'png'
})
print(ndmiPng)

function calNDVI(image){
  var ndvi = image.normalizedDifference(["SR_B5","SR_B4"]).rename("NDVI")
  return ndvi
}
var ndviCollection = s2.map(calNDVI)
print(ndviCollection)
/*var ndvi = s2.normalizedDifference(["SR_B5","SR_B4"]).rename("NDVI")
print("NDVI", ndvi)*/
var ndvi2 = ndviCollection.median()
var vizParam = {
  min: -1,
  max: 1,
  palette: ["blue","cyan","lime","yellow","green",]
}
Map.addLayer(ndvi2.clip(upzla),vizParam,"NDVI")
var ndviPng = ndvi2.clip(upzla).getThumbURL({
  palette: ["blue","cyan","lime","yellow","green"],
  region: upzla.geometry(), 
  scale: 30, 
  format: 'png'
})
print(ndviPng)