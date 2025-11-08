import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sprout,
  Phone,
  ShieldCheck,
  CheckCircle2,
  Leaf,
  ScrollText,
  FlaskConical,
  Handshake,
  Store,
  Wheat,
  ShoppingCart,
  CloudSun,
  Droplets,
  Wind,
  CloudRain,
  ArrowRight,
  Users,
  MessageSquare,
  Languages,
  Hash,
  Rocket,
  ClipboardList,
  Home,
  Settings,
  Cog,
  Wallet,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-farmer.jpg";
import { fetchWeatherByCity, type WeatherResponse } from "@/services/weatherService";

type Language = "en" | "hi" | "kn";

const translations = {
  en: {
    badge: "YOUR FARMING HUB",
    heroTitle: "Your Farm. Your Rules. Your Success.",
    heroSubtitle: "Everything you need to grow, sell, and thrive—right at your fingertips.",
    dashboardGreeting: "Namaste, Ramesh!",
    village: "Village: Kadur",
    district: "District: Hassan",
    state: "Karnataka",
    languageLabel: "Language",
    dashboardHeaderBadge: "Farmer Dashboard Header",
    dpinLabel: "DPIN 7F4A-23K9",
    dashboardDescription: "Farmers land on this screen right after OTP, with everything they need in two taps—sell crops, check soil, connect with inputs or buyers, and stay weather ready.",
    verifiedFarmer: "Verified Farmer",
    quickActionsTitle: "Daily tools at your fingertips",
    quickActionsSubtitle: "Tap a card and jump straight into the work you need.",
    sellCrops: "Sell Crops",
    sellCropsDesc: "List produce in 60 seconds.",
    checkSoil: "Check Soil Health",
    checkSoilDesc: "AI insights for soil & leaves.",
    vendorConnect: "Vendor Connect",
    vendorConnectDesc: "Trusted inputs & advisory.",
    buyerConnect: "Buyer Connect",
    buyerConnectDesc: "Talk to verified buyers.",
    borrowLend: "Borrow / Lend Tools",
    borrowLendDesc: "Share tractors, pumps, sprayers.",
    cropName: "Crop name",
    quantity: "Quantity",
    expectedPrice: "Expected price",
    traceabilityHash: "Instant traceability hash",
    uploadPhoto: "Upload or click photo",
    healthGrade: "Health grade",
    fertilizerAdvice: "Fertilizer & watering advice",
    verifiedVendors: "Verified vendors",
    ratingsReviews: "Ratings & reviews",
    bestPrices: "Best prices nearby",
    buyerVerification: "Buyer verification",
    offerPrice: "Offer price insight",
    contactApproval: "Contact approval",
    postNeeds: "Post needs/offers",
    villageVisibility: "Village-level visibility",
    dpinPrivacy: "DPIN-protected privacy",
    start: "Start",
    panelsTitle: "All your updates in one place.",
    panelsSubtitle: "Live info that keeps you ahead of the game.",
    myCropListings: "My Crop Listings",
    cropListingsDesc: "Track live, sold, and pending posts at a glance.",
    ordersRequests: "Orders & Requests",
    ordersRequestsDesc: "Direct buyer and vendor conversations.",
    payments: "Payments",
    paymentsDesc: "See money received, pending, and in escrow.",
    soilInsights: "Soil Insights Summary",
    soilInsightsDesc: "Latest AI diagnosis with reminders.",
    govSchemes: "Government Schemes Near You",
    govSchemesDesc: "Personalised schemes by district & crop.",
    weatherForecast: "Weather & Forecast",
    weatherForecastDesc: "Today's weather with irrigation hints.",
    openPanel: "Open Panel",
    weatherWidgetBadge: "Live Weather",
    weatherTitle: "Plan your day. Protect your crop.",
    weatherDescription: "Real-time weather at your fingertips—rain alerts, temperature shifts, and 3-day forecasts to help you decide when to sow, spray, or harvest.",
    detailPagesTitle: "Every journey, ready when you are.",
    detailPagesSubtitle: "From listings to soil AI, each page is built on trust, speed, and verifiable data.",
  },
  hi: {
    badge: "आपका खेती केंद्र",
    heroTitle: "आपकी खेती। आपके नियम। आपकी सफलता।",
    heroSubtitle: "उगाने, बेचने और फलने-फूलने के लिए आपको जो कुछ भी चाहिए—बस एक क्लिक दूर।",
    dashboardGreeting: "नमस्ते, रमेश!",
    village: "गाँव: कडूर",
    district: "जिला: हासन",
    state: "कर्नाटक",
    languageLabel: "भाषा",
    dashboardHeaderBadge: "किसान डैशबोर्ड हेडर",
    dpinLabel: "DPIN 7F4A-23K9",
    dashboardDescription: "किसान OTP के बाद इस स्क्रीन पर आते हैं, जहां उन्हें दो टैप में सब कुछ मिलता है—फसल बेचें, मिट्टी जांचें, इनपुट या खरीदारों से जुड़ें, और मौसम के लिए तैयार रहें।",
    verifiedFarmer: "सत्यापित किसान",
    quickActionsTitle: "रोज़ के काम, आपकी उंगलियों पर",
    quickActionsSubtitle: "एक कार्ड दबाएं और सीधे काम शुरू करें।",
    sellCrops: "फसल बेचें",
    sellCropsDesc: "60 सेकंड में उत्पाद सूचीबद्ध करें।",
    checkSoil: "मिट्टी की जांच करें",
    checkSoilDesc: "मिट्टी और पत्तियों के लिए AI जानकारी।",
    vendorConnect: "विक्रेता से जुड़ें",
    vendorConnectDesc: "विश्वसनीय इनपुट और सलाह।",
    buyerConnect: "खरीदार से जुड़ें",
    buyerConnectDesc: "सत्यापित खरीदारों से बात करें।",
    borrowLend: "उपकरण उधार लें / दें",
    borrowLendDesc: "ट्रैक्टर, पंप, स्प्रेयर साझा करें।",
    cropName: "फसल का नाम",
    quantity: "मात्रा",
    expectedPrice: "अपेक्षित मूल्य",
    traceabilityHash: "तत्काल ट्रेसेबिलिटी हैश",
    uploadPhoto: "फोटो अपलोड या क्लिक करें",
    healthGrade: "स्वास्थ्य ग्रेड",
    fertilizerAdvice: "उर्वरक और पानी की सलाह",
    verifiedVendors: "सत्यापित विक्रेता",
    ratingsReviews: "रेटिंग और समीक्षाएं",
    bestPrices: "पास में सर्वोत्तम कीमतें",
    buyerVerification: "खरीदार सत्यापन",
    offerPrice: "मूल्य प्रस्ताव जानकारी",
    contactApproval: "संपर्क अनुमोदन",
    postNeeds: "जरूरतें/प्रस्ताव पोस्ट करें",
    villageVisibility: "गांव-स्तरीय दृश्यता",
    dpinPrivacy: "DPIN-संरक्षित गोपनीयता",
    start: "शुरू करें",
    panelsTitle: "सभी अपडेट एक जगह।",
    panelsSubtitle: "लाइव जानकारी जो आपको आगे रखती है।",
    myCropListings: "मेरी फसल सूची",
    cropListingsDesc: "लाइव, बिकी और लंबित पोस्ट एक नज़र में देखें।",
    ordersRequests: "ऑर्डर और अनुरोध",
    ordersRequestsDesc: "खरीदार और विक्रेता के साथ सीधी बातचीत।",
    payments: "भुगतान",
    paymentsDesc: "प्राप्त, लंबित और एस्क्रो में पैसे देखें।",
    soilInsights: "मिट्टी अंतर्दृष्टि सारांश",
    soilInsightsDesc: "रिमाइंडर के साथ नवीनतम AI निदान।",
    govSchemes: "आपके क्षेत्र की सरकारी योजनाएं",
    govSchemesDesc: "जिले और फसल के अनुसार व्यक्तिगत योजनाएं।",
    weatherForecast: "मौसम और पूर्वानुमान",
    weatherForecastDesc: "सिंचाई संकेत के साथ आज का मौसम।",
    openPanel: "पैनल खोलें",
    weatherWidgetBadge: "लाइव मौसम",
    weatherTitle: "अपने दिन की योजना बनाएं। अपनी फसल की रक्षा करें।",
    weatherDescription: "वास्तविक समय का मौसम आपकी उंगलियों पर—बारिश की चेतावनी, तापमान परिवर्तन, और 3-दिन का पूर्वानुमान जो आपको बुवाई, छिड़काव या कटाई का फैसला करने में मदद करता है।",
    detailPagesTitle: "हर यात्रा, जब चाहें तैयार।",
    detailPagesSubtitle: "लिस्टिंग से लेकर मिट्टी AI तक, हर पेज विश्वास, गति और सत्यापन योग्य डेटा पर बना है।",
  },
  kn: {
    badge: "ನಿಮ್ಮ ಕೃಷಿ ಕೇಂದ್ರ",
    heroTitle: "ನಿಮ್ಮ ಹೊಲ. ನಿಮ್ಮ ನಿಯಮಗಳು. ನಿಮ್ಮ ಯಶಸ್ಸು.",
    heroSubtitle: "ಬೆಳೆಯಲು, ಮಾರಾಟ ಮಾಡಲು ಮತ್ತು ಅಭಿವೃದ್ಧಿ ಹೊಂದಲು ನಿಮಗೆ ಬೇಕಾದುದೆಲ್ಲವೂ—ನಿಮ್ಮ ಬೆರಳ ತುದಿಯಲ್ಲಿ.",
    dashboardGreeting: "ನಮಸ್ಕಾರ, ರಮೇಶ್!",
    village: "ಗ್ರಾಮ: ಕಡೂರು",
    district: "ಜಿಲ್ಲೆ: ಹಾಸನ",
    state: "ಕರ್ನಾಟಕ",
    languageLabel: "ಭಾಷೆ",
    dashboardHeaderBadge: "ರೈತ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ಹೆಡರ್",
    dpinLabel: "DPIN 7F4A-23K9",
    dashboardDescription: "ರೈತರು OTP ನಂತರ ಈ ಪರದೆಗೆ ಬರುತ್ತಾರೆ, ಅಲ್ಲಿ ಅವರಿಗೆ ಎರಡು ಟ್ಯಾಪ್‌ಗಳಲ್ಲಿ ಎಲ್ಲವೂ ಸಿಗುತ್ತದೆ—ಬೆಳೆಗಳನ್ನು ಮಾರಾಟ ಮಾಡಿ, ಮಣ್ಣು ಪರೀಕ್ಷಿಸಿ, ಇನ್‌ಪುಟ್‌ಗಳು ಅಥವಾ ಖರೀದಿದಾರರೊಂದಿಗೆ ಸಂಪರ್ಕಿಸಿ ಮತ್ತು ಹವಾಮಾನಕ್ಕಾಗಿ ಸಿದ್ಧರಾಗಿರಿ.",
    verifiedFarmer: "ಪರಿಶೀಲಿತ ರೈತ",
    quickActionsTitle: "ದೈನಂದಿನ ಸಾಧನಗಳು ನಿಮ್ಮ ಬೆರಳ ತುದಿಯಲ್ಲಿ",
    quickActionsSubtitle: "ಒಂದು ಕಾರ್ಡ್ ಟ್ಯಾಪ್ ಮಾಡಿ ಮತ್ತು ನೇರವಾಗಿ ಕೆಲಸಕ್ಕೆ ಹೋಗಿ.",
    sellCrops: "ಬೆಳೆಗಳನ್ನು ಮಾರಾಟ ಮಾಡಿ",
    sellCropsDesc: "60 ಸೆಕೆಂಡುಗಳಲ್ಲಿ ಉತ್ಪನ್ನವನ್ನು ಪಟ್ಟಿ ಮಾಡಿ.",
    checkSoil: "ಮಣ್ಣಿನ ಆರೋಗ್ಯ ಪರೀಕ್ಷಿಸಿ",
    checkSoilDesc: "ಮಣ್ಣು ಮತ್ತು ಎಲೆಗಳಿಗೆ AI ಒಳನೋಟಗಳು.",
    vendorConnect: "ಮಾರಾಟಗಾರರೊಂದಿಗೆ ಸಂಪರ್ಕಿಸಿ",
    vendorConnectDesc: "ವಿಶ್ವಾಸಾರ್ಹ ಇನ್‌ಪುಟ್‌ಗಳು ಮತ್ತು ಸಲಹೆ.",
    buyerConnect: "ಖರೀದಿದಾರರೊಂದಿಗೆ ಸಂಪರ್ಕಿಸಿ",
    buyerConnectDesc: "ಪರಿಶೀಲಿತ ಖರೀದಿದಾರರೊಂದಿಗೆ ಮಾತನಾಡಿ.",
    borrowLend: "ಉಪಕರಣಗಳನ್ನು ಎರವಲು ಪಡೆಯಿರಿ / ನೀಡಿ",
    borrowLendDesc: "ಟ್ರಾಕ್ಟರ್‌ಗಳು, ಪಂಪ್‌ಗಳು, ಸ್ಪ್ರೇಯರ್‌ಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳಿ.",
    cropName: "ಬೆಳೆಯ ಹೆಸರು",
    quantity: "ಪ್ರಮಾಣ",
    expectedPrice: "ನಿರೀಕ್ಷಿತ ಬೆಲೆ",
    traceabilityHash: "ತತ್‌ಕ್ಷಣ ಟ್ರೇಸಬಿಲಿಟಿ ಹ್ಯಾಶ್",
    uploadPhoto: "ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಅಥವಾ ಕ್ಲಿಕ್ ಮಾಡಿ",
    healthGrade: "ಆರೋಗ್ಯ ಗ್ರೇಡ್",
    fertilizerAdvice: "ಗೊಬ್ಬರ ಮತ್ತು ನೀರಿನ ಸಲಹೆ",
    verifiedVendors: "ಪರಿಶೀಲಿತ ಮಾರಾಟಗಾರರು",
    ratingsReviews: "ರೇಟಿಂಗ್‌ಗಳು ಮತ್ತು ವಿಮರ್ಶೆಗಳು",
    bestPrices: "ಹತ್ತಿರದಲ್ಲಿ ಉತ್ತಮ ಬೆಲೆಗಳು",
    buyerVerification: "ಖರೀದಿದಾರ ಪರಿಶೀಲನೆ",
    offerPrice: "ಬೆಲೆ ಪ್ರಸ್ತಾಪ ಮಾಹಿತಿ",
    contactApproval: "ಸಂಪರ್ಕ ಅನುಮೋದನೆ",
    postNeeds: "ಅಗತ್ಯಗಳು/ಪ್ರಸ್ತಾಪಗಳನ್ನು ಪೋಸ್ಟ್ ಮಾಡಿ",
    villageVisibility: "ಗ್ರಾಮ-ಮಟ್ಟದ ಗೋಚರತೆ",
    dpinPrivacy: "DPIN-ರಕ್ಷಿತ ಗೌಪ್ಯತೆ",
    start: "ಪ್ರಾರಂಭಿಸಿ",
    panelsTitle: "ಎಲ್ಲಾ ನವೀಕರಣಗಳು ಒಂದೇ ಸ್ಥಳದಲ್ಲಿ.",
    panelsSubtitle: "ನಿಮ್ಮನ್ನು ಮುಂದೆ ಇಡುವ ಲೈವ್ ಮಾಹಿತಿ.",
    myCropListings: "ನನ್ನ ಬೆಳೆ ಪಟ್ಟಿಗಳು",
    cropListingsDesc: "ಲೈವ್, ಮಾರಾಟವಾದ ಮತ್ತು ಬಾಕಿ ಇರುವ ಪೋಸ್ಟ್‌ಗಳನ್ನು ಒಂದೇ ನೋಟದಲ್ಲಿ ಟ್ರ್ಯಾಕ್ ಮಾಡಿ.",
    ordersRequests: "ಆರ್ಡರ್‌ಗಳು ಮತ್ತು ವಿನಂತಿಗಳು",
    ordersRequestsDesc: "ಖರೀದಿದಾರ ಮತ್ತು ಮಾರಾಟಗಾರರೊಂದಿಗೆ ನೇರ ಸಂಭಾಷಣೆಗಳು.",
    payments: "ಪಾವತಿಗಳು",
    paymentsDesc: "ಸ್ವೀಕರಿಸಿದ, ಬಾಕಿ ಮತ್ತು ಎಸ್ಕ್ರೋದಲ್ಲಿರುವ ಹಣವನ್ನು ನೋಡಿ.",
    soilInsights: "ಮಣ್ಣಿನ ಒಳನೋಟಗಳ ಸಾರಾಂಶ",
    soilInsightsDesc: "ರಿಮೈಂಡರ್‌ಗಳೊಂದಿಗೆ ಇತ್ತೀಚಿನ AI ರೋಗನಿರ್ಣಯ.",
    govSchemes: "ನಿಮ್ಮ ಪ್ರದೇಶದ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು",
    govSchemesDesc: "ಜಿಲ್ಲೆ ಮತ್ತು ಬೆಳೆಯ ಪ್ರಕಾರ ವೈಯಕ್ತಿಕಗೊಳಿಸಿದ ಯೋಜನೆಗಳು.",
    weatherForecast: "ಹವಾಮಾನ ಮತ್ತು ಮುನ್ಸೂಚನೆ",
    weatherForecastDesc: "ನೀರಾವರಿ ಸೂಚನೆಗಳೊಂದಿಗೆ ಇಂದಿನ ಹವಾಮಾನ.",
    openPanel: "ಪ್ಯಾನೆಲ್ ತೆರೆಯಿರಿ",
    weatherWidgetBadge: "ಲೈವ್ ಹವಾಮಾನ",
    weatherTitle: "ನಿಮ್ಮ ದಿನವನ್ನು ಯೋಜಿಸಿ. ನಿಮ್ಮ ಬೆಳೆಯನ್ನು ರಕ್ಷಿಸಿ.",
    weatherDescription: "ನಿಮ್ಮ ಬೆರಳ ತುದಿಯಲ್ಲಿ ನೈಜ-ಸಮಯದ ಹವಾಮಾನ—ಮಳೆ ಎಚ್ಚರಿಕೆಗಳು, ತಾಪಮಾನ ಬದಲಾವಣೆಗಳು ಮತ್ತು 3-ದಿನಗಳ ಮುನ್ಸೂಚನೆಗಳು ನೀವು ಬಿತ್ತನೆ, ಸಿಂಪಡಿಸುವಿಕೆ ಅಥವಾ ಕೊಯ್ಲು ಮಾಡುವ ನಿರ್ಧಾರ ತೆಗೆದುಕೊಳ್ಳಲು ಸಹಾಯ ಮಾಡುತ್ತವೆ.",
    detailPagesTitle: "ಪ್ರತಿ ಪ್ರಯಾಣ, ನೀವು ಬಯಸಿದಾಗ ಸಿದ್ಧ.",
    detailPagesSubtitle: "ಪಟ್ಟಿಗಳಿಂದ ಮಣ್ಣಿನ AI ವರೆಗೆ, ಪ್ರತಿ ಪುಟವು ವಿಶ್ವಾಸ, ವೇಗ ಮತ್ತು ಪರಿಶೀಲಿಸಬಹುದಾದ ಡೇಟಾದ ಮೇಲೆ ನಿರ್ಮಿಸಲಾಗಿದೆ.",
  },
};

