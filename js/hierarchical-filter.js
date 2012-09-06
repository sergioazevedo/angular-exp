angular.module('components',[])
  .directive('wisenHierachicalFilter', [ '$timeout', '$http', '$compile', function($timeout, $http, $compile){
    
    function buildRootSelectHtml(field){
      return '<select multiple="multiple" ng-model="'+ field +'" ng-options="c.name for c in options.'+field+'"></select>';
    }
    
    function buildChildSelectHtml(field){
      var html = '<label>'+field+'</label><br/>';
      html = html + '<select multiple="multiple" ng-model="'+ field +'" ng-options="c.name group by c.group for c in options.'+field+'"></select>';
      return html;
    }
    
    function retrieveRootValues(scope){
      return _.map(scope[scope.rootFieldName], function(e){ return e.name; });
    }
    
    function retrieveNestedValuesAsArray(scope, levelIdx, actualNodeValue, target){
      var result = [actualNodeValue];
      if (levelIdx < scope.format.length){
        var currentLevel = scope.format[levelIdx];
        var values = _.chain(scope[currentLevel]).filter(function(e){return e.group == target;}).pluck('name').value();
        // --- To Degubg
        // console.log('values for level: ', currentLevel, ' => ', values);
        // console.log('values for level: ', currentLevel, ' => ', values.length);
        if ( values.length > 0 ){
          result = undefined;
          angular.forEach(values, function(value){
            var newNode = actualNodeValue.slice();
            newNode.push(value);
            if ( result == undefined ) 
              result = retrieveNestedValuesAsArray(scope, levelIdx+1, newNode, value);
            else 
              result = result.concat( retrieveNestedValuesAsArray(scope, levelIdx+1, newNode, value) );
          });
          
        };
        
      };
      return result;
    }
    
    function getFormatedValues(scope){
      var results = [];
      var rootValues = retrieveRootValues(scope);
      
      angular.forEach(rootValues, function(rootValue){
        var target = rootValue;
        var actualNodeValue = [rootValue];        
        var nodeValues = retrieveNestedValuesAsArray(scope, 1, actualNodeValue, target);
        results = results.concat( nodeValues );
      });
      // --- To Degubg
      // console.log('Resultado => ',results);
      return results;
    }

    return{
      restrict : 'E',
      priority: 1000,
      terminal: true,
      scope: {data: '@'},
      link: function(scope, elm, attrs){
        
        $http({ method: 'GET', url: attrs.href })
          .success( function(data, status, headers, config){
            scope.format = data.format;
            scope.options = data.options;

            scope.rootFieldName = _.first(data.format);
            var parentFieldName = scope.rootFieldName;
            var html = "";
            
            angular.forEach(scope.format, function(field){
              if (field == scope.rootFieldName){
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
                    
                },true );
                parentFieldName = field;
              }
            });
            
            scope.getFilterValue = function(){
              return{
                type: 'hierarchical', 
                first_field: scope.rootFieldName,
                format: scope.format,
                values: getFormatedValues( scope )
              };
            };
            
            scope.$evalAsync(function(){
              if ( typeof($().select2) == 'function' ){
                $('select').select2({
                  placeholder: ' ',
                  width: '100%'
                });
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