// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { processResult } from "immer/dist/internal";

// export const roomsApi = createApi({
//   reducerPath: "rooms",
//   baseQuery: fetchBaseQuery({
//     baseUrl: process.env.REACT_APP_FAST_API,
//   }),
//   tagTypes: ["RoomList"],
//   endpoints: (builder) => ({
//     getRooms: builder.query({
//       query: () => "/api/rooms",
//       providesTags: ["RoomList"],
//     }),
//   }),
// });

// export const { useGetRoomsQuery } = roomsApi;
