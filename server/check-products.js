import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/nikul_pharma')
  .then(async () => {
    const TrafficLog = mongoose.model('TrafficLog', new mongoose.Schema({}, { 
      strict: false, 
      collection: 'traffic_logs' 
    }));

    // Get product view logs
    const productViews = await TrafficLog.find({ isProductView: true }).lean().limit(5);
    
    console.log('=== Product View Logs ===');
    productViews.forEach((log, i) => {
      console.log(`\nLog ${i + 1}:`);
      console.log('Path:', log.path);
      console.log('Product Slug:', log.productSlug);
      console.log('Category:', log.category);
      console.log('Timestamp:', log.timestamp);
    });
    
    await mongoose.connection.close();
  })
  .catch(e => console.error(e));
