"use server";

export const getProjectId = async () => {
  const projectId = process.env.WALLET_CONNECT_PROJECT_ID ?? "";
  return projectId;
};
