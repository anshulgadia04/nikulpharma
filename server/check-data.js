import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/nikul_pharma')
  .then(async () => {
    const TrafficLog = mongoose.model('TrafficLog', new mongoose.Schema({}, { 
      strict: false, 
      collection: 'traffic_logs' 
    }));

    const total = await TrafficLog.countDocuments({});
    const withCategory = await TrafficLog.countDocuments({ category: { $ne: null, $exists: true } });
    const withCountry = await TrafficLog.countDocuments({ country: { $ne: null, $exists: true } });
    const isProductView = await TrafficLog.countDocuments({ isProductView: true });
    
    console.log('=== Traffic Log Stats ===');
    console.log('Total logs:', total);
    console.log('Logs with category:', withCategory);
    console.log('Logs with country:', withCountry);
    console.log('Product view logs:', isProductView);
    
    // Get sample log
    const sample = await TrafficLog.findOne({}).lean();
    console.log('\n=== Sample Log ===');
    console.log(JSON.stringify(sample, null, 2));
    
    // Check categories
    const categories = await TrafficLog.aggregate([
      { $match: { category: { $ne: null, $exists: true } } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    console.log('\n=== Categories Found ===');
    console.log(categories);
    
    await mongoose.connection.close();
  })
  .catch(e => console.error(e));
