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
  console.log('STARTING PIPELINE');
  // const phase1 = await product.aggregate([
  //   {
  //     $lookup: {
  //       from: 'features',
  //       localField: 'id',
  //       foreignField: 'product_id',
  //       as: 'features'
  //     }
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

  // const phase2 = await info.aggregate([
  //   {
  //     $project: {
  //       "id": 1,
  //       "name": 1,
  //       "slogan": 1,
  //       "description": 1,
  //       "category": 1,
  //       "default_price": 1,
  //       "features.feature": 1,
  //       "features.value": 1,
  //       "related.related_product_id": 1
  //     }
  //   },
  //   {
  //     $merge: {
  //       "into": {"db": "ProductOverviewImport", "coll": "info"},
  //       "on": "id",
  //       "whenMatched": "replace"
  //     }
  //   }
  // ])
  // .then(() => {
  //   console.log('DONE WITH PHASE TWO')
  // })
  // .catch((err) => {
  //   console.log('ERROR IN PHASE TWO\n', err)
  // });

  // const phase3 = await styles.aggregate([
  // {
  //   $lookup: {
  //     from: 'skus',
  //     localField: 'id',
  //     foreignField: 'styleId',
  //     as: 'skus'
  //   }
  // },
  // {
  //   $lookup: {
  //     from: 'photos',
  //     localField: 'id',
  //     foreignField: 'styleId',
  //     as: 'photos'
  //   }
  // },
  // {
  //   $out: {
  //     db: 'ProductOverviewImport',
  //     coll: 'extra'
  //   }
  // }
  // ])
  // .then(() => {
  //   console.log('DONE WITH PHASE THREE')
  // })
  // .catch((err) => {
  //   console.log('ERROR IN PHASE THREE\n', err)
  // });

  // const phase4 = await extra.aggregate([
  //   {
  //     $project: {
  //       "id": 1,
  //       "product_id": 1,
  //       "name": 1,
  //       "original_price": 1,
  //       "sale_price": 1,
  //       "default_style": 1,
  //       "skus.id": 1,
  //       "skus.size": 1,
  //       "skus.quantity": 1,
  //       "photos.url": 1,
  //       "photos.thumbnail_url": 1
  //     }
  //   },
  //   {
  //     $merge: {
  //       "into": {"db": "ProductOverviewImport", "coll": "extra"},
  //       "on": "id",
  //       "whenMatched": "replace"
  //     }
  //   }
  // ])
  // .then(() => {
  //   console.log('DONE WITH PHASE FOUR')
  // })
  // .catch((err) => {
  //   console.log('ERROR IN PHASE FOUR\n', err)
  // });
};

module.exports = test;