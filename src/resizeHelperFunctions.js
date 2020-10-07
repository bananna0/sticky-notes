import $ from 'jquery';

// ToDo: rewrite four of this functions as combination of others ;(
const ResizeHelperFunctions = (() => {
  const minWidth = 100,
    minHeight = 100;

  const bottomResize = (event, target, oldMeasurement) => {
    const {
      mousePosY,
      targetHeight
    } = oldMeasurement;

    const diff = event.originalEvent.clientY - mousePosY,
      newHeight = targetHeight + diff;

    if (newHeight < minHeight) return;

    $(target)
      .height(newHeight);
  }

  const topResize = (event, target, oldMeasurement) => {
    const {
      mousePosY,
      targetHeight,
      offset
    } = oldMeasurement;

    const diff = event.originalEvent.clientY - mousePosY,
      newHeight = targetHeight - diff;

    if (newHeight < minHeight) return;

    const newOffset = {
      top: offset.top + diff,
      left: offset.left
    };

    $(target)
      .offset(newOffset)
      .height(newHeight);
  }

  const leftResize = (event, target, oldMeasurement) => {
    const {
      mousePosX,
      targetWidth,
      offset
    } = oldMeasurement;

    const diff = event.originalEvent.clientX - mousePosX,
      newWidth = targetWidth - diff;

    if (newWidth < minWidth) return;

    const newOffset = {
      top: offset.top,
      left: offset.left + diff
    };

    $(target)
      .offset(newOffset)
      .width(newWidth);
  }

  const rightResize = (event, target, oldMeasurement) => {
    const {
      mousePosX,
      targetWidth
    } = oldMeasurement;

    const diff = event.originalEvent.clientX - mousePosX,
      newWidth = targetWidth + diff;

    if (newWidth < minWidth) return;

    $(target)
      .width(newWidth);
  }

  const topLeftResize = (event, target, oldMeasurement) => {
    const {
      mousePosY,
      mousePosX,
      targetWidth,
      targetHeight,
      offset,
    } = oldMeasurement;

    const diffX = event.originalEvent.clientX - mousePosX,
      diffY =  event.originalEvent.clientY - mousePosY,
      newHeight = targetHeight - diffY,
      newWidth = targetWidth - diffX;

    if (newHeight < minHeight || newWidth < minWidth) return;

    const newOffset = {
      top: offset.top + diffY,
      left: offset.left + diffX
    };

    $(target)
      .offset(newOffset)
      .width(newWidth)
      .height(newHeight);
  }

  const topRightResize = (event, target, oldMeasurement) => {
    const {
      mousePosY,
      mousePosX,
      targetWidth,
      targetHeight,
      offset,
    } = oldMeasurement;

    const diffY = event.originalEvent.clientY - mousePosY,
      diffX = event.originalEvent.clientX - mousePosX,
      newHeight = targetHeight - diffY,
      newWidth = targetWidth + diffX;

    if (newHeight < minHeight || newWidth < minWidth) return;

    const newOffset = {
      ...offset,
      top: offset.top + diffY
    };

    $(target)
      .offset(newOffset)
      .width(newWidth)
      .height(newHeight);
  }

  function bottomLeftResize(event, target, oldMeasurement) {
    const {
      mousePosY,
      mousePosX,
      targetWidth,
      targetHeight,
      offset,
    } = oldMeasurement;

    const diffX = event.originalEvent.clientX - mousePosX,
      diffY = event.originalEvent.clientY - mousePosY,
      newHeight = targetHeight + diffY,
      newWidth = targetWidth - diffX;

    if (newHeight < minHeight || newWidth < minWidth) return;

    const newOffset = {
      ...offset,
      left: offset.left + diffX
    };

    $(target)
      .offset(newOffset)
      .width(newWidth)
      .height(newHeight);
  }

  function bottomRightResize(event, target, oldMeasurement) {
    const {
      mousePosY,
      mousePosX,
      targetWidth,
      targetHeight,
    } = oldMeasurement;

    const diffX = event.originalEvent.clientX - mousePosX,
      diffY = event.originalEvent.clientY - mousePosY,
      newHeight = targetHeight + diffY,
      newWidth = targetWidth + diffX;

    if (newHeight < minHeight || newWidth < minWidth) return;

    $(target)
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