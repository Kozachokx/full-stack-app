export const formatDate = (dateStr) => {
  try {
    const date = new Date(dateStr).toISOString().split("T")[0].split("-");
    return `${date[2]}.${date[1]}.${date[0]}`;
  } catch (error) {
    return `${dateStr}`;
  }
};
