define(['angular', '../../bower_components/Cesium/Cesium'], function (angular, myces) {
  'use strict';

  angular.module('cesiumPerformanceApp.controllers.MainCtrl', [])
    .controller('MainCtrl', function ($scope) {
      $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];

      var viewer = new Cesium.Viewer('cesiumContainer');

      var billboards = new Cesium.BillboardCollection();
      viewer.scene.primitives.add(billboards);
      var billarray = [];

      var labels = new Cesium.LabelCollection();
      viewer.scene.primitives.add(labels);
      var lblArray = [];

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
        var pos = Cesium.Cartesian3.fromDegrees(-120 + Math.random() * 240, -70 + Math.random() * 140);
        billarray.push(billboards.add({
          position: pos,
          image: 'images/satellite.png'
        }));

        lblArray.push(labels.add({
          position: pos,
          text: nextText(),
          scale: 0.5
        }));
      }

      setInterval(function () {
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

      var plotColls = [];
      for (var i = 0; i < 20; i++) {
        var coll = new Cesium.BillboardCollection();
        coll.color = new Cesium.Color((1 / 20) * i, 0.0, 0.0, 1.0);
        plotColls.push(coll);
        viewer.scene.primitives.add(coll);
      }

      var currentColl = 0;
      setInterval(function () {
        if (currentColl >= 20) {
          for (var i = 0; i < 5000; i++) {
            plotColls[currentColl % 20].get(i).position = billarray[i].position;
          }
        }
        else {
          for (var i = 0; i < 5000; i++) {
            var newBill = {
              position: billarray[i].position,
              image: 'images/plot.png',
              width: 4,
              height: 4
            };

            plotColls[currentColl % 20].add(newBill);
          }
        }

        currentColl++;
      }, 500);

      var currentStart = 0;
      setInterval(function () {
        for (var i = 0; i < 20; i++) {
          plotColls[19 - i].color = new Cesium.Color((1 / 20) * ((i + currentStart) % 20), 0.0, 0.0, 1.0);
        }
        currentStart++;
      }, 100);
    });


});