const getQuickActions = (t: typeof translations.en) => [
  {
    title: t.sellCrops,
    description: t.sellCropsDesc,
    icon: Wheat,
    highlights: [t.cropName, t.quantity, t.expectedPrice, t.traceabilityHash],
    to: "/farmer/create-listing",
  },
  {
    title: t.checkSoil,
    description: t.checkSoilDesc,
    icon: FlaskConical,
    highlights: [t.uploadPhoto, t.healthGrade, t.fertilizerAdvice],
    to: "/farmer/soil-analysis",
  },
  {
    title: t.vendorConnect,
    description: t.vendorConnectDesc,
    icon: Store,
    highlights: [t.verifiedVendors, t.ratingsReviews, t.bestPrices],
    to: "/farmer/vendor-hub",
  },
  {
    title: t.buyerConnect,
    description: t.buyerConnectDesc,
    icon: ShoppingCart,
    highlights: [t.buyerVerification, t.offerPrice, t.contactApproval],
    to: "/farmer/buyer-connect",
  },
  {
    title: t.borrowLend,
    description: t.borrowLendDesc,
    icon: Cog,
    highlights: [t.postNeeds, t.villageVisibility, t.dpinPrivacy],
    to: "/farmer/community-exchange",
  },
];

const getDashboardPanels = (t: typeof translations.en) => [
  {
    title: t.myCropListings,
    icon: ClipboardList,
    summary: t.cropListingsDesc,
    details: ["Crop thumbnails", "Buyer interest count", "Price & status toggles", "Approve contact reveals"],
    to: "/farmer/my-listings",
  },
  {
    title: t.ordersRequests,
    icon: MessageSquare,
    summary: t.ordersRequestsDesc,
    details: ["New buyer interest", "Vendor offers", "Negotiation chats", "Mask/unmask controls"],
    to: "/farmer/buyer-connect",
  },
  {
    title: t.payments,
    icon: Wallet,
    summary: t.paymentsDesc,
    details: ["UPI & escrow balances", "COD confirmations", "Download receipts"],
    to: "/farmer/payments",
  },
  {
    title: t.soilInsights,
    icon: FlaskConical,
    summary: t.soilInsightsDesc,
    details: ["Health status", "Moisture cues", "Fertilizer suggestion", "Next test due"],
    to: "/farmer/soil-analysis",
  },
  {
    title: t.govSchemes,
    icon: ScrollText,
    summary: t.govSchemesDesc,
    details: ["Top matches", "Apply offline via DPIN", "Local language downloads"],
    to: "/farmer/government-schemes",
  },
  {
    title: t.weatherForecast,
    icon: CloudSun,
    summary: t.weatherForecastDesc,
    details: ["Temperature & rainfall", "Humidity", "Wind speed", "3-day outlook"],
  },
];

