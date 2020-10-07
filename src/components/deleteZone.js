import $ from 'jquery';
import '../../css/delete-zone.css';

const DeleteZoneCreator = (() => {
  const deleteZone = $(`
    <div class="delete-zone">
      <h1>Move a note here to Delete</h1>
    </div>`);

    const create = (parent) => {
      return deleteZone.clone().appendTo(parent);
    }
    return {
      create,
    }
})();

export default DeleteZoneCreator;