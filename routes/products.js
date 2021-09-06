const router = require('express').Router();

const { getAll, getById, create, getByCategory, update, remove } = require('../models/product.model');


router.get('/v2', async (req, res) => {
  try {
    const result = await getAll();
    res.json(result);
  } catch (err) {
    res.json({ error: err.message });
  }
});

router.get('/cat/:category', (req, res) => {
  getByCategory(req.params.category)
    .then((result) => {


      res.json(result);
    })

    .catch((error) => res.json({ error: error.message }));
});


router.get('/new', (req, res) => {
    res.render('products/new');
});

router.get('/edit/:productId', (req, res) => {
    getById(req.params.productId)
        .then(product => {
            res.render('products/edit', { product });
        })
        .catch(error => console.log(error));
});

router.get('/remove/:productId', (req, res) => {
    remove(req.params.productId)
        .then(result => res.redirect('/products'))
        .catch(error => console.log(error));
});

router.get('/:productId', (req, res) => {
    getById(req.params.productId)
        .then(product => res.render('products/view', { product }))
        .catch(error => console.log(error));
});

router.post('/create', (req, res) => {
    create(req.body)
        .then(result => {
            req.flash('message', 'Se ha creado correctamente el nuevo producto');
            res.redirect('/products')
        })
        .catch(error => console.log(error));
});

router.post('/update', (req, res) => {

    update(req.body.productId, req.body)
        .then(result => res.redirect('/products'))
        .catch(error => console.log(error));
});

module.exports = router;


