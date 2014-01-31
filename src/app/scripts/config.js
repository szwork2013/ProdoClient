"use strict";

 angular.module("config", [])

.constant("ENV", {
  "name": "development",
  "apiEndpoint": "http://ec2-54-254-210-45.ap-southeast-1.compute.amazonaws.com:8000"
})

;