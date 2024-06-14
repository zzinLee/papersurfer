import type { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { FaDeleteLeft } from "react-icons/fa6";

import useCollectionId from "../../hooks/useCollectionId";
import useCollectionStore from "../../stores/collection";
import usePaperStore from "../../stores/paper";
import useChartStore from "../../stores/chart";
import type { PaperStoreState, ChartStoreState } from "../../types/interface";

interface CollectionProps {
  collectionKey: string;
  collectionName: string;
}

function Collection({ collectionKey, collectionName }: CollectionProps) {
  const navigator = useNavigate();
  const collectionId = useCollectionId();
  const { deleteCollectionFromStore } = useCollectionStore();
  const { deleteCollectionFromChart, deleteStarCollection } = useChartStore() as ChartStoreState;
  const { deleteAllPaperFromCollection } = usePaperStore() as PaperStoreState;
  const isRoot = collectionKey === collectionId;
  const backgroundColor = isRoot ? "bg-indigo-100" : "bg-transWhite";
  const fontColor = isRoot ? "text-indigo-700" : "text-black";

  const deleteCollection = (ev: MouseEvent<SVGElement>) => {
    ev.stopPropagation();

    deleteCollectionFromStore(collectionKey);
    deleteAllPaperFromCollection(collectionKey);
    deleteCollectionFromChart(collectionKey);
    deleteStarCollection(collectionKey);

    navigator("/");
  };

  const clickCollection = () => {
    if (!collectionId) {
      navigator(`/${collectionKey}/search`);

      return;
    }

    if (collectionId === collectionKey) {
      navigator("/");
    } else {
      navigator(`/${collectionKey}/search`);
    }
  };

  return (
    <li
      className={`inline-flex hover:bg-indigo-400 hover:text-white p-8 rounded-sm mx-4 my-2 ${backgroundColor} ${fontColor}`}
      onClick={clickCollection}
    >
      <div className="flex-1 px-4 break-words min-w-120 text-balance font-pretendard">
        {collectionName}
      </div>
      <button className="font-bold rounded-sm">
        <FaDeleteLeft
          size="24"
          onClick={deleteCollection}
        />
      </button>
    </li>
  );
}

export default Collection;
