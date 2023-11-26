export const selectIsLoading = (state) => state.user.isLoading;

export const selectUser = (state) => state.user.user;

export const selectError = (state) => state.user.error;

export const selectUserAvatar = (state) => state.user.user.image;
