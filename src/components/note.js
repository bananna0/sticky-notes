import $ from 'jquery';
import '../../css/note.css';

import noteStore from '../noteStore';
import ResizeHelper from '../resizeHelper';

import ButtonPanelCreator from './buttonPanel';
import NoteContentCreator from './noteContent';

const noteColors = [
  'oldlace',
  'lightsteelblue',
  'lavender',
  'lavenderblush'
];

const NoteCreator = (() => {
  const item = `
      <div class="note">
        <div class="note-border note-top-border"></div>
        <div class="note-border note-right-border"></div>
        <div class="note-border note-bottom-border"></div>
        <div class="note-border note-left-border"></div>
   
        <div class="note-corner note-top-left-corner"></div>
        <div class="note-corner note-top-right-corner"></div>
        <div class="note-corner note-bottom-right-corner"></div>
        <div class="note-corner note-bottom-left-corner"></div>
      </div>`;

  const createNote = (data) => {
    const {
      offset,
      width = 300,
      height = 200,
      text = "Note",
      color = 0,
      id = noteStore.createId()
    } = data;

    const note = $(item)
      .offset(offset)
      .width(width)
      .height(height)
      .data({ id: id, colorId: color })
      .css('background-color', noteColors[color]);

    ResizeHelper.addResizeEvents(note);

    const content = NoteContentCreator.createContent(text);
    const buttonPanel = ButtonPanelCreator.createPanel(
      () => content.trigger('text:toggle'),
      () => content.trigger('text:toggle'),
      () => {
        content.trigger('text:reset');
        saveData(note);
      },
      () => {
        const oldData = note.data();
        let colorId = oldData?.colorId + 1;
        colorId = colorId >= noteColors.length ? 0 : colorId;
        note.css('background-color', noteColors[colorId]);
        oldData.colorId = colorId;
        note.data(oldData);
      }
    )

    note.append(buttonPanel);
    note.append(content);
    
    note.on('dblclick', event => event.stopPropagation())
      .on('mousedown', handleMouseDown);

    return note;
  };

  const saveData = (note) => {
    const dataToSave = {
      offset: note.offset(),
      height: note.height(),
      width: note.width(),
      text: note.find('p.note-text').text(),
      id: note.data().id,
      color: note.data().colorId
    }
    noteStore.appendData(dataToSave);
  };

  const handleMouseDown = (event) => {
    event.stopPropagation();

    const currentItem = event.currentTarget,
      currentItemOffset = $(currentItem).offset(),
      mousePosX = event.originalEvent.clientX,
      mousePosY = event.originalEvent.clientY;

    function stopDrugging() {
      checkForDelete(currentItem);
      $(window)
        .off('mousemove', handleMouseMove)
        .off('mouseup', stopDrugging)
    }

    function handleMouseMove(event) {
      const currentMouseX = event.originalEvent.clientX,
        currentMouseY = event.originalEvent.clientY;

      const offset = {
        top: currentItemOffset.top + currentMouseY - mousePosY,
        left: currentItemOffset.left + currentMouseX - mousePosX
      };

      $(currentItem)
        .offset(offset)
    }

    $(window)
      .on('mousemove', handleMouseMove)
      .on('mouseup', stopDrugging)
  };

  const checkForDelete = (elem) => {
    const offset = $(elem).offset(),
      width = $(elem).width();
    const elemsBelowLeftCorner = document.elementsFromPoint(offset.left, offset.top);
    const elemBelowRightCorner = document.elementsFromPoint(offset.left + width, offset.top);

    if (elemsBelowLeftCorner.find(item => item.className.includes('delete-zone'))
      || elemBelowRightCorner.find(item => item.className.includes('delete-zone'))) {
      const data = $(elem).data();
      if (data && data.id) {
        noteStore.removeData(data.id);
      }
      $(elem).remove();
    }
  };

  return {
    createNote: createNote
  }
})();

export default NoteCreator;