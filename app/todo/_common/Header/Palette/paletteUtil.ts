export const isMongoBoard = (id: string) =>
  /^[a-f\d]{24}$/i.test(id);

export const getImageTheme = (src: string) => `img:${src}`;