type BackgroundSource = ReturnType<typeof require> | { uri: string };

export const useBackground = () => {
  function getBackgroundSource(background: string | number): BackgroundSource {
    if (typeof background === "number") {
      return background;
    }

    if (typeof background === "string") {
      // предполагаем, что это имя файла с сервера, делаем uri
      return { uri: `https://your-server.com/images/${background}` };
    }

    return require("../../assets/images/dark_room.jpg");
  }

  return {
    getBackgroundSource,
  };
};
