var componentsModule = angular.module('components',[]);

componentsModule.directive('wisenActualTime', function($timeout, dateFilter){
  // return the link function
  return function(scope, element, attrs){
    console.log(attrs);
    var format, timeout;
    
    //update the UI
    function updateTime(){
      element.text(dateFilter(new Date(), format));
    }
    
    //watch the expression, and update the UI on element change event
    scope.$watch(attrs.wisenActualTime, function(value){
      format = value;
      updateTime();
    });
    
    //schedule update in one second
    function updateLater(){
      timeoutID = $timeout(function(){
        updateTime(); //update DOM
        updateLater(); //schedule another update
      }, 1000);
    }
    
    element.bind('$destroy',function(){
      $timeout.cancel(timeoutID);
    });
    
    updateLater(); //kick
    
  };
});