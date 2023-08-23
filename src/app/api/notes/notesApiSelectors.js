import { createSelector } from "@reduxjs/toolkit";
import { notesApiSlice, notesAdapter, initialState } from "./notesApiSlice";


//returns the query result object 
export const selectNotesResult = notesApiSlice.endpoints.getNotes.select()

const selectNotesData = createSelector(
    selectNotesResult,
    notesResult => notesResult.data 
)

export const {
    selectAll: selectAllNotes,
    selectById: selectNoteById,
    selectIds: selectNoteIds
} = notesAdapter.getSelectors(state => selectNotesData(state) ?? initialState)