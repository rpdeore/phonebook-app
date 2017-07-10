
var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");



  $http.get('/').success(function(response){
    console.log("response="+response);
    $scope.grouplist = response;
    //$scope.grouplist=[{groupname:"Family",contacts:[{contactname:"rosh",phonenumber:"111-111-1111"},{contactname:"ruchir",phonenumber:"222-222-2222"}]},{groupname:"Friends",contacts:[{contactname:"Shruti",phonenumber:"333-333-3333"},{contactname:"sima",phonenumber:"444-444-4444"}]}]
  });//


   $scope.addContact= function(){
     console.log($scope.contact);
    $http.post('/', $scope.contact).success(function(response) {
       console.log("response =");
     console.log(response);
    location.reload();
  });
  };

  $scope.addGroup= function(){
    console.log($scope.group);
    $http.post('/group', $scope.group).success(function(response) {
       console.log("response =");
    console.log(response);
   location.reload();
  });
 };

 $scope.deleteGroup= function(id){
   console.log(name);
   $http.delete('/' + id).success(function(response) {

  location.reload();
 });
};
//
  $scope.remove = function(id,contactname) {
  console.log("id =="+id);
  console.log("contactname"+contactname);
   $http.delete('/' + id + '/' +contactname).success(function(response) {
     location.reload();
   });
};
}]);﻿
