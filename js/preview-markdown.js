angular.module('components',[])
  .directive('markdown',function(){
    var converter = new Showdown.converter();
    var editTemplate = '<textarea cols="100" rows="10" ng-show="isEditMode" ng-model="markdown" ng-dblclick="switchToPreview()"></textarea>';
    var previewTemplate = '<div ng-hide="isEditMode" ng-dblclick="switchToEdit()">Preview</div>';    
    return{
      restrict: 'E',
      scope: {},
      compile: function(tElement, tAttrs, transclude){
        var markdown = tElement.text();
        tElement.html(editTemplate);
        var previewElement = angular.element(previewTemplate);
        tElement.append(previewElement);
        
        return function(scope, element, attrs){
          scope.isEditMode = true;
          scope.markdown = markdown;
          
          scope.switchToPreview = function(){
            var convertedText = converter.makeHtml(scope.markdown);
            previewElement.html(convertedText);
            scope.isEditMode = false;
          };

          scope.switchToEdit = function(){
            scope.isEditMode = true;
          };          
          
        };
      }
    };
  });