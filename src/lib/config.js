export const ironOptions = {
    cookieName: "univportalname",
    password: "ishimweLeon^&@LEonhjjhj%rfhh$3e",
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  };