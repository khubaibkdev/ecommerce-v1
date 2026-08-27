-- CreateTable
CREATE TABLE "AdminUser" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'owner',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "heroImage" TEXT NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "handle" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "vendor" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "price" REAL NOT NULL,
    "compareAtPrice" REAL,
    "image" TEXT NOT NULL,
    "hoverImage" TEXT NOT NULL,
    "categorySlug" TEXT NOT NULL,
    "productType" TEXT NOT NULL,
    "sizes" TEXT NOT NULL DEFAULT '[]',
    "tabs" TEXT NOT NULL DEFAULT '[]',
    "soldOut" BOOLEAN NOT NULL DEFAULT false,
    "countdown" BOOLEAN NOT NULL DEFAULT false,
    "reviews" INTEGER NOT NULL DEFAULT 0,
    "rating" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'published',
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "position" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Product_categorySlug_fkey" FOREIGN KEY ("categorySlug") REFERENCES "Category" ("slug") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProductSwatch" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "productId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "ProductSwatch_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BlogPost" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "handle" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "content" TEXT NOT NULL DEFAULT '',
    "status" TEXT NOT NULL DEFAULT 'published',
    "position" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Page" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "intro" TEXT NOT NULL,
    "body" TEXT NOT NULL DEFAULT '[]',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Media" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "altText" TEXT NOT NULL DEFAULT '',
    "uploadedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "HeroSlide" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "image" TEXT NOT NULL,
    "eyebrow" TEXT NOT NULL,
    "headingL1" TEXT NOT NULL,
    "headingL2" TEXT NOT NULL,
    "subheading" TEXT NOT NULL,
    "align" TEXT NOT NULL DEFAULT 'center',
    "buttonHref" TEXT NOT NULL DEFAULT '/shop/men',
    "position" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "GridBanner" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "image" TEXT NOT NULL,
    "eyebrow" TEXT NOT NULL,
    "headingL1" TEXT NOT NULL,
    "headingL2" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "buttonHref" TEXT NOT NULL DEFAULT '/shop/men',
    "position" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "SpringSlide" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "image" TEXT NOT NULL,
    "productHandle" TEXT NOT NULL,
    "topPos" TEXT NOT NULL DEFAULT '40%',
    "leftPos" TEXT NOT NULL DEFAULT '10%',
    "position" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "Testimonial" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "quote" TEXT NOT NULL,
    "subText" TEXT NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "InstagramImage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "image" TEXT NOT NULL,
    "link" TEXT NOT NULL DEFAULT '#',
    "position" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "RecentPurchase" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "handle" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "timeLabel" TEXT NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "siteName" TEXT NOT NULL DEFAULT 'Rosyz',
    "tagline" TEXT NOT NULL DEFAULT 'Fashion & Lifestyle Store',
    "logoLight" TEXT NOT NULL DEFAULT '/images/rosyz/logo.png',
    "logoDark" TEXT NOT NULL DEFAULT '/images/rosyz/logo-light.png',
    "favicon" TEXT NOT NULL DEFAULT '/favicon.ico',
    "footerDescription" TEXT NOT NULL DEFAULT 'Rosyz is a dynamic and innovative online fashion retailer bringing curated style to customers worldwide.',
    "contactPhone" TEXT NOT NULL DEFAULT '+ (08) 9055 0269',
    "contactEmail" TEXT NOT NULL DEFAULT 'example@example.com',
    "contactAddress" TEXT NOT NULL DEFAULT '50 Porana Place, West Casuarinas, Western Australia, Australia.',
    "facebookUrl" TEXT NOT NULL DEFAULT '#',
    "twitterUrl" TEXT NOT NULL DEFAULT '#',
    "instagramUrl" TEXT NOT NULL DEFAULT '#',
    "copyrightText" TEXT NOT NULL DEFAULT 'Rosyz. All rights reserved',
    "parallaxImage" TEXT NOT NULL DEFAULT '/images/rosyz/baner-bg.jpg',
    "parallaxEyebrow" TEXT NOT NULL DEFAULT 'Style Redefined',
    "parallaxHeadingL1" TEXT NOT NULL DEFAULT 'Your Passport to',
    "parallaxHeadingL2" TEXT NOT NULL DEFAULT 'Fashion Elegance',
    "parallaxText" TEXT NOT NULL DEFAULT 'Indulge in the art of fashion with Rosyz. Discover a world of sophistication and timeless elegance.',
    "parallaxButtonHref" TEXT NOT NULL DEFAULT '/shop/men',
    "newsletterEnabled" BOOLEAN NOT NULL DEFAULT true,
    "newsletterHeading" TEXT NOT NULL DEFAULT 'Stay Styled, Stay Informed!',
    "newsletterText" TEXT NOT NULL DEFAULT 'Unlock Fashion Secrets and Exclusive Offers! Join our fashion community and be the first to know about the latest trends, exclusive collections, and insider deals.',
    "newsletterImage" TEXT NOT NULL DEFAULT '/images/rosyz/newsletter.jpg',
    "cookieBarEnabled" BOOLEAN NOT NULL DEFAULT true,
    "cookieBarText" TEXT NOT NULL DEFAULT 'This website uses cookies to ensure you get the best experience on our website.',
    "announcementEnabled" BOOLEAN NOT NULL DEFAULT false,
    "announcementText" TEXT NOT NULL DEFAULT '',
    "bestSellerLimit" INTEGER NOT NULL DEFAULT 3,
    "seoTitle" TEXT NOT NULL DEFAULT 'Rosyz — Fashion & Lifestyle Store',
    "seoDescription" TEXT NOT NULL DEFAULT 'Discover the latest fashion trends at Rosyz — elevate your style with our exclusive collection.',
    "currencySymbol" TEXT NOT NULL DEFAULT '$',
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_username_key" ON "AdminUser"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Product_handle_key" ON "Product"("handle");

-- CreateIndex
CREATE UNIQUE INDEX "BlogPost_handle_key" ON "BlogPost"("handle");

-- CreateIndex
CREATE UNIQUE INDEX "Page_slug_key" ON "Page"("slug");
