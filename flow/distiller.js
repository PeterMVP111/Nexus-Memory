export function distill(memoryData) {
      if (!Array.isArray(memoryData)) return [];

  return memoryData.filter(item => {
          if (item.keep === true) return true;
          if (item.avoid === true) return false;
          if (item.note && item.note.trim().length > 5) return true;
          return false;
  });
}
