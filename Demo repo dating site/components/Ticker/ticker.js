/* eslint-disable */
import React from 'react';
import $ from 'jquery';
import ViewTicker from './view_ticker';

const Ticker = () => {
           
  $.fn.liScroll = function(settings) {
    settings = $.extend({
      travelocity: 0.03
      }, settings);   
      return this.each(function(){
          var $strip = $(this);
          $strip.addClass("newsticker")
          var stripHeight = 1;
          $strip.find("li").each(function(i){
            stripHeight += $(this, i).outerHeight(true); // thanks to Michael Haszprunar and Fabien Volpi
          });
          var $mask = $strip.wrap("<div class='mask'></div>");
          var $tickercontainer = $strip.parent().wrap("<div class='tickercontainer'></div>");               
          var containerHeight = $strip.parent().parent().height();  //a.k.a. 'mask' width   
          $strip.height(stripHeight);     
          var totalTravel = stripHeight;
          var defTiming = totalTravel/settings.travelocity; // thanks to Scott Waye   
          function scrollnews(spazio, tempo){
          $strip.animate({top: '-='+ spazio}, tempo, "linear", function(){$strip.css("top", containerHeight); scrollnews(totalTravel, defTiming);});
          }
          scrollnews(totalTravel, defTiming);       
          $strip.hover(function(){
            $(this).stop();
          },
          function(){
          var offset = $(this).offset();
          var residualSpace = offset.top + stripHeight;
          var residualTime = residualSpace/settings.travelocity;
          scrollnews(residualSpace, residualTime);
          });     
      }); 
  };
  
  $(function(){
      $("ul#ticker01").liScroll();
  });  

  return (
          
      <div>
          <ViewTicker/>
      </div> 
  )                
}

export default Ticker;
    