angular
.module('myMoments')
.controller('ThemeController' , ThemeController);

//protect from minification?

function ThemeController() {

  self = this;

  this.event = {
    style: "light",
    with_images: true
  };

  this.save = function() {

    this.event.save();

  }

  this.styles = ["light" , "dark" , "green"];

}
