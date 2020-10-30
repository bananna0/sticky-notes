import $ from 'jquery';

const ResizeHelperFunctions = (() => {
  const minWidth = 100,
    minHeight = 100;

  const bottomResize = (event, target, oldMeasurement) => {
    const vector = { top: 0, left: 0, width: 0, height: 1 };
    generalResize(event, target, oldMeasurement, vector);
  }

  const topResize = (event, target, oldMeasurement) => {
    const vector = { top: 1, left: 0, width: 0, height: -1 };
    generalResize(event, target, oldMeasurement, vector);
  }

  const leftResize = (event, target, oldMeasurement) => {
    const vector = { top: 0, left: 1, width: -1, height: 0 };
    generalResize(event, target, oldMeasurement, vector);
  }

  const rightResize = (event, target, oldMeasurement) => {
    const vector = { top: 0, left: 0, width: 1, height: 0 };
    generalResize(event, target, oldMeasurement, vector);
  }

  const topLeftResize = (event, target, oldMeasurement) => {
    const vector = { top: 1, left: 1, width: -1, height: -1 };
    generalResize(event, target, oldMeasurement, vector);
  }

  const topRightResize = (event, target, oldMeasurement) => {
    const vector = { top: 1, left: 0, width: 1, height: -1 };
    generalResize(event, target, oldMeasurement, vector);
  }

  function bottomLeftResize(event, target, oldMeasurement) {
    const vector = { top: 0, left: 1, width: -1, height: 1 };
    generalResize(event, target, oldMeasurement, vector);
  }

  function bottomRightResize(event, target, oldMeasurement) {
    const vector = { top: 0, left: 0, width: 1, height: 1 };
    generalResize(event, target, oldMeasurement, vector);
  }

  function generalResize(event, target, oldMeasurement, vector) {
    const {
      mousePosY,
      mousePosX,
      targetWidth,
      targetHeight,
      offset
    } = oldMeasurement;

    const diffX = event.originalEvent.clientX - mousePosX,
      diffY = event.originalEvent.clientY - mousePosY;
    
    const newTop = offset.top + diffY * vector.top,
      newLeft = offset.left + diffX * vector.left,
      newWidth = targetWidth + diffX * vector.width,
      newHeight = targetHeight + diffY * vector.height;
    
    if (newHeight < minHeight || newWidth < minWidth) return;

    $(target)
      .offset({top: newTop, left: newLeft})
      .width(newWidth)
      .height(newHeight);
  }

  return {
    bottomResize,
    topResize,
    leftResize,
    rightResize,
    topLeftResize,
    topRightResize,
    bottomLeftResize,
    bottomRightResize
  }
})();

export default ResizeHelperFunctions;