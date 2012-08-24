function ComponentController($scope) {
  $scope.title = "A title";
  $scope.text = "A better description for the subject above'";
}

angular.module('components',[]).directive('zippy', function(){
  var zippyComponentDefinition = {
    restrict: 'C',
    replace: true,
    transclude: true,
    scope: {title:'@zippyTitle'},
    template: '<div>' + 
              '<div class="title"> {{title}} </div>' +
              '<div class="body" ng-trasclude><span> {{text}} </span></div>' +
              '</div>',
    link: function(scope, element, attrs){
      var title = angular.element(element.children()[0]);
      var opened = true;
      title.bind('click', toggle);
      
      function toggle(){
        opened = !opened;
        element.removeClass(opened ? 'closed' : 'opened');
        element.addClass(opened ? 'opened' : 'closed');
      }
      
      toggle(); //kickoff 
    }
  };
  
  return zippyComponentDefinition;
});