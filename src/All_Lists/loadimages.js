export function loadImages(folder) {
    try {
      const context = require.context(`../assets/${folder}`, false, /\.(jpg|jpeg|png)$/);
      return context.keys().map(context);
    } catch (error) {
      console.error(`Error loading images from folder: ${folder}`, error);
      return [];
    }
  }  