import $ from 'jquery';
import '../../css/notes-zone.css';

import NoteCreator from '../components/note';

const StickyNotesCreator = (() => {
  const notesZone = $('<div id="notes-zone" class="notes-zone"></div>');

  const create = (parent, preloadNotes) => {
    const container = notesZone.clone()
      .on('dblclick', onDblClick)
      .appendTo(parent);
    
    if (preloadNotes && preloadNotes.length) {
      preloadNotes.forEach(item => container.append(NoteCreator.createNote(item)));
    }

    return container;
  }

  const onDblClick = (event) => {
    const {layerX, layerY} = event.originalEvent,
      data = {
        offset: {left: layerX, top: layerY}
      };
    $(event.target).append(NoteCreator.createNote(data));  
  }

  const appendNotes = (container, items) => {
    if (items && items.length) {
      items.forEach(item => container.append(NoteCreator.createNote(item)));
    }
  }

  return {
    create: create,
    appendNotes: appendNotes
  }
})();

export default StickyNotesCreator;