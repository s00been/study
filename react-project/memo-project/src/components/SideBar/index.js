import MemoList from '../MemoList';
import SideBarFooter from '../SideBarFooter';
import SideBarHeader from '../SideBarHeader';
import './index.css';

function SideBar({
  memos,
  setSelectedMemoIndex,
  selectedMemoIndex,
  addMemo,
  deleteMemo,
}) {
  return (
    <div className="SideBar">
      <SideBarHeader />
      <MemoList
        memos={memos}
        setSelectedMemoIndex={setSelectedMemoIndex}
        selectedMemoIndex={selectedMemoIndex}
        deleteMemo={deleteMemo}
      />
      <SideBarFooter onClickAdd={addMemo} />
    </div>
  );
}

export default SideBar;