const detailPages = [
  {
    title: "Create Crop Listing",
    icon: Rocket,
    description: "Ultra-fast listing experience with traceability hashes.",
    points: ["Crop name & quantity", "Expected price", "Auto-compress photos", "Instant success message"],
    to: "/farmer/create-listing",
  },
  {
    title: "My Listings",
    icon: ClipboardList,
    description: "Manage every crop post with crystal clear status and buyer interest.",
    points: ["Interest count & status", "Edit & close deals", "Deep link to approvals"],
    to: "/farmer/my-listings",
  },
  {
    title: "Buyer Connect",
    icon: Users,
    description: "Approve contact reveals, negotiate prices, and protect privacy.",
    points: ["Masked numbers", "Negotiation chat", "Auto-expiring requests"],
    to: "/farmer/buyer-connect",
  },
  {
    title: "Payments & Wallet",
    icon: Wallet,
    description: "Wallet, escrow, COD, and DPIN receipts in one trusted view.",
    points: ["UPI & escrow balances", "COD confirmation", "Downloadable proofs"],
    to: "/farmer/payments",
  },
  {
    title: "Soil Health AI Analysis",
    icon: FlaskConical,
    description: "Visual diagnosis, confidence meter, and product recommendations.",
    points: ["Diagnosis summary", "Confidence meter", "Ask an expert", "Blockchain hash for audits"],
    to: "/farmer/soil-analysis",
  },
  {
    title: "Government Schemes",
    icon: ScrollText,
    description: "Localized schemes with offline-ready downloads.",
    points: ["State & district filters", "Eligibility & benefits", "Download via DPIN"],
    to: "/farmer/government-schemes",
  },
  {
    title: "Community Exchange",
    icon: Handshake,
    description: "Village-level sharing of tools and services.",
    points: ["Post requests & offers", "Comment threads", "DPIN verified handshakes"],
    to: "/farmer/community-exchange",
  },
  {
    title: "Vendor Hub",
    icon: Store,
    description: "Discover and engage trusted suppliers.",
    points: ["Vendor profiles", "Ratings & reviews", "Request contact flow"],
    to: "/farmer/vendor-hub",
  },
  {
    title: "Farmer Profile",
    icon: Home,
    description: "Digital agricultural identity secured on-chain.",
    points: ["Village & district", "Crops grown", "Verification status", "DPIN & blockchain hash"],
    to: "/farmer/profile",
  },
];

