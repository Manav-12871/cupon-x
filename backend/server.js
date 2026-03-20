require("dotenv").config();
const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());
app.use(cors());

// Initialize Firebase Admin SDK
let serviceAccount;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  // Production / Cloud: Parse the service account from environment variable
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
} else {
  // Local Development: Use the local file
  serviceAccount = require(path.join(__dirname, "firebase-config.json"));
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Route to check if API is running
app.get("/", (req, res) => {
  res.send("🔥 Coupon API is running!");
});

// Route to add a new coupon
app.post("/add-coupon", async (req, res) => {
  try {
    const { title, price, platform, sellerId, sellerEmail } = req.body;
    if (!title || price === undefined || !platform || !sellerId || !sellerEmail) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newCoupon = {
      title,
      price: Number(price),
      platform,
      sellerId,
      sellerEmail,
      status: "available",
      createdAt: admin.firestore.Timestamp.now(),
    };

    const docRef = await db.collection("coupons").add(newCoupon);
    res.status(201).json({ message: "Coupon added successfully!", id: docRef.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to fetch all coupons (Available & Sold)
app.get("/coupons", async (req, res) => {
  try {
    const snapshot = await db.collection("coupons").get();
    const coupons = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(coupons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to verify and buy a coupon
app.post("/buy-coupon", async (req, res) => {
  try {
    const { couponId, buyerId } = req.body;

    if (!couponId || !buyerId) {
      return res.status(400).json({ error: "Coupon ID and Buyer ID are required" });
    }

    const couponRef = db.collection("coupons").doc(couponId);
    const coupon = await couponRef.get();

    if (!coupon.exists) {
      return res.status(404).json({ error: "Coupon not found" });
    }

    if (coupon.data().status === "sold") {
      return res.status(400).json({ error: "Coupon has already been purchased" });
    }

    // Mark as sold instead of deleting
    await couponRef.update({
      status: "sold",
      buyerId,
      purchasedAt: admin.firestore.Timestamp.now()
    });

    res.status(200).json({ message: "Coupon purchased successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to delete a coupon (only by the seller)
app.post("/delete-coupon", async (req, res) => {
  try {
    const { couponId, userId } = req.body;

    if (!couponId || !userId) {
      return res.status(400).json({ error: "Coupon ID and User ID are required" });
    }

    const couponRef = db.collection("coupons").doc(couponId);
    const coupon = await couponRef.get();

    if (!coupon.exists) {
      return res.status(404).json({ error: "Coupon not found" });
    }

    if (coupon.data().sellerId !== userId) {
      return res.status(403).json({ error: "Unauthorized: Only the seller can delete this coupon" });
    }

    if (coupon.data().status === "sold") {
      return res.status(400).json({ error: "Cannot delete a sold coupon" });
    }

    await couponRef.delete();
    res.status(200).json({ message: "Coupon deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to fetch a user's sales (listings)
app.get("/my-sales/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const snapshot = await db.collection("coupons").where("sellerId", "==", userId).get();
    const coupons = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(coupons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to fetch a user's purchases
app.get("/my-purchases/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const snapshot = await db.collection("coupons").where("buyerId", "==", userId).get();
    const coupons = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(coupons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});

app.use((req, res, next) => {
  console.log(`📌 Received ${req.method} request on ${req.url}`);
  next();
});