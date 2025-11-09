/**
 * WhatsApp Message Templates
 * All pre-defined bot messages and responses
 */

const messageTemplates = {
  /**
   * Welcome & Acknowledgment Messages
   */
  inquiryReceived: (customerName, inquiryId) => ({
    text: `🙏 Hello ${customerName || 'there'}!\n\nThank you for contacting *Nikul Pharma*! 🏭\n\nWe have received your inquiry (ID: *${inquiryId}*) and our team will review it shortly.\n\n⏰ Expected Response Time: Within 2-4 business hours\n\n📞 For urgent matters, call: +91 6375591682\n📧 Email: sales@nikulpharma.com`,
    type: 'text'
  }),

  inquiryReceivedWithButtons: (customerName, inquiryId) => ({
    bodyText: `🙏 Hello ${customerName || 'there'}!\n\nThank you for contacting *Nikul Pharma*! 🏭\n\nWe have received your inquiry (ID: *${inquiryId}*) and our team will review it shortly.\n\n⏰ Expected Response Time: Within 2-4 business hours`,
    buttons: [
      { id: 'view_products', title: '🏭 View Products' },
      { id: 'track_inquiry', title: '📋 Track Inquiry' },
      { id: 'contact_support', title: '📞 Contact Us' }
    ],
    headerText: 'Nikul Pharma',
    footerText: 'We appreciate your interest!',
    type: 'interactive_buttons'
  }),

  /**
   * Product Inquiry Specific
   */
  productInquiryReceived: (customerName, productName, inquiryId) => ({
    text: `🙏 Hello ${customerName || 'there'}!\n\nThank you for your interest in *${productName}*! \n\nOur product specialist will contact you soon with:\n• Technical specifications\n• Pricing details\n• Delivery timeline\n• Customization options\n\n⏰ Expected Response: Within 2-4 business hours\n\n📞 For immediate assistance: +91 6375591682`,
    type: 'text'
  }),

  /**
   * Quote Request
   */
  quoteRequestReceived: (customerName, inquiryId) => ({
    text: `💰 Quote Request Received!\n\nHello ${customerName || 'there'},\n\nThank you for requesting a quote from *Nikul Pharma*! 🏭\n\n✅ Your request (ID: *${inquiryId}*) is being processed.\n\nOur team is preparing:\n• Detailed quotation\n• Product specifications\n• Payment terms\n• Delivery schedule\n\n📋 You will receive the quote within 24 hours.\n\n📞 Questions? Call: +91 6375591682`,
    type: 'text'
  }),

  /**
   * Follow-up Messages
   */
  followUpReminder: (customerName, inquiryId, daysSince) => ({
    text: `👋 Hello ${customerName}!\n\nThis is a follow-up regarding your inquiry (ID: *${inquiryId}*) from ${daysSince} days ago.\n\n❓ Do you still need assistance? We're here to help!\n\nReply:\n• "YES" - to continue\n• "INFO" - for more details\n• "QUOTE" - for pricing\n\n📞 Call us: +91 6375591682`,
    type: 'text'
  }),

  /**
   * Support & Help Messages
   */
  supportMenu: () => ({
    bodyText: `How can we assist you today?\n\nChoose an option below:`,
    buttons: [
      { id: 'product_info', title: '🏭 Product Info' },
      { id: 'get_quote', title: '💰 Get Quote' },
      { id: 'technical_support', title: '🔧 Tech Support' }
    ],
    headerText: 'Nikul Pharma Support',
    footerText: 'Select an option',
    type: 'interactive_buttons'
  }),

  /**
   * Product Categories Menu (Interactive List)
   */
  productCategoriesMenu: () => ({
    bodyText: `Welcome to *Nikul Pharma*! 🏭\n\nBrowse our pharmaceutical machinery categories:\n\nSelect a category to explore our products:`,
    buttonText: '📋 View Categories',
    sections: [
      {
        title: 'Processing Equipment',
        rows: [
          { id: 'cat_mixing', title: 'Mixing Equipment', description: 'Blenders, Mixers & More' },
          { id: 'cat_granulation', title: 'Granulation Systems', description: 'RMG, FBD & More' },
          { id: 'cat_milling', title: 'Milling Equipment', description: 'Multi-Mill & Grinders' }
        ]
      },
      {
        title: 'Drying Equipment',
        rows: [
          { id: 'cat_drying', title: 'Drying Systems', description: 'FBD, Vacuum Dryers' },
          { id: 'cat_reactors', title: 'Reactors', description: 'Chemical Reactors' }
        ]
      },
      {
        title: 'Specialized Equipment',
        rows: [
          { id: 'cat_centrifuge', title: 'Centrifuges', description: 'Separation Equipment' },
          { id: 'cat_sifter', title: 'Sifters & Screens', description: 'Vibro Sifters' }
        ]
      }
    ],
    headerText: 'Nikul Pharma Products',
    footerText: 'Select a category to continue',
    type: 'interactive_list'
  }),

  /**
   * Machine Types by Category
   */
  machinesByCategory: {
    // Mixing Equipment
    cat_mixing: () => ({
      bodyText: `*Mixing Equipment* 🔄\n\nSelect a machine type:`,
      buttonText: '🏭 View Machines',
      sections: [
        {
          title: 'Available Machines',
          rows: [
            { id: 'machine_planetary_mixer', title: 'Planetary Mixer', description: 'High-speed mixing' },
            { id: 'machine_ribbon_blender', title: 'Ribbon Blender', description: 'Gentle mixing' },
            { id: 'machine_v_blender', title: 'V Blender', description: 'Uniform blending' },
            { id: 'machine_double_cone', title: 'Double Cone Blender', description: 'Gentle tumble blending' }
          ]
        }
      ],
      headerText: 'Mixing Equipment',
      footerText: 'Nikul Pharma',
      type: 'interactive_list'
    }),

    // Granulation Systems
    cat_granulation: () => ({
      bodyText: `*Granulation Systems* 🏗️\n\nSelect a machine type:`,
      buttonText: '🏭 View Machines',
      sections: [
        {
          title: 'Available Machines',
          rows: [
            { id: 'machine_rmg', title: 'RMG (Rapid Mixer)', description: 'Fast granulation' },
            { id: 'machine_fbd', title: 'FBD (Fluid Bed)', description: 'Drying & granulation' },
            { id: 'machine_granulation_line', title: 'Granulation Line', description: 'Complete solution' }
          ]
        }
      ],
      headerText: 'Granulation Systems',
      footerText: 'Nikul Pharma',
      type: 'interactive_list'
    }),

    // Milling Equipment
    cat_milling: () => ({
      bodyText: `*Milling Equipment* ⚙️\n\nSelect a machine type:`,
      buttonText: '🏭 View Machines',
      sections: [
        {
          title: 'Available Machines',
          rows: [
            { id: 'machine_multi_mill', title: 'Multi Mill', description: 'Versatile milling' },
            { id: 'machine_hammer_mill', title: 'Hammer Mill', description: 'Heavy-duty grinding' }
          ]
        }
      ],
      headerText: 'Milling Equipment',
      footerText: 'Nikul Pharma',
      type: 'interactive_list'
    }),

    // Drying Systems
    cat_drying: () => ({
      bodyText: `*Drying Systems* 🌡️\n\nSelect a machine type:`,
      buttonText: '🏭 View Machines',
      sections: [
        {
          title: 'Available Machines',
          rows: [
            { id: 'machine_fbd_dryer', title: 'FBD Dryer', description: 'Fluid bed drying' },
            { id: 'machine_tray_dryer', title: 'Tray Dryer', description: 'Static drying' },
            { id: 'machine_vacuum_dryer', title: 'Vacuum Dryer', description: 'Low-temp drying' },
            { id: 'machine_rcvd', title: 'RCVD', description: 'Rotary cone vacuum' }
          ]
        }
      ],
      headerText: 'Drying Systems',
      footerText: 'Nikul Pharma',
      type: 'interactive_list'
    }),

    // Reactors
    cat_reactors: () => ({
      bodyText: `*Reactors* ⚗️\n\nSelect a machine type:`,
      buttonText: '🏭 View Machines',
      sections: [
        {
          title: 'Available Machines',
          rows: [
            { id: 'machine_reactor', title: 'Chemical Reactor', description: 'Processing vessel' },
            { id: 'machine_pressure_vessel', title: 'Pressure Vessel', description: 'High-pressure reactor' }
          ]
        }
      ],
      headerText: 'Reactors',
      footerText: 'Nikul Pharma',
      type: 'interactive_list'
    }),

    // Centrifuges
    cat_centrifuge: () => ({
      bodyText: `*Centrifuges* 🔄\n\nSelect a machine type:`,
      buttonText: '🏭 View Machines',
      sections: [
        {
          title: 'Available Machines',
          rows: [
            { id: 'machine_centrifuge', title: 'Centrifuge', description: 'Separation equipment' },
            { id: 'machine_basket_centrifuge', title: 'Basket Centrifuge', description: 'Solid-liquid separation' }
          ]
        }
      ],
      headerText: 'Centrifuges',
      footerText: 'Nikul Pharma',
      type: 'interactive_list'
    }),

    // Sifters
    cat_sifter: () => ({
      bodyText: `*Sifters & Screening Equipment* 📊\n\nSelect a machine type:`,
      buttonText: '🏭 View Machines',
      sections: [
        {
          title: 'Available Machines',
          rows: [
            { id: 'machine_vibro_sifter', title: 'Vibro Sifter', description: 'Vibratory screening' },
            { id: 'machine_octagonal_sifter', title: 'Octagonal Sifter', description: 'Multi-deck sifting' }
          ]
        }
      ],
      headerText: 'Sifters & Screens',
      footerText: 'Nikul Pharma',
      type: 'interactive_list'
    })
  },

  /**
   * Purchase Interest Confirmation
   */
  purchaseInterest: (machineName) => ({
    bodyText: `Great choice! ✅\n\n*${machineName}*\n\nAre you interested in purchasing this machine?\n\nOur team can provide:\n• Technical specifications\n• Detailed quotation\n• Customization options\n• Delivery timeline`,
    buttons: [
      { id: 'interest_yes', title: '✅ Yes, Interested' },
      { id: 'interest_no', title: '❌ Not Now' },
      { id: 'interest_info', title: 'ℹ️ More Info' }
    ],
    headerText: machineName,
    footerText: 'Nikul Pharma',
    type: 'interactive_buttons'
  }),

  /**
   * Purchase Interest - YES Response
   */
  purchaseInterestYes: (customerName, machineName) => ({
    text: `🎉 Excellent, ${customerName || 'valued customer'}!\n\nThank you for your interest in *${machineName}*!\n\n✅ *Next Steps:*\n\nOur product specialist will contact you within 2-4 hours with:\n\n📋 Detailed quotation\n📊 Technical specifications\n🔧 Customization options\n🚚 Delivery schedule\n💳 Payment terms\n\n*Contact Information:*\n📞 Phone: +91 6375591682\n📧 Email: sales@nikulpharma.com\n🌐 Website: www.nikulpharma.com\n\nWe look forward to serving you! 🏭`,
    type: 'text'
  }),

  /**
   * Purchase Interest - NO Response
   */
  purchaseInterestNo: (customerName) => ({
    text: `No problem, ${customerName || 'valued customer'}! 👍\n\nThank you for your interest in Nikul Pharma!\n\n📞 Call: +91 6375591682\n📧 Email: sales@nikulpharma.com\n🌐 Visit: www.nikulpharma.com`,
    type: 'text'
  }),

  /**
   * Explore More Products (After NO response)
   */
  exploreMoreProducts: () => ({
    bodyText: `Would you like to explore our other pharmaceutical machinery? 🏭\n\nWe have a wide range of equipment for different processes:`,
    buttonText: '📋 View Categories',
    sections: [
      {
        title: 'Processing Equipment',
        rows: [
          { id: 'cat_mixing', title: 'Mixing Equipment', description: 'Blenders, Mixers & More' },
          { id: 'cat_granulation', title: 'Granulation Systems', description: 'RMG, FBD & More' },
          { id: 'cat_milling', title: 'Milling Equipment', description: 'Multi-Mill & Grinders' }
        ]
      },
      {
        title: 'Drying Equipment',
        rows: [
          { id: 'cat_drying', title: 'Drying Systems', description: 'FBD, Vacuum Dryers' },
          { id: 'cat_reactors', title: 'Reactors', description: 'Chemical Reactors' }
        ]
      },
      {
        title: 'Specialized Equipment',
        rows: [
          { id: 'cat_centrifuge', title: 'Centrifuges', description: 'Separation Equipment' },
          { id: 'cat_sifter', title: 'Sifters & Screens', description: 'Vibro Sifters' }
        ]
      }
    ],
    headerText: 'Explore Our Products',
    footerText: 'Select a category to continue',
    type: 'interactive_list'
  }),

  /**
   * Purchase Interest - More Info Response
   */
  purchaseInterestMoreInfo: (machineName) => ({
    text: `📋 *${machineName} - More Information*\n\nFor detailed specifications, pricing, and customization options:\n\n*Contact Our Team:*\n📞 Phone: +91 6375591682\n📧 Email: sales@nikulpharma.com\n\n*Visit Our Website:*\n🌐 www.nikulpharma.com\n\nOur experts are ready to assist you!\n\nWould you like to:\n• Request a quotation\n• Schedule a demo\n• Discuss your requirements\n\nReply "YES" to connect with our team! 🏭`,
    type: 'text'
  }),

  /**
   * Contact Information
   */
  contactInfo: () => ({
    text: `📞 *Contact Nikul Pharma*\n\n*Office Address:*\nNikul Pharma Equipment\nAhmedabad, Gujarat, India\n\n*Contact Details:*\n📱 Phone: +91 6375591682\n📧 Email: sales@nikulpharma.com\n🌐 Website: www.nikulpharma.com\n\n*Business Hours:*\n⏰ Monday - Saturday: 9:00 AM - 6:00 PM\n🔒 Sunday: Closed\n\nWe look forward to serving you! 🏭`,
    type: 'text'
  }),

  /**
   * Out of Business Hours
   */
  outOfHours: (customerName) => ({
    text: `🌙 Hello ${customerName || 'there'}!\n\nThank you for contacting *Nikul Pharma*.\n\nWe have received your message, but our office is currently closed.\n\n*Business Hours:*\n⏰ Monday - Saturday: 9:00 AM - 6:00 PM\n\nOur team will respond when we reopen.\n\n🚨 For urgent matters:\n📞 Emergency: +91 6375591682\n📧 Email: sales@nikulpharma.com`,
    type: 'text'
  }),

  /**
   * Error & Fallback Messages
   */
  defaultResponse: () => ({
    text: `👋 Thank you for your message!\n\nI'm Nikul Pharma's automated assistant. 🤖\n\nFor better assistance, please:\n\n1️⃣ Visit our website: www.nikulpharma.com\n2️⃣ Fill inquiry form for detailed queries\n3️⃣ Call us directly: +91 6375591682\n\nOur team is here to help! 🏭`,
    type: 'text'
  }),

  invalidResponse: () => ({
    text: `❌ Sorry, I didn't understand that.\n\nPlease choose from the menu options or contact our team:\n\n📞 Phone: +91 6375591682\n📧 Email: sales@nikulpharma.com`,
    type: 'text'
  }),

  /**
   * Thank You & Closing
   */
  thankYou: (customerName) => ({
    text: `🙏 Thank you, ${customerName || 'valued customer'}!\n\nWe appreciate your interest in *Nikul Pharma*.\n\nFeel free to reach out anytime:\n📞 +91 6375591682\n📧 sales@nikulpharma.com\n\nHave a great day! 🏭✨`,
    type: 'text'
  }),

  /**
   * Utility Functions
   */
  formatInquiryDetails: (inquiry) => {
    const {
      first_name,
      last_name,
      email,
      phone,
      company,
      subject,
      message,
      product,
      inquiry_type
    } = inquiry;

    const name = [first_name, last_name].filter(Boolean).join(' ') || 'Customer';
    const companyInfo = company ? `\n🏢 Company: ${company}` : '';
    const productInfo = product ? `\n📦 Product: ${product}` : '';

    return {
      name,
      summary: `📋 *Inquiry Details*\n\n` +
        `👤 Name: ${name}` +
        companyInfo +
        `\n📧 Email: ${email}` +
        `\n📱 Phone: ${phone || 'Not provided'}` +
        productInfo +
        `\n📝 Type: ${inquiry_type || 'general'}\n\n` +
        `*Subject:* ${subject}\n\n` +
        `*Message:*\n${message}`
    };
  },

  /**
   * Machine Name Mappings
   */
  machineNames: {
    // Mixing Equipment
    machine_planetary_mixer: 'Planetary Mixer',
    machine_ribbon_blender: 'Ribbon Blender',
    machine_v_blender: 'V Blender',
    machine_double_cone: 'Double Cone Blender',
    
    // Granulation
    machine_rmg: 'Rapid Mixer Granulator (RMG)',
    machine_fbd: 'Fluid Bed Dryer (FBD)',
    machine_granulation_line: 'Complete Granulation Line',
    
    // Milling
    machine_multi_mill: 'Multi Mill',
    machine_hammer_mill: 'Hammer Mill',
    
    // Drying
    machine_fbd_dryer: 'Fluid Bed Dryer',
    machine_tray_dryer: 'Tray Dryer',
    machine_vacuum_dryer: 'Vacuum Dryer',
    machine_rcvd: 'Rotary Cone Vacuum Dryer (RCVD)',
    
    // Reactors
    machine_reactor: 'Chemical Reactor',
    machine_pressure_vessel: 'Pressure Vessel',
    
    // Centrifuges
    machine_centrifuge: 'Centrifuge',
    machine_basket_centrifuge: 'Basket Centrifuge',
    
    // Sifters
    machine_vibro_sifter: 'Vibro Sifter',
    machine_octagonal_sifter: 'Octagonal Sifter'
  },

  /**
   * Get machine name from ID
   */
  getMachineName: (machineId) => {
    return messageTemplates.machineNames[machineId] || 'Selected Machine';
  }
};

export default messageTemplates;
