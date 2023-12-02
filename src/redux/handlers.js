export const handleFulfilled = (state) => {
  state.isLoading = false;
  state.error = null;
};

export const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

export const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = {
    message: action?.payload?.response?.data?.message,
    status: action?.payload?.response?.status,
  };
};
