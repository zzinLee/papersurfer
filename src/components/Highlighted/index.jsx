function Highlighted({ elem, resetElemList, elemList }) {
  const deleteHighlightedElem = (ev) => {
    ev.preventDefault();

    const deletedElementList = elemList.filter(({ id }) => id !== elem.id);

    resetElemList(deletedElementList);
  };

  return (
    <li className="flex items-center justify-between text-12 bg-stone-50 text-stone-700">
      <div className="px-4 mr-2 text-pretty">{elem.targetString}</div>
      <button className="px-4 text-white rounded-md bg-stone-700 min-w-35 text-pretty" onClick={deleteHighlightedElem}>
        삭제
      </button>
    </li>
  );
}

export default Highlighted;
