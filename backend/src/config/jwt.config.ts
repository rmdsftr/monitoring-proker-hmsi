export const jwtConfig = {
    secret: process.env.JWT_SECRET || 'hmsi-monitoring-proker-web',
    accessTokenExpiry: process.env.JWT_EXPIRES_IN || '15m',
    refreshTokenExpiry: process.env.REFRESH_EXPIRES_IN || '7d',
    issuer: 'hmsi'
};