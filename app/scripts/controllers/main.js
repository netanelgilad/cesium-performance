define(['angular', '../../bower_components/Cesium/Cesium'], function (angular, myces) {
  'use strict';

  angular.module('cesiumPerformanceApp.controllers.MainCtrl', [])
    .controller('MainCtrl', function ($scope) {
      $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];

      var viewer = new Cesium.CesiumWidget('cesiumContainer', {
          sceneMode : Cesium.SceneMode.SCENE2D,
          baseLayerPicker : false,
          imageryProvider : new Cesium.TileMapServiceImageryProvider({
              url : 'tiles/'
          })
      });

//          var baseCZML = {
//              "id" : "Vehicle",
//              "billboard" : {
//                  "eyeOffset" : {
//                      "cartesian" : [0.0, 0.0, 0.0]
//                  },
//                  "horizontalOrigin" : "CENTER",
//                  "image" : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEISURBVEhLvVXBDYQwDOuojHKj8LhBbpTbpBCEkZsmIVTXq1RVQGrHiWlLmTTqPiZBlyLgy/KSZQ5JSHDQ/mCYCsC8106kDU0AdwRnvYZArWRcAl0dcYJq1hWCb3hBrumbDAVMwAC82WoRvgMnVMDBnB0nYZFTbE6BBvdUGqVqCbjBIk3PyFFR/NU7EKzru+qZsau3ryPwwCRLKYOzutZuCL6fUmWeJGzNzL/RxAMrUmASSCkkAayk2IxPlwhAAYGpsiHQjbLccfdOY5gKkCXAMi7SscAwbQpAnKyctWyUZ6z8ja3OGMepwD8asz+9FnSvbhU8uVOHFIwQsI3/p0CfhuqCSQuxLqsN6mu8SS+N42MAAAAASUVORK5CYII=",
//                  "pixelOffset" : {
//                      "cartesian2" : [0.0, 0.0]
//                  },
//                  "scale" : 0.8333333333333334,
//                  "show" : [{
//
//                      "boolean" : true
//                  }],
//                  "verticalOrigin" : "BOTTOM"
//              },
//              "label" : {
//                  "fillColor" : [{
//
//                      "rgba" : [255, 255, 0, 255]
//                  }],
//                  "font" : "bold 10pt Segoe UI Semibold",
//                  "horizontalOrigin" : "LEFT",
//                  "outlineColor" : {
//                      "rgba" : [0, 0, 0, 255]
//                  },
//                  "pixelOffset" : {
//                      "cartesian2" : [10.0, 0.0]
//                  },
//                  "scale" : 1.0,
//                  "show" : [{
//
//                      "boolean" : true
//                  }],
//                  "style" : "FILL",
//                  "text" : "Vehicle",
//                  "verticalOrigin" : "CENTER"
//              },
//              "position" : {
//                  //"interpolationAlgorithm" : "LAGRANGE",
//                  //"interpolationDegree" : 1,
//                  //"epoch" : currentTime,
//                  // Trimmed to just 2 points
//                  "cartographicDegrees" : [34, 31, 0]
//              }
//          };
//
//      function BuildCZML(count) {
//          var czml = [];
//          for (var i = 0; i < count; i++) {
//            var newCZML = angular.copy(baseCZML);
//              newCZML.id = "asdas" + i;
//            newCZML.position.cartographicDegrees[0] = -120 + Math.random() * 240;
//            newCZML.position.cartographicDegrees[1] = -70 + Math.random() * 140;
//            czml.push(newCZML);
//          }
//
//          return czml;
//      }
//
//      var czmlDataSource = new Cesium.CzmlDataSource();
//      viewer.dataSources.add(czmlDataSource);
//
//      var czml = BuildCZML(5000);
//      czmlDataSource.process(czml);
//
//
//      setInterval(function() {
//          var stime = new Date();
//        czml.forEach(function(value) {
//            value.position.cartographicDegrees[0] += 0.1;
//            value.position.cartographicDegrees[1] += 0.1;
//            czmlDataSource.process(value, "position", czml);
//        });
//          //console.log("for: " + (new Date() - stime));
//          //stime = new Date();
//
//          console.log("process: " + (new Date() - stime));
//      }, 1000);

//          var billboards = new Cesium.BillboardCollection();
//          var img = new Image();
//          img.onload = function() {
//              var images = [img];
//              var atlas = new Cesium.TextureAtlas({
//                  scene : viewer.scene,
//                  image : img
//              });
//              billboards.textureAtlas = atlas;
//
//              billboards.add({
//                  show : true,
//                  position : Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
//                  pixelOffset : Cesium.Cartesian2.ZERO,
//                  eyeOffset : Cesium.Cartesian3.ZERO,
//                  horizontalOrigin : Cesium.HorizontalOrigin.CENTER,
//                  verticalOrigin : Cesium.VerticalOrigin.CENTER,
//                  scale : 1.0,
//                  imageIndex : 0,
//                  color : Cesium.Color.WHITE,
//                  id : undefined
//              });
//          };
//          img.src = '/cesium-performance/app/images/satellite.png';


          var billboards = new Cesium.BillboardCollection();
          var billarray = [];
          var firstBil;

          var labels = new Cesium.LabelCollection();
          var lblArray = [];

          function addBillboard(scene) {
              var image = new Image();
              image.onload = function() {

                  var textureAtlas = new Cesium.TextureAtlas({
                      scene : scene,
                      image : image
                  });
                  billboards.textureAtlas = textureAtlas;

                  firstBil = billboards.add({
                      position : Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
                      imageIndex : 0
                  });
                  billarray.push(firstBil);
                 scene.primitives.add(billboards);
              };
              image.src = '/cesium-performance/app/images/satellite.png';
          }

          addBillboard(viewer.scene);

          var texts = [
              'sadfsfds',
              'xczxcxcc',
              'werwerew'
          ];

          var currText = 0;
          function nextText() {
              if (currText == texts.length) {
                  currText = 0;
              }

              return texts[currText++];
          }

          for (var i = 0; i < 5000; i++) {
              var pos = Cesium.Cartesian3.fromDegrees(-120 + Math.random() * 240,-70 + Math.random() * 140);
            billarray.push(billboards.add({
               position : pos ,
               imageIndex : 0
            }));

              lblArray.push(labels.add({
                  position : pos,
                  text : nextText(),
                  scale : 0.5
              }));
          };

          viewer.scene.primitives.add(labels);


      setInterval(function() {

          for (var i = 0; i < 5000; i++) {
              var carto = viewer.scene.globe.ellipsoid.cartesianToCartographic(billboards.get(i).position);
              var x = (carto.longitude * 180 / Math.PI) + 0.01;
              var y = (carto.latitude * 180 / Math.PI) + 0.01;
              if (x > 120) {
                  x = -120;
              }
              if (y > 70) {
                  y = -70;
              }
              billboards.get(i).position = Cesium.Cartesian3.fromDegrees(x, y);
              labels.get(i).position = Cesium.Cartesian3.fromDegrees(x, y)
          }
      }, 16);

//          setInterval(function() {
//
//                lblArray.forEach(function(value) {
//                    value.text = nextText();
//                });
//
//          }, 500);

        var appreances = [];
          for (var i = 0; i < 20; i++) {
              var appreance = new Cesium.EllipsoidSurfaceAppearance({
                    material : Cesium.Material.fromType('Color')
              });

              appreance.material.uniforms.color = new Cesium.Color((1 / 20) * i, 0.0, 0.0, 1.0);
              appreances.push(appreance);
          }

          var currAppearance = 0;
          function nextAppearance() {
              if (currAppearance == appreances.length) {
                  currAppearance = 0;
              }

              return appreances[currAppearance++];
          }


          var currPrim = 0;

          var primitives = new Cesium.PrimitiveCollection();
          viewer.scene.primitives.add(primitives);



        setInterval(function() {
            var circles = []
            billarray.forEach(function (value) {

                function toDegrees (angle) {
                    return angle * (180 / Math.PI);
                }

                var pos = viewer.scene.globe.ellipsoid.cartesianToCartographic(value.position);
                var long = toDegrees(pos.longitude);
                var lat = toDegrees(pos.latitude);
                circles.push(new Cesium.GeometryInstance({
                    geometry : new Cesium.RectangleGeometry({
                        rectangle : Cesium.Rectangle.fromDegrees(long - 0.1, lat - 0.1, long + 0.1, lat + 0.1)
                    })
                }));


            });

            var stime = new Date();
            var prim = new Cesium.Primitive({
                geometryInstances : circles,
                appearance : nextAppearance(),
                asynchronous : false
            });

            primitives.add(prim);
            console.log('time: ' + (new Date() - stime));


            if (currPrim >= 20) {
                primitives.remove(primitives.get(0));
            }
            else {
                currPrim++;
            }

        }, 500);




          setInterval(function() {
            var first = appreances[0].material.uniforms.color;
              for (var i = 0; i < appreances.length - 1; i++) {
                  appreances[i].material.uniforms.color = appreances[i+1].material.uniforms.color;
              }
              appreances[appreances.length - 1].material.uniforms.color = first;
          }, 100);


    });


});
