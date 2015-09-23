  var ProgressBar = Ractive.extend({

      template: '#template',

      updateAction: function (updatePos) {
          switch (updatePos) {
            case -25:
            this.updateBar(-25);
            break;
            case -10:
            this.updateBar(-10);
            break;
            case 25:
            this.updateBar(25);
            break;
            case 10:
            this.updateBar(10);
            break;                                    
          }
      },
      updateBar: function ( updatePos) {
          var progressNo = this.get('selectedProgress');
          var aProgress = this.get('progress' + progressNo);
          var proDiv = this.find('#progress' + progressNo);
          aProgress = aProgress + updatePos;
          if(aProgress > 100) {
            aProgress = 100;
            proDiv.className = "progress-bar-fill-red";
          } else if(aProgress < 0) {
            aProgress = 0;
          } else {
            proDiv.className = "progress-bar-fill";
          }
          this.set('progress'+ progressNo, aProgress);
        }
  
});

  var progress = new ProgressBar({
      el: document.body,
      data: {
        readonly:       false,          
        progress1:       20,
        progress2:       30,
        progress3:       40
      }
  });


progress.on('plus25', function ( event ) {
    progress.updateAction(25);
});

progress.on('plus10', function ( event ) {
    progress.updateAction(10);
});

progress.on('minus25', function ( event ) {
    progress.updateAction(-25);
});

progress.on('minus10', function ( event ) {
    progress.updateAction(-10);
});