angular.module('components',[])
  .directive('wisenSelectFilter',function(){
    return{
      restrict : 'A',
      scope: { },
      compile: function(tElement, tAttr, transclude){
       var filter_field = tElement.data('field');

       return function(scope, element, attrs){
         scope.filter_values = {}
       };
      }
    };
  });