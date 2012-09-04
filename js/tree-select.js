angular.module('components',[])
  .directive('wisenHierarchicalFilterFor', ['$compile', function($compile){    
    var definition = {
      format : ['COMPANY_NAME', 'L6', 'L5'],
      options: {
        'COMPANY_NAME' : ['VALE','FNS'],
        'L6' : [{}],
        'L5' : [{}]
      }
    };

    return{
      restrict: 'A',
      priority: 1000,
      terminal: true,
      transculde: 'element',
      scope: { },
      compile: function(tElement, tAttrs, transclude){
          rootField = _.first(definition.format);
          childFields = _.without(definition.format, rootField);
          var tplRoot = '<select ng-options="value in options"></select>';
          // angular.forEach(childFields, function(child){
          // });

          return function(scope, element, attrs){
              scope.filter_values = {};              

              var compiledRoot = $compile(tplRoot)(scope);
              console.log(compiledRoot);
              element.append(compiledRoot);
          }
      },
      controller: ['$scope', '$attrs', function($scope, $attrs){
        $scope.options = definition.options.COMPANY_NAME;
      }]
    };
  }]);