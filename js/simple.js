angular.module('components',[])
  .directive('markdown',function(){
    var converter = new Showdown.converter();
    return{
      restrict: 'E',
      link: function(scope, element, attr){
        var htmlText = converter.makeHtml(element.text());
        element.html(htmlText);
      }
    };
  });