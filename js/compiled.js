var myAppModule = angular.module("components", []);

var definition = {
  format : ['COMPANY_NAME', 'L6', 'L5'],
  options: {
    'COMPANY_NAME' : ['VALE','FNS'],
    'L6' : [{}],
    'L5' : [{}]
  }
};

myAppModule.directive('myDropdownB', function($compile) {
    return {
        restrict: "E",
        priority: 1000,
        terminal: true,
        compile: function(tElement, tAttrs, transclude) {

            var tplEl = angular.element('<select></select>');
            tplEl.attr("ng-options", "i as label for i in values");

            for(attr in tAttrs.$attr) {
                tplEl.attr(tAttrs.$attr[attr], tAttrs[attr]);
            }

            return function(scope, element, attrs) {
                console.log(element);
                console.debug(scope);
                var compiledEl = $compile(tplEl)(scope);
                console.log(compiledEl);
                element.replaceWith(compiledEl);
            }
        },
        controller: ['$scope', '$attrs', function($scope, $attrs) {
            $scope.values = definition.options.COMPANY_NAME;
        }]
    };
});


MyCtrl = function($scope) {

};