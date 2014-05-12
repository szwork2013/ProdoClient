angular.module('prodo.ProdoHomeApp')
.factory('HomeService', [
  '$resource',
  function ($resource) {
    var homeService = {
        all_campaign_data: $resource('/api/activecampaign', {}, { getAllCampaigns: { method: 'GET'} })
    }
    return homeService;
  }
])