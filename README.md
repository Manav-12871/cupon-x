# CouponX: The Ultimate Peer-to-Peer Coupon Exchange 🎟️

CouponX is an innovative marketplace platform designed to bridge the gap between users with spare discount vouchers and those searching for deals. It actively prevents coupon wastage by providing a seamless, secure, and beautiful ecosystem to trade digital coupons.

## 🌟 Main Aim
The primary goal of CouponX is to create a hyper-local circular economy for digital discounts. It empowers users to instantly monetize their unused promo codes from platforms like Swiggy, Zomato, BookMyShow, and Myntra, while simultaneously helping other users save money on their daily transactions.

## 🚀 Core Features & Modes

CouponX is split into three primary interactive modes, offering a tailored experience for both buyers and sellers:

### 1. Buy Coupons Mode (Marketplace)
A dynamic, 3D-styled browsing layout featuring categorized deals.
- **Live Search & Filtering:** Instantly filter deals by brand (e.g., Zomato, Amazon) or search by keyword.
- **One-Click Purchasing:** Securely buy a coupon. Once purchased, the coupon is instantly marked as **Sold Out** universally across the application to prevent double-spending.

### 2. Sell Coupons Mode (Listing Creation)
A streamlined, intuitive creation flow where users can quickly post their unused vouchers.
- **Customization:** Set your own price, specify the platform, and provide the exact promo code.
- **Instant Live Injection:** Submitted coupons instantly bypass the backend and appear live on the global marketplace.

### 3. User Dashboard Mode (My Profile)
A highly personalized ledger offering users complete control over their transaction history.
- **My Listings:** Automatically fetches and displays all the coupons you have put up for sale. Shows real-time status updates (Available vs Sold) and provides a fast **Delete** option for available listings.
- **My Purchases:** A separate, secure catalog of every coupon you have bought, permanently tracking the original seller for transparency.

## 🛠️ Technology Stack
- **Frontend:** React.js, React-Bootstrap, React Router DOM
- **Backend:** Node.js, Express.js, CORS
- **Database:** Firebase Firestore (NoSQL)
- **Authentication:** Firebase Auth (Email/Password Integration)
- **UI Design:** Glassmorphic modern interface with custom CSS animations and 3D floating background elements.

## 🔒 Security
- **Identity Tracking:** All transactions heavily rely on unique Firebase UID binding. Users cannot purchase their own coupons, and deletions are strictly protected.
- **Dynamic Routing:** All protected pages intercept unauthenticated users and forcefully redirect them to the Login screen.
