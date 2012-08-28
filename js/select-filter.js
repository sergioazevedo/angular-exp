angular.module('components',[])
  .directive('wisenSelectFilter',function(){
    return{
      restrict : 'A',
      scope: {},
      compile: function(tElement, tAttr, transclude){
       console.debug(tElement);
       console.debug(tAttr);
       var options = tElement.find('option');
       
       angular.forEach(options, function(option){
         var optionElement = angular.element(option);
         optionElement.attr('ng-click', 'registerValue()');
       });
       
       return function(scope, element, attrs){
         scope.filter_values = [];
         scope.filter_field = element.data('field');
         
         scope.registerValue = function(){
           scope.filter_values = element.val();
           console.log(scope.filter_field, scope.filter_values);
         };
         
       };
      }
    };
  });