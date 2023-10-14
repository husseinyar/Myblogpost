

import User from  "../models/User.js";
/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    res.status(200).json(user);
   
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
// exports.addRemoveFriend = async (req, res) => {
//   try {
//     const { id, friendId } = req.params;
//     const user = await User.findById(id);
//     const friend = await User.findById(friendId);
//     if (id === friendId) {
    
//       res.status(400).json({ message: err.message })
//       return;
//     }
//     if (user.friends.includes(friendId)) {
//       user.friends = user.friends.filter((id) => id !== friendId);
//       friend.friends = friend.friends.filter((id) => id !== id);
//     } else {
//       user.friends.push(friendId);
//       friend.friends.push(id);
//     }
//     await user.save();
//     await friend.save();

//     const friends = await Promise.all(
//       user.friends.map((id) => User.findById(id))
//     );
//     const formattedFriends = friends.map(
//       ({ _id, firstName, lastName, occupation, location, picturePath }) => {
//         return { _id, firstName, lastName, occupation, location, picturePath };
//       }
//     );

//     res.status(200).json(formattedFriends);
//   } catch (err) {
//     res.status(404).json({ message: err.message });
//   }
// };


// This route handler is responsible for managing the friendships between users.

export const addRemoveFriend = async (req, res) => {
  try {
    // Extract user and friend IDs from the request parameters.
    const { id, friendId } = req.params;

    // Retrieve user and friend records from the database based on their IDs.
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    // Check if the user is attempting to befriend themselves (an invalid operation).
    if (id === friendId) {
      res.status(400).json({ message: "You cannot befriend yourself." });
      return; // Exit the function early to prevent further processing.
    }

    // Check if the friend is already in the user's friends list.
    if (user.friends.includes(friendId)) {
      // If the friend is found, remove them from the user's friends list.
      user.friends = user.friends.filter((friend) => friend !== friendId);

      // Remove the user's ID from the friend's friends list to maintain consistency.
      friend.friends = friend.friends.filter((f) => f !== id);
    } else {
      // If the friend is not in the user's friends list, add them.
      user.friends.push(friendId);

      // Add the user's ID to the friend's friends list.
      friend.friends.push(id);
    }

    // Save the updated user and friend records in the database.
    await user.save();
    await friend.save();

    // Retrieve information about the user's friends.
    const friends = await Promise.all(
      user.friends.map((friendId) => User.findById(friendId))
    );

    // Format the friend information to include selected attributes.
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    // Respond with a 200 status code and the formatted list of friends.
    res.status(200).json(formattedFriends);
  } catch (err) {
    // Handle any errors that may occur during this process with a 404 status code.
    res.status(404).json({ message: err.message });
  }
};
