import NoteCategory from "../NoteCategory";

const tabs = [
  {
    id: "notes",
    name: "Notes",
    selected: true,
    visibleCategories: [NoteCategory.pinned, NoteCategory.others]
  },
  {
    id: "archive",
    name: "Archive",
    selected: false,
    visibleCategories: [NoteCategory.archive]
  },
  {
    id: "pinned",
    name: "Pinned",
    selected: false,
    visibleCategories: [NoteCategory.pinned]
  },
  {
    id: "trash",
    name: "Trash",
    selected: false,
    visibleCategories: [NoteCategory.trash]
  }
];
export default tabs;
