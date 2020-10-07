import $ from 'jquery';
import '../../css/note-panel.css';

const ButtonPanelCreator = (() => {
  const panel = $('<div class="note-panel"></div>'),
    changeColorBtn = $('<button class="color-btn"> Color </button>'),
    saveBtn = $('<button class="save-btn"> Save </button>'),
    editBtn = $('<button class="edit-btn"> Edit </button>'),
    submitBtn = $('<button class="submit-btn hidden"> Submit </button>');

  const clickHandler = (event) => {
    event.stopPropagation();
  }
  
  const changeHidden = (elem) => {
    const isHidden = elem.hasClass('hidden');
    if (isHidden) {
      elem.removeClass('hidden');
    } else {
      elem.addClass('hidden');
    }
  }  

  const createPanel = (editHandler, submitHandler, saveHanlder, colorHandler) => {
    const newPanel = panel.clone(),
      newSaveBtn = saveBtn.clone(),
      newEditBtn = editBtn.clone(),
      newSubmitBtn = submitBtn.clone(),
      newColorBtn = changeColorBtn.clone(); 

    newSaveBtn.on('click', event => {
      clickHandler(event);
      newSubmitBtn.addClass('hidden');
      newEditBtn.removeClass('hidden');
      if (saveHanlder) {
        saveHanlder();
      }
    });

    newEditBtn.on('click', event => {
      clickHandler(event);
      changeHidden($(event.target));
      changeHidden(newSubmitBtn);
      editHandler();
    });

    newSubmitBtn.on('click', event => {
      clickHandler(event);
      changeHidden($(event.target));
      changeHidden(newEditBtn);
      submitHandler();
    });

    newColorBtn.on('click', event => {
      clickHandler(event);
      colorHandler();
    })

    newPanel.append(
      newSaveBtn,
      newColorBtn,
      newEditBtn, 
      newSubmitBtn
    );
    return newPanel;
  }

  return {
    createPanel: createPanel
  }
})();

export default ButtonPanelCreator;