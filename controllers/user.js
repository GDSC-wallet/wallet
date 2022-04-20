const secret = 'test';

export const signUp = async (req, res) => {
  try {
    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
export const getUserProfile = async (req, res) => {
  try {
    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};