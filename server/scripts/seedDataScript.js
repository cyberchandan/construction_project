const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('../models/Project');
const SiteSettings = require('../models/SiteSettings');
const Lead = require('../models/Lead');

dotenv.config();

const seedData = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/buildconnect_ncr';

  try {
    await mongoose.connect(uri);
    console.log('[Seed Script] Connected to MongoDB.');

    // Seed Site Settings
    await SiteSettings.deleteMany({});
    await SiteSettings.create({
      businessName: 'BuildConnect NCR',
      ownerName: 'Senior Construction Director',
      tagline: 'Build Your Dream Home with Confidence',
      phone: process.env.BUSINESS_PHONE || '+91 98100 12345',
      whatsapp: process.env.BUSINESS_WHATSAPP || '+91 98100 12345',
      email: process.env.BUSINESS_EMAIL || 'contact@buildconnectncr.com',
      officeAddress: 'Office 402, Commercial Hub, Sector 62, Noida & Greater Noida West, UP 201301',
      serviceAreas: ['Noida', 'Greater Noida', 'Greater Noida West (Noida Extension)', 'Yamuna Expressway'],
      calculatorRates: {
        materialLabourRate: 1800,
        labourOnlyRate: 500,
      },
      calculatorDisclaimer:
        'This calculation is an indicative estimate only and does not constitute a binding legal contract. Final cost depends on structural design, material grade selection, site accessibility, architectural drawings, taxes, and custom requirements.',
    });
    console.log('✅ SiteSettings seeded.');

    // Seed Projects
    await Project.deleteMany({});
    await Project.insertMany([
      {
        title: '3-Story Luxury Villa Construction',
        slug: '3-story-luxury-villa-sector-150-noida',
        location: 'Sector 150, Noida',
        serviceType: 'material_labour',
        areaSqFt: 3600,
        description: 'Complete turnkey construction of a modern 3-story luxury villa with high-grade Tata Tiscon TMT, UltraTech cement, premium stone elevation cladding, and modern glass railings.',
        images: [
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
        ],
        featuredImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        completionDate: 'November 2025',
        isPublished: true,
      },
      {
        title: 'Labour-Only Structure Contract - G+2 House',
        slug: 'labour-only-structure-greater-noida-west',
        location: 'Greater Noida West (Noida Extension)',
        serviceType: 'labour_only',
        areaSqFt: 2400,
        description: 'Execution of complete RCC superstructure framing, column footing, beam casting, slab casting, and exterior brickwork executed strictly on labour contract mode.',
        images: [
          'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
        ],
        featuredImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
        completionDate: 'February 2026',
        isPublished: true,
      },
      {
        title: 'Modern Turnkey Duplex Residence',
        slug: 'modern-turnkey-duplex-alpha-1-greater-noida',
        location: 'Alpha 1, Greater Noida',
        serviceType: 'material_labour',
        areaSqFt: 4200,
        description: 'Turnkey residential contract including structural civil work, plumbing, concealed electrical conduits, floor tiles, and weather-shield exterior coating.',
        images: [
          'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
        ],
        featuredImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
        completionDate: 'June 2026',
        isPublished: true,
      },
    ]);
    console.log('✅ Projects seeded.');

    // Seed Sample Leads
    await Lead.deleteMany({});
    await Lead.insertMany([
      {
        name: 'Vikram Sharma',
        phone: '+91 9811122233',
        email: 'vikram.sharma@example.com',
        location: 'Sector 137, Noida',
        serviceType: 'material_labour',
        projectType: 'new_construction',
        areaSqFt: 2500,
        floors: 2,
        budget: '₹40 - ₹50 Lakhs',
        startDate: 'Within 1 Month',
        message: 'Planning G+1 residential house construction in Noida. Interested in material + labour turnkey contract.',
        source: 'cost_calculator',
        status: 'new',
        consent: true,
      },
      {
        name: 'Anita Verma',
        phone: '+91 9822233344',
        email: 'anita.v@example.com',
        location: 'Gaur City, Greater Noida West',
        serviceType: 'labour_only',
        projectType: 'new_construction',
        areaSqFt: 1800,
        floors: 3,
        budget: '₹10 - ₹15 Lakhs (Labour)',
        startDate: 'Immediate',
        message: 'We have bought materials already, require experienced masonry and RCC labour team for structure casting.',
        source: 'noida_landing',
        status: 'contacted',
        consent: true,
      },
    ]);
    console.log('✅ Sample leads seeded.');

    console.log('=======================================================');
    console.log('🌱 DATABASE SEEDED SUCCESSFULLY!');
    console.log('=======================================================');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed Failed:', error);
    process.exit(1);
  }
};

seedData();
