import { atom, selector } from "recoil";

export const exportModalState = atom({
  key: "exportModal",
  default: false,
});

export const infoAlertState = atom({
  key: "infoAlert",
  default: {
    pk: '',
    name: '',
    type: '',
  }
})

const defaultData = [];

export const listExportState = atom({
  key: "listExport",
  default: defaultData,
});

export const pendingListState = selector({
  key: "pendingList",
  get: ({ get }) => {
    const list = get(listExportState);
    return list.filter((item) => item.status === "PENDING");
  },
  set: ({ get, set }, newValue) => {
    const list = get(listExportState);


    if (newValue.action === "add") { 
      const newExport = {
        id: newValue.id,
        status: "PENDING",
        name: newValue.name,
        type: newValue.type,
      };
      set(listExportState, [...list, newExport]);}
    if (newValue.action === "remove") { 
        const newList = list.filter((item) => item.id !== newValue.id);
        set(listExportState, [...newList]);
    }
    
  },
});

export const successListState = selector({
  key: "successList",
  get: ({ get }) => {
    const list = get(listExportState);
    return list.filter((item) => item.status === "SUCCESS");
  },
  set: ({ get, set }, id) => {
    const list = get(listExportState);
    set(
        listExportState,
      list.map((item) =>
        item.id === id ? { ...item, status: 'SUCCESS' } : item
      )
    );
  },
});

export const failureListState = selector({
  key: "failureList",
  get: ({ get }) => {
    const list = get(listExportState);
    return list.filter((item) => item.status === "FAILURE");
  },
  set: ({ get, set }, id) => {
    const list = get(listExportState);
    set(
        listExportState,
      list.map((item) =>
        item.id === id ? { ...item, status: 'FAILURE' } : item
      )
    );
  },
});
