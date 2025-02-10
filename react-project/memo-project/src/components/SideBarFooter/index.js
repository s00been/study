import './index.css';

function SideBarFooter({ onClickAdd }) {
  return (
    <div className="SideBarFooter">
      <button className="SideBarFooter__add_button" onClick={onClickAdd}>
        +
      </button>
    </div>
  );
}

export default SideBarFooter;
