/* Overview: Product Controller 
 * Controller for product comments,product features etc
 * Dated: 25/11/2013.
 * Author: Bhagyashri Jangam
 * Copyright: Prodonus Software Private Limited and GiantLeap Systems Private Limited 2013
 * Change History:
 *
 * date | author | description
 *
 * 27-3/2013 | xyx | Add a new property
 *
 */
angular.module('prodo.ProductApp').controller('ProductController', ['$scope', '$log', '$rootScope', 'ProductService', 'UserSessionService', '$http', 'CommentLoadMoreService', 'ENV', 'TagReffDictionaryService', 'ProductFeatureService', 'growl','$state', 'productData', '$stateParams', function ($scope, $log, $rootScope, ProductService, UserSessionService, $http, CommentLoadMoreService, ENV, TagReffDictionaryService, ProductFeatureService, growl,$state, productData, $stateParams) {
 
    console.log(productData.success.product);
    $scope.pimgs = [];
    $scope.$state = $state;
    console.log('hello product');

    $scope.$watch('$state.$current.locals.globals.productData', function (productData) {
      if (productData.success.product.product_images) {
        $scope.pimgs = productData.success.product.product_images;
        $log.debug("Product images emitting when not null ");
        $scope.$emit('emittingProductImages',$scope.pimgs);
      } else {
        $scope.$emit('emittingNoProductImages',$scope.pimgs);
        $log.debug("Product images emitting when null ");
      }
    });

}])