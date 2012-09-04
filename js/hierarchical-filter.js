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
            var rootFieldName = _.first(data.format);
            scope.options = data.options;
            var html = "";
            angular.forEach(scope.format, function(field){
              if (field == rootFieldName){
                html = html + '<select ng-model="'+ field +'" ng-changeng-options="c.name for c in options.'+field+'"></select>';              
              }
              else{
                html = html + '<label>'+field+'</label><br/>';
                html = html + '<select ng-model="'+ field +'" ng-options="c.name group by c.group for c in options.'+field+'"></select>';              
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