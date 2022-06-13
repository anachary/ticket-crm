import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tickets: [],
  isLoading: false,
  error: "",
  replyTicketError: "",
  searchTicketList: [],
  selectedTicket: '',
  replyMsg: "",
};

const ticketListSlice = createSlice({
  name: "ticketList",
  initialState,
  reducers: {
    fetchTicketLoading: (state) => {
      state.isLoading = true;
    },
    fetchTicketSuccess: (state, action) => {
      state.tickets = action.payload;
      state.searchTicketList = action.payload;
      state.isLoading = false;
    },
    fetchTicketFail: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    searchTickets: (state, { payload }) => {
      state.searchTicketList = state.tickets.filter((row) => {
        if (!payload) return row;
        
        if (!row){
          return row
        }

        let returnResult = true;
        const keys = Object.keys(payload)
        keys.forEach((key)=>{
          if(payload[key]){
            if(payload[key].toLowerCase() === "assigned"){
              returnResult = (row[key].toLowerCase() === payload[key].toLocaleLowerCase()) && returnResult;
            }
            else {
            returnResult = (row[key].toLowerCase().includes(payload[key].toLowerCase())) && returnResult
            }
          }
        })

        return returnResult;
      });
    },
    fetchSingleTicketLoading: (state) => {
      state.isLoading = true;
    },
    fetchSingleTicketSuccess: (state, { payload }) => {
      state.selectedTicket = payload;
      state.isLoading = false;
      state.error = "";
    },
    fetchSingleTicketFail: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    resetResponseMsg: (state) => {
      state.isLoading = false;
      state.replyTicketError = "";
      state.replyMsg = "";
    }
  }
});


const { reducer, actions } = ticketListSlice;

export const {
  fetchTicketLoading,
  fetchTicketSuccess,
  fetchTicketFail,
  fetchSingleTicketLoading,
  fetchSingleTicketSuccess,
  fetchSingleTicketFail,
  searchTickets,
  resetResponseMsg
} = actions;

export default reducer;
