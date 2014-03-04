"use strict";

 angular.module("configSocket", [])

.constant("ENV", {
  "name": "development",
  "apiEndpoint": "http://ec2-54-254-210-45.ap-southeast-1.compute.amazonaws.com",
  "apiEndpoint_notSocket": "http://localhost",
  "port": ":8000"
})

;