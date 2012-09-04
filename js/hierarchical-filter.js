angular.module('components',[])
  .directive('wisenHierachicalFilter', [ '$timeout', '$http', '$compile', function($timeout, $http, $compile){
    
    function buildRootSelectHtml(field){
      return '<select ng-model="'+ field +'" ng-options="c.name for c in options.'+field+'"></select>';
    }
    
    function buildChildSelectHtml(field){
      var html = '<label>'+field+'</label><br/>';
      html = html + '<select ng-model="'+ field +'" ng-options="c.name group by c.group for c in options.'+field+'"></select>';
      return html;
    }
        
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
                html = buildRootSelectHtml(field);
              }
              else{
                html = html + buildChildSelectHtml(field);
                                
                scope.$watch( parentFieldName, function(newValue, oldValue){
                  if (newValue !== oldValue){                    
                    $http({ method: 'GET', url: field+'.json' })
                      .success( function(data, status, headers, config){
                        scope.options[field] = data;
                      })
                      .error( function(data, status, headers, config){
                        if (console) console.log("status", status);
                      });
                  }
                    
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