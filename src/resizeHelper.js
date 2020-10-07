'use strict';
import $ from 'jquery';
import ResizeHelperFunctions from './resizeHelperFunctions';

const ResizeHelper = (function () {
  const resizeHelpers = {
    'div.note-border.note-top-border': ResizeHelperFunctions.topResize,
    'div.note-border.note-bottom-border': ResizeHelperFunctions.bottomResize,
    'div.note-border.note-left-border': ResizeHelperFunctions.leftResize,
    'div.note-border.note-right-border': ResizeHelperFunctions.rightResize,
    'div.note-corner.note-top-left-corner': ResizeHelperFunctions.topLeftResize,
    'div.note-corner.note-top-right-corner': ResizeHelperFunctions.topRightResize,
    'div.note-corner.note-bottom-right-corner': ResizeHelperFunctions.bottomRightResize,
    'div.note-corner.note-bottom-left-corner': ResizeHelperFunctions.bottomLeftResize,
  };

  const addResizeEvents = (elem, limits) => {
    if (limits) {
      resizeLimits = limits;
    }
    Object.keys(resizeHelpers).forEach(selector =>
      $(elem).children(selector)
        .on('mousedown', event => handleResize(event, elem, resizeHelpers[selector]))
    );
  };

  const handleResize = (event, target, resizeFn) => {
    event.stopPropagation();
    if (event.target !== event.currentTarget) return;

    const currentMeasurement = {
      offset: $(target).offset(),
      targetHeight: $(target).height(),
      targetWidth: $(target).width(),
      mousePosX: event.originalEvent.clientX,
      mousePosY: event.originalEvent.clientY
    }

    function resize(event) {
      resizeFn(event, target, currentMeasurement);
    }

    function stopResize() {
      console.log('unsubscribe from resize!');
      $(window)
        .off('mousemove', resize)
        .off('mouseup', stopResize)
    }

    $(window)
      .on('mousemove', resize)
      .on('mouseup', stopResize)
  }

  return {
    addResizeEvents: addResizeEvents
  }
})();

export default ResizeHelper;