const Farmer = () => {
  const [lang, setLang] = useState<Language>("en");
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [isLoadingWeather, setIsLoadingWeather] = useState(true);
  
  const t = translations[lang];
  const quickActions = getQuickActions(t);
  const dashboardPanels = getDashboardPanels(t);

  // Fetch weather data on component mount
  useEffect(() => {
    const loadWeather = async () => {
      setIsLoadingWeather(true);
      try {
        // Fetch weather for Kadur, Hassan (from the farmer's location)
        const weatherData = await fetchWeatherByCity("Kadur", "Karnataka");
        setWeather(weatherData);
      } catch (error) {
        console.error("Failed to load weather:", error);
      } finally {
        setIsLoadingWeather(false);
      }
    };

    loadWeather();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#f7f3ed] via-[#f3f7f0] to-white">
      <Header />
      
      {/* Hero + Flow Overview */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-40 mix-blend-multiply">
          <img src={heroImage} alt="Farmer standing in a lush field" className="h-full w-full object-cover" />
        </div>
        <div className="relative container mx-auto px-4 py-20 lg:py-28 text-left lg:text-center">
          <div className="mx-auto max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-white/70 px-5 py-2 text-sm font-medium shadow-soft">
              <Sprout className="h-4 w-4 text-farmer" />
              {t.badge}
            </div>
            <h1 className="text-4xl font-bold leading-tight text-foreground drop-shadow-sm md:text-5xl lg:text-6xl">
              {t.heroTitle}
            </h1>
            <p className="text-lg text-foreground/80 md:text-xl">
              {t.heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Dashboard Hero */}
      <section className="bg-gradient-to-br from-[#f1efe8] via-[#f4faf2] to-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <Card className="overflow-hidden border-none bg-white/80 shadow-xl backdrop-blur">
            <div className="grid gap-10 lg:grid-cols-[2fr,3fr]">
              <div className="space-y-6 p-8 lg:p-12">
                <div className="inline-flex items-center gap-2 rounded-full bg-farmer/10 px-4 py-2 text-sm font-medium text-farmer">
                  {t.dashboardHeaderBadge}
                </div>
                <div className="space-y-5">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-3xl font-bold text-foreground md:text-4xl">{t.dashboardGreeting}</h2>
                    <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                      {t.dpinLabel}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-farmer" />
                      {t.village}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-farmer" />
                      {t.district}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <Home className="h-4 w-4 text-farmer" />
                      {t.state}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {t.languageLabel}
                    </span>
                    <div className="flex overflow-hidden rounded-full border border-farmer/40 bg-white/80 text-xs font-semibold">
                      <button
                        onClick={() => setLang("en")}
                        className={`px-3 py-1 transition ${lang === "en" ? "bg-farmer text-white" : "text-foreground/70 hover:bg-farmer/10"}`}
                      >
                        English
                      </button>
                      <button
                        onClick={() => setLang("hi")}
                        className={`px-3 py-1 transition ${lang === "hi" ? "bg-farmer text-white" : "text-foreground/70 hover:bg-farmer/10"}`}
                      >
                        हिंदी
                      </button>
                      <button
                        onClick={() => setLang("kn")}
                        className={`px-3 py-1 transition ${lang === "kn" ? "bg-farmer text-white" : "text-foreground/70 hover:bg-farmer/10"}`}
                      >
                        ಕನ್ನಡ
                      </button>
                    </div>
                  </div>
                  {weather && !isLoadingWeather && (
                    <div className="grid gap-3 text-sm text-foreground/85 sm:grid-cols-3">
                      <div className="flex items-center gap-2 rounded-xl border border-border bg-muted/30 px-4 py-3">
                        <CloudSun className="h-5 w-5 text-farmer" />
                        <div>
                          <p className="text-sm font-semibold">{weather.current.temperature}°C</p>
                          <p className="text-xs text-muted-foreground">Feels like {weather.current.feelsLike}°</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 rounded-xl border border-border bg-muted/30 px-4 py-3">
                        <CloudRain className="h-5 w-5 text-farmer" />
                        <div>
                          <p className="text-sm font-semibold">Rain chance {weather.current.rainChance}%</p>
                          <p className="text-xs text-muted-foreground capitalize">{weather.current.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 rounded-xl border border-border bg-muted/30 px-4 py-3">
                        <Droplets className="h-5 w-5 text-farmer" />
                        <div>
                          <p className="text-sm font-semibold">Humidity {weather.current.humidity}%</p>
                          <p className="text-xs text-muted-foreground">Wind {weather.current.windSpeed} km/h</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="relative flex items-end rounded-tl-[48px] bg-gradient-to-br from-[#dbe7d2] via-[#f0f5ec] to-white p-10">
                <div className="w-full space-y-4 rounded-3xl border border-white/60 bg-white/70 p-6 shadow-soft backdrop-blur">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{t.dashboardGreeting.split(",")[0]},</p>
                      <p className="text-2xl font-semibold text-foreground">{t.dashboardGreeting.split(" ")[1]}</p>
                    </div>
                    <Badge className="bg-emerald-100 text-emerald-700">{t.verifiedFarmer}</Badge>
                  </div>
                  <div className="rounded-2xl border border-border bg-muted/20 p-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Leaf className="h-4 w-4 text-farmer" />
                      <span>{t.village}</span>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <Leaf className="h-4 w-4 text-farmer" />
                      <span>{t.district}</span>
                    </div>
                  </div>
                </div>
                <div className="absolute -right-6 -top-6 hidden h-28 w-28 rounded-full border border-farmer/40 bg-farmer/10 blur-3xl lg:block" />
              </div>
            </div>
            </Card>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">{t.quickActionsTitle}</h2>
            <p className="mt-2 text-lg text-muted-foreground">{t.quickActionsSubtitle}</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {quickActions.map((action) => (
              <Card
                key={action.title}
                className="group relative overflow-hidden border-farmer/10 bg-white/90 p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="absolute right-4 top-4 h-10 w-10 rounded-full bg-farmer/10 blur-2xl transition group-hover:bg-farmer/20" />
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-farmer/10 p-3 text-farmer">
                    <action.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {action.title}
                  </h3>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  {action.description}
                </p>
                <ul className="mt-4 space-y-2 text-sm text-foreground/80">
                  {action.highlights.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-farmer" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button asChild variant="ghost" className="mt-6 w-full justify-between text-farmer hover:text-farmer">
                  <Link to={action.to}>
                    {t.start}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Panels */}
      <section className="bg-muted/40 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">{t.panelsTitle}</h2>
            <p className="mt-2 text-lg text-muted-foreground">
              {t.panelsSubtitle}
            </p>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {dashboardPanels.map((panel) => (
              <Card key={panel.title} className="border-border bg-white/90 p-7 shadow-soft transition hover:shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-farmer/10 p-3 text-farmer">
                    <panel.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">{panel.title}</h3>
                    <p className="text-sm text-muted-foreground">{panel.summary}</p>
                  </div>
              </div>
                <ul className="mt-4 grid gap-2 text-sm text-foreground/80 md:grid-cols-2">
                  {panel.details.map((detail) => (
                    <li key={detail} className="flex items-center gap-2 rounded-lg bg-muted/30 px-3 py-2">
                      <Leaf className="h-4 w-4 text-farmer" />
                      {detail}
                </li>
                  ))}
              </ul>
                {panel.to ? (
                  <Button
                    asChild
                    variant="ghost"
                    className="mt-6 inline-flex items-center gap-2 text-farmer hover:text-farmer"
                  >
                    <Link to={panel.to}>
                      {t.openPanel}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                ) : null}
            </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Weather Widget */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <Card className="overflow-hidden border-none bg-gradient-to-r from-[#d8e8d1] via-[#f0f5ef] to-[#fef5e7] shadow-xl lg:flex lg:items-center">
            <div className="flex-1 space-y-4 p-8 lg:p-12">
              <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                {t.weatherWidgetBadge}
              </Badge>
              <h2 className="text-3xl font-bold text-foreground md:text-4xl">{t.weatherTitle}</h2>
              <p className="text-lg text-muted-foreground">
                {t.weatherDescription}
              </p>
              <div className="grid gap-3 text-sm text-foreground/80 sm:grid-cols-2">
                <div className="flex items-center gap-2 rounded-lg bg-white/60 px-3 py-2">
                  <CloudSun className="h-5 w-5 text-amber-600" />
                  Temperature & rainfall chance
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-white/60 px-3 py-2">
                  <Droplets className="h-5 w-5 text-sky-600" />
                  Humidity & soil moisture cues
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-white/60 px-3 py-2">
                  <Wind className="h-5 w-5 text-emerald-600" />
                  Upcoming 3-day forecast
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-white/60 px-3 py-2">
                  <Hash className="h-5 w-5 text-farmer" />
                  Traceable data hashes for audit trail
                </div>
              </div>
            </div>
            <div className="bg-[#f7f1e1]/80 p-8 lg:w-96">
              <div className="rounded-3xl border border-white/40 bg-white/50 p-6 shadow-soft backdrop-blur">
                {isLoadingWeather ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-farmer border-t-transparent"></div>
                  </div>
                ) : weather ? (
                  <>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{weather.current.location}</span>
                      <span>Updated {weather.current.lastUpdated}</span>
                    </div>
                    <div className="mt-6 flex items-end justify-between">
                      <div>
                        <p className="text-6xl font-semibold text-foreground">{weather.current.temperature}°</p>
                        <p className="text-sm text-muted-foreground">Feels like {weather.current.feelsLike}°</p>
                      </div>
                      <div className="text-right text-sm text-muted-foreground">
                        <p>Rainfall chance</p>
                        <p className="text-xl font-semibold text-farmer">{weather.current.rainChance}%</p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Droplets className="h-4 w-4" />
                        <span>Humidity {weather.current.humidity}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Wind className="h-4 w-4" />
                        <span>Wind {weather.current.windSpeed} km/h</span>
                      </div>
                    </div>
                    <div className="mt-6 grid grid-cols-3 gap-3 text-center text-sm text-muted-foreground">
                      {weather.forecast.map((day, index) => (
                        <div key={index} className="rounded-xl bg-muted/40 p-3">
                          <p className="font-semibold text-foreground">{day.day}</p>
                          <p>{day.tempMax}° / {day.tempMin}°</p>
                          <p className="text-xl">{day.icon}</p>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="py-12 text-center text-sm text-muted-foreground">
                    <p>Weather data unavailable</p>
                  </div>
                )}
              </div>
              </div>
            </Card>
        </div>
      </section>

      {/* Detailed Pages */}
      <section className="bg-muted/30 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">{t.detailPagesTitle}</h2>
            <p className="mt-2 text-lg text-muted-foreground">
              {t.detailPagesSubtitle}
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {detailPages.map((page) => (
              <Card key={page.title} className="border-border bg-white/90 p-7 shadow-soft transition hover:shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-farmer/10 p-3 text-farmer">
                    <page.icon className="h-6 w-6" />
              </div>
                  <h3 className="text-lg font-semibold text-foreground">{page.title}</h3>
              </div>
                <p className="mt-3 text-sm text-muted-foreground">{page.description}</p>
                <ul className="mt-4 space-y-2 text-sm text-foreground/80">
                  {page.points.map((point) => (
                    <li key={point} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-farmer" />
                      {point}
                    </li>
                  ))}
                </ul>
                <Button asChild variant="ghost" className="mt-6 inline-flex items-center gap-2 text-farmer hover:text-farmer">
                  <Link to={page.to}>
                    Open
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
            </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <Card className="overflow-hidden border-none bg-gradient-to-br from-[#f5efe3] via-white to-[#eef7eb] shadow-xl">
            <div className="grid gap-10 lg:grid-cols-[3fr,2fr]">
              <div className="space-y-6 p-8 lg:p-12">
                <Badge variant="secondary" className="bg-farmer/10 text-farmer">
                  Secure & Transparent
                </Badge>
                <h2 className="text-3xl font-bold text-foreground md:text-4xl">
                  Built on privacy, DPIN security, and blockchain integrity.
            </h2>
                <p className="text-lg text-muted-foreground">
                  Supabase JWT + Row Level Security keeps farmer data locked down. DPIN ensures offline resiliency and
                  blockchain hashes provide irrefutable proof of identity and transactions.
                </p>
                <div className="grid gap-3 text-sm text-foreground/80 sm:grid-cols-2">
                  <div className="flex items-center gap-2 rounded-lg bg-muted/40 px-3 py-2">
                    <ShieldCheck className="h-5 w-5 text-farmer" />
                    Verification status (Pending / Approved)
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-muted/40 px-3 py-2">
                    <Hash className="h-5 w-5 text-farmer" />
                    Blockchain identity hash
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-muted/40 px-3 py-2">
                    <Phone className="h-5 w-5 text-farmer" />
                    Toll-free support hotline
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-muted/40 px-3 py-2">
                    <Settings className="h-5 w-5 text-farmer" />
                    One-tap logout from footer
                  </div>
                </div>
              </div>
              <div className="relative flex items-end bg-[#f0f7f1] p-10">
                <div className="w-full space-y-4 rounded-3xl border border-emerald-200 bg-white/80 p-6 shadow-soft backdrop-blur">
                  <p className="text-sm font-semibold uppercase text-emerald-700">Farmer Support Center</p>
                  <h3 className="text-2xl font-semibold text-foreground">
                    “Sahi Daam. Sahi Faisla. Sahi Saathi.”
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Guidance in English, हिंदी, and ಕನ್ನಡ. DPIN support even without internet. Direct line to agricultural
                    experts.
                  </p>
                  <Button className="w-full bg-farmer hover:bg-farmer/90">Chat with Support</Button>
                </div>
          </div>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Farmer;
