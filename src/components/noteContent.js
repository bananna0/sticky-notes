import $ from 'jquery';
import '../../css/note-content.css';

const NoteContentCreator = (() => {
  const noteContent = $(`
    <div class="note-content">
      <p class="note-text"></p>
      <textarea class="note-text-editable hidden"></textarea>
    </div>
  `);

  const toggleText = (event) => {
    const item = $(event.target),
      note = item.find('.note-text'),
      editableNote = item.find('.note-text-editable');

    if (note.hasClass('hidden')) {
      const text = editableNote.val();
      note.text(text);
      note.removeClass('hidden');
      editableNote.addClass('hidden');
    } else {
      const text = note.text();
      editableNote.val(text);
      note.addClass('hidden');
      editableNote.removeClass('hidden');
    }
  };

  const reset = (event) => {
    const item = $(event.target),
      note = item.find('.note-text'),
      editableNote = item.find('.note-text-editable');
    const text = editableNote.val();
    if (text) {
      note.text(text);
    }
    note.removeClass('hidden');
    editableNote.addClass('hidden');
  };

  const createContent = (text) => {
    const content = noteContent.clone();
    content.on('text:toggle', toggleText);
    content.on('text:reset', reset);
    content.find('.note-text').text(text);
    content.find('.note-text-editable')
      .on('mousedown', event => {
        event.stopPropagation()
      });
    return content;
  }

  return {
    createContent,
  }
})();

export default NoteContentCreator;