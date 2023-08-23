const textAnalize = async (_, { username, email }) => {
  const params = { username, email };
  try {
    const userInfo = await getUser(null, {
      username,
      email,
    });
    if (!userInfo) {
      throw new Error("User not found.");
    }

    return userInfo.notes;
  } catch (error) {
    throw new Error(`Failed to fatch notes -> ${error.message}`);
  }
};


module.exports = { Analize };
