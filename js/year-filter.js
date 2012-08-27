angular.module('components',[])
  .directive('wisenYearFilter',function(){
    return{
      restrict : 'A',
      scope : {},      
      compile: function(tElement, tAttr, transclude){        
        return function(scope, element, attrs){
          scope.year = new Date().getFullYear();
        };
      }
    };
  });