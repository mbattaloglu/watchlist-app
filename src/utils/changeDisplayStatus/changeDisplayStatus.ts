const changeDisplayStatus = (
  elementRef: HTMLElement | null,
  status: string,
) => {
  if (!elementRef) {
    throw new Error("Element not found");
  }
  elementRef.style.display = status;
};

export default changeDisplayStatus;
