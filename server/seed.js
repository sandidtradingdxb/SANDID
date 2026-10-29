require("dotenv").config();
const mongoose = require("mongoose");
const Category = require("./models/Category");
const Product = require("./models/Product");
const User = require("./models/User");

// Note: the products below are SAMPLE listings with placeholder AED prices and no images.
// Replace them (Admin > Products) with your real catalogue and prices before going live.
async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected. Seeding...");

  await Promise.all([Category.deleteMany({}), Product.deleteMany({})]);

  const categories = await Category.insertMany([
    { name: "Watches", slug: "watches", vertical: "watches", kind: "device" },
    { name: "Watch Parts & Accessories", slug: "watch-parts-accessories", vertical: "watches", kind: "accessory" },
    { name: "Computers", slug: "computers", vertical: "computers", kind: "device" },
    { name: "Computer Parts & Accessories", slug: "computer-parts-accessories", vertical: "computers", kind: "accessory" },
    { name: "Mobile Phones", slug: "mobile-phones", vertical: "mobile", kind: "device" },
    { name: "Mobile Parts & Accessories", slug: "mobile-parts-accessories", vertical: "mobile", kind: "accessory" },
    { name: "Electronic Appliances", slug: "electronic-appliances", vertical: "appliances", kind: "device" },
    { name: "Appliance Parts & Accessories", slug: "appliance-parts-accessories", vertical: "appliances", kind: "accessory" },
  ]);

  const byslug = Object.fromEntries(categories.map((c) => [c.slug, c._id]));

  // Helper: [minQty, maxQty|undefined, price]
  const tiers = (...t) => t.map(([minQty, maxQty, pricePerUnit]) => ({ minQty, ...(maxQty ? { maxQty } : {}), pricePerUnit }));

  await Product.insertMany([
    {
      sku: "WCH-1001", name: "Quartz Wrist Watch (Sample Listing)", category: byslug["watches"],
      description: "Sample listing. Replace with your real watch models, brands and prices.",
      moq: 20, unit: "pcs", priceTiers: tiers([20, 99, 30], [100, undefined, 26]), stockQty: 0, isFeatured: true,
    },
    {
      sku: "WCH-ACC-1101", name: "Watch Strap Assortment (Sample Listing)", category: byslug["watch-parts-accessories"],
      description: "Sample listing for watch spare parts and accessories.",
      moq: 50, unit: "pcs", priceTiers: tiers([50, 199, 6], [200, undefined, 5]), stockQty: 0,
    },
    {
      sku: "CMP-2001", name: "Laptop (Sample Listing)", category: byslug["computers"],
      description: "Sample listing. Replace with your real computer models, specs and prices.",
      moq: 5, unit: "pcs", priceTiers: tiers([5, 19, 1200], [20, undefined, 1100]), stockQty: 0, isFeatured: true,
    },
    {
      sku: "CMP-ACC-2101", name: "Wireless Keyboard & Mouse Set (Sample Listing)", category: byslug["computer-parts-accessories"],
      description: "Sample listing for computer peripherals, spare parts and accessories.",
      moq: 20, unit: "set", priceTiers: tiers([20, 99, 35], [100, undefined, 30]), stockQty: 0,
    },
    {
      sku: "MOB-3001", name: "Smartphone (Sample Listing)", category: byslug["mobile-phones"],
      description: "Sample listing. Replace with your real phone models, brands and prices.",
      moq: 10, unit: "pcs", priceTiers: tiers([10, 49, 450], [50, undefined, 420]), stockQty: 0, isFeatured: true,
    },
    {
      sku: "MOB-ACC-3101", name: "Phone Case & Screen Protector Pack (Sample Listing)", category: byslug["mobile-parts-accessories"],
      description: "Sample listing for mobile spare parts and accessories.",
      moq: 50, unit: "pack", priceTiers: tiers([50, 199, 8], [200, undefined, 7]), stockQty: 0,
    },
    {
      sku: "APL-4001", name: "Electronic Appliance (Sample Listing)", category: byslug["electronic-appliances"],
      description: "Sample listing. Replace with your real electronic appliances and prices.",
      moq: 10, unit: "pcs", priceTiers: tiers([10, 49, 150], [50, undefined, 135]), stockQty: 0, isFeatured: true,
    },
    {
      sku: "APL-ACC-4101", name: "Appliance Spare Part (Sample Listing)", category: byslug["appliance-parts-accessories"],
      description: "Sample listing for appliance spare parts and accessories.",
      moq: 50, unit: "pcs", priceTiers: tiers([50, undefined, 12]), stockQty: 0,
    },
  ]);

  const adminEmail = process.env.ADMIN_EMAIL || "admin@yourcompany.com";
  const existingAdmin = await User.findOne({ email: adminEmail });
  if (!existingAdmin) {
    await User.create({
      fullName: "Site Admin",
      email: adminEmail,
      password: process.env.ADMIN_PASSWORD || "changeme123",
      phone: "0000000000",
      businessName: "Platform Admin",
      role: "admin",
      approvalStatus: "approved",
    });
    console.log(`Admin created: ${adminEmail}`);
  }

  console.log("Seed complete.");
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
