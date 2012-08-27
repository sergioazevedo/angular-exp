angular.module('components',[])
  .directive('wisenDateFilter',function(){
    return{
      restrict : 'A',
      scope : {},      
      compile: function(tElement, tAttr, transclude){                
        var inputs = tElement.find('input.date');        
        angular.forEach(inputs, function(input){
          var inputElemnt = angular.element(input);
          var targetModelName = 'date.' + inputElemnt.data('ui-date');
          inputElemnt.attr('ng-model', targetModelName);
        });

        return function(scope, element, attrs){
          scope.date = {};
          scope.hasChangedDate = function(element, dateValue){
            elementDateField = angular.element(element).data('ui-date');            
            scope.date[elementDateField] = dateValue;
            scope.$apply();
          };

          scope.date = {startDate: '', endDate: ''};
          $(element).find('.date').datepicker({            
            minDate: new Date($(this).data("from")),
            maxDate: new Date($(this).data("to")),
            dateFormat: "dd/mm/yy",
            onSelect: function (dateText, inst) { 
                var dateValue = dateText;                               
                scope.hasChangedDate($(this), dateValue);
            },
            beforeShow: function(input, inst) {
                var calendar = inst.dpDiv;
                calendar.appendTo("div.cal_col2");
            }
          });
        };
      }
    };
  });