'use strict';
import $ from 'jquery';
import { nanoid } from 'nanoid';

class NoteStore {
  notes = {};

  constructor() {
    this.getDataFromStore();
  }

  loadData() {
    return $.get('api/notes')
      .then(result => {
        this.notes = {
          ...this.notes,
          ...result?.notes
        }
      })
  }

  sendData() {
    return $.ajax({
      url: 'api/notes',
      type: 'POST',
      data: JSON.stringify(this.notes),
      processData: false,
      contentType: "application/json; charset=UTF-8"
    });
  }
  
  getDataFromStore() {
    this.notes = localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : {};
  }

  saveDataToStore() {
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  appendData(newNote) {
    this.notes[newNote.id] = newNote;
    this.saveDataToStore();
    this.sendData();
  }

  removeData(id) {
    delete this.notes[id];
    this.saveDataToStore();
    this.sendData();
  }

  createId() {
    return nanoid();
  }
}

const noteStore = new NoteStore();
export default noteStore;