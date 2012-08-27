angular.module('components',[])
  .directive('wisenCheckboxFilter',function(){
    return{
      restrict : 'A',
      scope : {},
      compile: function(tElement, tAttr, transclude){
        var inputs = tElement.find('input.values');        
        var elementsContainers = tElement.find('.filter_box');
        angular.forEach(inputs, function(input){
          var inputElemnt = angular.element(input);
          inputElemnt.attr('ng-click', 'registerValue("'+inputElemnt.val()+'")');          
        });

        angular.forEach(elementsContainers, function(element){
          var postElement = angular.element(element);
          postElement.prepend('<div class="header_f1"><input type="checkbox" class="all" ng-click="markAll()"><label>Todos</label></div>')
        });
        
        return function(scope, element, attrs){
          scope.all = true;
          scope.filter_values = [];
          scope.elementOptions = element.find('.values');
          scope.elementAllToggle = element.find('.all');
          scope.totalNumberOfOptions = scope.elementOptions.length;
          scope.filter_field = element.data('field');
          
          scope.registerValue = function(value){
            if ( _.indexOf(scope.filter_values, value) == -1){              
              scope.filter_values.push(value);
            }
            else{
              scope.filter_values = _.without(scope.filter_values, value);
            }            
            scope.all = (scope.filter_values.length == scope.totalNumberOfOptions);
          };

          scope.markAll = function(){
            if (scope.all){
              angular.forEach(scope.elementOptions, function(el){
                angular.element(el).removeAttr('checked');
                var value = angular.element(el).val();
                if ( _.indexOf(scope.filter_values, value) != -1){
                  scope.filter_values = _.without(scope.filter_values, value);
                };
              });
              scope.all = false;
            }              
            else{              
              scope.all = true;
            }
          }

          scope.$watch('all', function(newValue, oldValue){            
            if (newValue == true){
              angular.forEach(scope.elementOptions, function(el){
                angular.element(el).attr('checked', 'checked');
                var value = angular.element(el).val();
                if ( _.indexOf(scope.filter_values, value) == -1){
                  scope.filter_values.push(value);
                };
              });              
            }
            scope.elementAllToggle.attr('checked', newValue);
          });
        };
      }
    };
  });