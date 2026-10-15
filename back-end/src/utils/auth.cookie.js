export const ACCESS_TOKEN_COOKIE = "accessToken";

export const accessTokenCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 15 * 24 * 60 * 60 * 1000,
    path: "/",
};
