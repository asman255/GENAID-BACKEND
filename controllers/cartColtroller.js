import userModel from "../models/userModel.js";

const getCart = async (req, res) => {
  try {
    //const { userId } = req.body;
    const userId = req.userId;
    //console.log("id from cart: ", userId);
    // console.log("this is userid in cart:", req.body.userId);
    // console.log("Request Body:", req.body);

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // console.log("User Found:", user);

    let cartData = await user.cartData;

    res.json({ success: true, cartData });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ message: "Error adding product to cart", error: error.message });
  }
};
const addToCart = async (req, res) => {
  try {
    const { productid, productname, image, price, quantity } =
      req.body.prodCart;
    const userId = req.userId;
    console.log("Request Body:", req.body);
    const cartProd = req.body.prodCart;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User Found:");

    // Initialize cartData if it doesn't exist
    if (!user.cartData) {
      user.cartData = {};
    }

    //console.log("Initial Cart Data:", user.cartData);

    // Ensure productId is a string and quantity is a number
    const productKey = productid.toString();
    const qty = Number(quantity);

    if (isNaN(qty) || qty <= 0) {
      return res.status(400).json({ message: "Invalid quantity" });
    }

    // Update cartData
    // console.log("DEBUG: ",user.cartData[2])
    // if (user.cartData[productKey]) {
    // user.cartData[productKey] += qty;
    // user.cartData[productKey].quantity = qty;
    // user.cartData[productKey] = cartProd;
    // console.log(
    //   `Updated quantity for product ${productKey}:`,
    //   user.cartData[productKey]
    // );
    // } else {
    //   user.cartData[productKey] = cartProd;
    //   console.log(`Added new product ${productKey} with quantity:`, qty);
    // }
    user.cartData[productKey] = cartProd;
    console.log(`Added new product ${productKey} with quantity:`, qty);

    // Force Mongoose to track changes to cartData
    user.markModified("cartData");

    // Save the updated user document
    await user.save();
    // console.log(
    //   "User saved successfully with updated cartData:",
    //   user.cartData
    // );

    // Verify the saved data from the database
    // const updatedUser = await userModel.findById(userId);
    // console.log('Updated user from database:', updatedUser);

    res.status(200).json({
      message: "Product added to cart successfully",
      cartData: user.cartData,
    });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ message: "Error adding product to cart", error: error.message });
  }
};

const updateCart = async (req, res) => {
  try {
    const { productid, quantity } = req.body.prodCart;
    const userId = req.userId;
    const user = await userModel.findById(userId);
    console.log("from update cart:", req.body.prodCart);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("here");
    // Ensure productId is a string and quantity is a number
    const productKey = productid.toString();
    const qty = Number(quantity);

    if (isNaN(qty) || qty <= 0) {
      return res.status(400).json({ message: "Invalid quantity" });
    }

    if (user.cartData[productKey]) {
      user.cartData[productKey].quantity += quantity;
      console.log(
        `Updated quantity for product ${productKey}:`,
        user.cartData[productKey]
      );
    } else {
      return res.status(404).json({ message: "Product not found" });
    }

    // Force Mongoose to track changes to cartData
    user.markModified("cartData");

    // Save the updated user document
    await user.save();
    console.log(
      "User saved successfully with updated cartData:",
      user.cartData
    );

    // Verify the saved data from the database
    // const updatedUser = await userModel.findById(userId);
    // console.log('Updated user from database:', updatedUser);

    res.status(200).json({
      message: "Product added to cart successfully",
      cartData: user.cartData,
    });

    console.log("User Found:", user);
  } catch (error) {}
};

const delCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.userId;
    console.log("Request Body delete:", req.body);

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // console.log("User Found:", user);

    // Initialize cartData if it doesn't exist
    if (!user.cartData) {
      user.cartData = {};
    }

    console.log("Initial Cart Data:", user.cartData);

    // Ensure productId is a string and quantity is a number
    const productKey = productId.toString();

    // Update cartData
    // console.log("DEBUG: ",user.cartData[2])
    if (user.cartData[productKey]) {
      delete user.cartData[productKey];
      console.log(
        `delete for product ${productKey}:`,
        user.cartData[productKey]
      );
    } else {
      // user.cartData[productKey] = qty;
      console.log(`delete product ${productKey} `);
    }

    // Force Mongoose to track changes to cartData
    user.markModified("cartData");

    // Save the updated user document
    await user.save();
    console.log(
      "User saved successfully with updated cartData:",
      user.cartData
    );

    // Verify the saved data from the database
    // const updatedUser = await userModel.findById(userId);
    // console.log('Updated user from database:', updatedUser);

    res.status(200).json({
      message: "Product deleted from cart successfully",
      cartData: user.cartData,
    });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ message: "Error adding product to cart", error: error.message });
  }
};

export { addToCart, updateCart, delCart, getCart };
