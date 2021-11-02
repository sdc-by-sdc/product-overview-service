require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./productAgg');
const Style = require('./styleAgg');

const DATABASE_URL = process.env.DATABASE_URL;

// connect to database with a little error handling
mongoose.connect(`mongodb://${DATABASE_URL}`);
const db = mongoose.connection;
db.on('error', function(error) {
  console.log('ERROR connecting to database', error);
});
db.once('open', function() {
  console.log('SUCCESS database has been connected to');
});

/*

Join multiple collections
{
   $lookup:
     {
       from: <collection to join>,
       localField: <field from the input documents>,
       foreignField: <field from the documents of the "from" collection>,
       as: <output array field>
     }
}

*/
const { productSchema, stylesSchema, featuresSchema, skusSchema, photosSchema, relatedSchema } = require('./collections.js');
const product = mongoose.model('product', productSchema);
const styles = mongoose.model('styles', stylesSchema);
const features = mongoose.model('features', featuresSchema);
const skus = mongoose.model('skus', skusSchema);
const photos = mongoose.model('photos', photosSchema);
const related = mongoose.model('related', relatedSchema);

const { infoSchema, extraSchema } = require('./goals.js');
const extra = mongoose.model('extra', extraSchema);
const info = mongoose.model('info', infoSchema);

const test = async () => {
  // let phase1 = await product.aggregate([
  //   {
  //     $lookup: {
  //       from: 'features',
  //       localField: 'id',
  //       foreignField: 'product_id',
  //       as: 'features'
  //     }
  //   },
  //   {
  //     $unset: ['features.id']
  //   },
  //   {
  //     $lookup: {
  //       from: 'related',
  //       localField: 'id',
  //       foreignField: 'current_product_id',
  //       as: 'related'
  //     }
  //   },
  //   {
  //     $unset: ['related.id']
  //   },
  //   {
  //     $out: {
  //       db: 'ProductOverviewImport',
  //       coll: 'info'
  //     }
  //   }
  // ])
  // .then(() => {
  //   console.log('DONE WITH PHASE ONE')
  // })
  // .catch((err) => {
  //   console.log('ERROR IN PHASE ONE\n', err)
  // });

  const phase2 = await info.aggregate([
    {
      $unset: ['related["current_product_id"]']
    },
  ], {allowDiskUse: true})
  .then(() => {
    console.log('DONE WITH PHASE TWO')
  })
  .catch((err) => {
    console.log('ERROR IN PHASE TWO\n', err)
  });
};

module.exports = test;