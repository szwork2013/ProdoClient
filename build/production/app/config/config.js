"use strict";

 angular.module("configSocket", [])

.constant("ENV", {
  "name": "production",
  "apiEndpoint": "http://www.prodonus.com",
  "apiEndpoint_notSocket": "http://www.prodonus.com",
  "port": ":8000"
})

;