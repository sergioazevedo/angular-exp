angular.module('components',[])
  .directive('wisenHierachicalFilter', [ '$timeout', '$http', '$compile', function($timeout, $http, $compile){
    
    return{
      restrict : 'E',
      priority: 1000,
      terminal: true,
      scope: {data: '@'},
      link: function(scope, elm, attrs){
        
        $http({ method: 'GET', url: attrs.href })
          .success( function(data, status, headers, config){
            scope.data = data;
            scope.format = data.format;
            scope.options = data.options;

            var rootFieldName = _.first(data.format);
            var parentFieldName = rootFieldName;
            var html = "";
            
            angular.forEach(scope.format, function(field){
              if (field == rootFieldName){
                html = html + '<select ng-model="'+ field +'" ng-options="c.name for c in options.'+field+'"></select>';
              }
              else{
                html = html + '<label>'+field+'</label><br/>';
                html = html + '<select ng-model="'+ field +'" ng-options="c.name group by c.group for c in options.'+field+'"></select>';
                scope.$watch( parentFieldName, function(newValue, oldValue){
                  console.log(field + '- newValue', newValue);

                  $http({ method: 'GET', url: field+'.json' })
                    .success( function(data, status, headers, config){
                      scope.options[field] = data;
                      console.log('success', data);
                      console.log(scope.options.field);
                      console.log(scope.options.L6);
                    })
                    .error( function(data, status, headers, config){
                      if (console) console.log("status", status);
                    });
                    
                } );
                parentFieldName = field;
              }
            });
            
            var compiled = $compile(html)(scope);
            elm.append(compiled);
          })
          .error( function(data, status, headers, config){
            if (console) console.log("status", status);
          });
        
      }
    };
    
  }]);