export const ironOptions = {
  cookieName: "univportalname",
  password: "ishimweLeon^&@LEonhjjhj%rfhh$3e",
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export const departments = [
  "Bilgisayar Mühendisliği",
  "Kimya Mühendisliği",
  "İşleyme",
];
export const countries = ["Rwanda", "Türkiye", "USA"];

export const years = [1, 2, 3, 4];
