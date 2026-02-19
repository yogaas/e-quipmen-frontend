import type { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import type { AsyncThunk } from "@reduxjs/toolkit";

type ShowToast = (message: string, type?: "success" | "error" | "info") => void;

/**
 * Dispatch an async thunk and show toast on success/error.
 * Use for create/update flows so CRUD forms don't repeat the same result handling.
 */
export async function handleThunkWithToast<T>(
  dispatch: ThunkDispatch<unknown, unknown, AnyAction>,
  thunk: AsyncThunk<T, any, any>,
  args: any,
  options: {
    onSuccess?: () => void;
    onSuccessMessage?: string;
    showToast: ShowToast;
  },
): Promise<{ success: boolean }> {
  const result = await dispatch(thunk(args));
  if (thunk.rejected.match(result)) {
    const message = (result.payload as string) || "Terjadi kesalahan.";
    options.showToast(message, "error");
    return { success: false };
  }
  options.showToast(
    options.onSuccessMessage ?? "Data berhasil disimpan.",
    "success",
  );
  options.onSuccess?.();
  return { success: true };
}
