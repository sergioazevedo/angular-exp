angular.module('components',[])
  .directive('wisenHierachicalFilter', function(){
    return{
      restrict : 'A',
      scope: {},
      compile: function(tElement, tAttr, transclude){
        console.log('tElement', tElement);
        console.log('tAttr', tAttr);
        console.log('Transclude',transclude);
      }
    };
  });