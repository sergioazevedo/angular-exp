angular.module('components',[])
  .directive('wisenCheckboxFilter',function(){
    return{
      restrict : 'A',
      scope : {},
      compile: function(tElement, tAttr, transclude){
        var inputs = tElement.find('input.values');        
        console.debug(inputs);
        angular.forEach(inputs, function(input){
          var inputElemnt = angular.element(input);
          inputElemnt.attr('ng-click', 'registerValue("'+inputElemnt.val()+'")');
        });
        
        //link function
        return function(scope, element, attrs){
          scope.filter_values = [];
          scope.filter_field = element.data('field');
          
          scope.registerValue = function(value){
            //tenho que inlcuir em filter_values o valor do elemento
            if ( _.indexOf(scope.filter_values, value) == -1){
              scope.filter_values.push(value);
            }
            else{
              scope.filter_values = _.without(scope.filter_values, value);
            }
            console.log(scope.filter_values);
            console.log(scope.filter_field);
          };
        };
        
      }
    };
  });
