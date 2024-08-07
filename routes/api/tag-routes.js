const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
// making functions async/await for ease of use

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const data = await Tag.findAll(
      {
        include: [{ model: Product, through: ProductTag }]
      }
    )

    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const data = await Tag.findByPk(
      req.params.id,
      {
        include: [{ model: Product, through: ProductTag }]
      }
    )

    res.status(200).json(data)

  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  /*req.body should look like this:
  {
    "tag_name": "(value)"
  }
*/
  try {
    const data = await Tag.create(req.body)
    res.status(200).json(data)

  } catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const data = await Tag.update(req.body,
      {
        where: { id: req.params.id }
      }
    )

    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const data = await Tag.destroy(
      {
        where: { id: req.params.id }
      }
    )

    res.status(200).json(data)

  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
