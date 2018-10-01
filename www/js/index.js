/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    pictureSource: null,   // picture source
    destinationType: null, // sets the format of returned value
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');

    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
        console.log(JSON.stringify(device.platform));
        console.log(JSON.stringify(device.version));
        app.pictureSource=navigator.camera.PictureSourceType;
        app.destinationType=navigator.camera.DestinationType;
        console.log(JSON.stringify(navigator.camera));
        console.log(JSON.stringify(cordova.plugins));

        var permissions = cordova.plugins.permissions;
        permissions.hasPermission(permissions.CAMERA, function( status ){
            if ( status.hasPermission ) {
                console.log("Yes :D ");
                app.capturePhoto();
            }
            else {
                console.warn("No :( ");
            }
        });


        // Manejando la geolocalización
        // onSuccess Callback
        // This method accepts a Position object, which contains the
        // current GPS coordinates
        //
        var onSuccess = function(position) {
            alert('Latitude: '          + position.coords.latitude          + '\n' +
                  'Longitude: '         + position.coords.longitude         + '\n' +
                  'Altitude: '          + position.coords.altitude          + '\n' +
                  'Accuracy: '          + position.coords.accuracy          + '\n' +
                  'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
                  'Heading: '           + position.coords.heading           + '\n' +
                  'Speed: '             + position.coords.speed             + '\n' +
                  'Timestamp: '         + position.timestamp                + '\n');
        };

        // onError Callback receives a PositionError object
        //
        function onError(error) {
            alert('code: '    + error.code    + '\n' +
                  'message: ' + error.message + '\n');
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError);

        // Manejando el estado de la batería
        window.addEventListener("batterystatus", onBatteryStatus, false);

        function onBatteryStatus(status) {
            console.log("Level: " + status.level + " isPlugged: " + status.isPlugged);
        }

    },
    // Called when a photo is successfully retrieved
    //
    onPhotoDataSuccess: function (imageData) {
        // Uncomment to view the base64-encoded image data
        //console.log(imageData);

        // Get image handle
        //
        var smallImage = document.getElementById('smallImage');

        // Unhide image elements
        //
        smallImage.style.display = 'block';

        // Show the captured photo
        // The in-line CSS rules are used to resize the image
        //
        smallImage.src = "data:image/jpeg;base64," + imageData;
    },

    // Called when a photo is successfully retrieved
    //
    onPhotoURISuccess: function (imageURI) {
        // Uncomment to view the image file URI
        // console.log(imageURI);

        // Get image handle
        //
        var largeImage = document.getElementById('largeImage');

        // Unhide image elements
        //
        largeImage.style.display = 'block';

        // Show the captured photo
        // The in-line CSS rules are used to resize the image
        //
        largeImage.src = imageURI;
    },
    // Called if something bad happens.
    //
    onFail: function (message) {
        alert('Failed because: ' + message);
    },
    // A button will call this function
    //
    capturePhoto: function () {
        // Take picture using device camera and retrieve image as base64-encoded string
        navigator.camera.getPicture(
            app.onPhotoDataSuccess,
            app.onFail,
            {
                quality: 50,
                destinationType: app.destinationType.DATA_URL
            }
        );
    },
};

app.initialize();