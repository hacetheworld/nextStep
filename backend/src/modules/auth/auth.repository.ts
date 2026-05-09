import prisma from '../../config/database';

export const authRepository = {
  /** Find user by Google ID */
  findByGoogleId: async (googleId: string) => {
    return prisma.user.findUnique({ where: { googleId } });
  },

  /** Find user by ID */
  findById: async (id: string) => {
    return prisma.user.findUnique({ where: { id } });
  },

  /** Create a new user */
  create: async (data: { email: string; name: string; googleId: string }) => {
    return prisma.user.create({ data });
  },
};
