'use strict';
import $ from 'jquery';

import { makeServer } from './server';

import noteStore from './src/noteStore';
import StickyNotesCreator from './src/components/stickyNotes';
import DeleteZoneCreator from './src/components/deleteZone';

function preleminaries() {
  DeleteZoneCreator.create('body');
  const container = StickyNotesCreator.create('body');

  noteStore.loadData()
    .then(() => {
      const notes = Object.values(noteStore.notes);
      StickyNotesCreator.appendNotes(container, notes);
    });
}

makeServer();

$(preleminaries);
