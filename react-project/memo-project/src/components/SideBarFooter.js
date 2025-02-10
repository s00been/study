function SideBarFooter({ onClick }) {
  return (
    <div className="SideBarFooter">
      <button className="SideBarFooter__add_button" onClick={onClick}>
        +
      </button>
    </div>
  );
}

export default SideBarFooter;
