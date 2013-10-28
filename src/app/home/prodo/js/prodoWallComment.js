angular.module('prodo.ProdoCommentApp')
 .controller('ProdoCommentController', function ($scope) {
    $scope.comments;
    $scope.comments = [
      {
        userName:"Bhagyashri",
        companyName:"Giant Leap Systems",
        time:Date.now(),
        text:"I like this web site",
        tags:"warranty",
        group:"Developer",
        dp:"http://placehold.it/64x64",
        upvotecount:0
      },{
        userName:"Neha",
        companyName:"Giant Leap Systems",
        time:Date.now(),
        text:"Prodonus is really cool :)",
        tags:"Prodonus, warranty",
        group:"Support",
        dp:"http://placehold.it/64x64",
        upvotecount:0
      }];

    $scope.add = function () {
      if(!$scope.textField) return;
     
      $scope.comments.unshift({
       userName:"Shree",
       companyName:"Srujan Systems",
       time: Date.now(),
       text: $scope.textField,
       tags: "hiii",
        group:"Admin",
        dp:"http://placehold.it/64x64",
        upvotecount:0
      });
       $scope.textField = "";
     
    };
});

