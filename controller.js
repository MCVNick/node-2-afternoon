module.exports = {
    create: (req, res, next) => {
        const { name, description, price, image_url } = req.body
        req.app.get('db').create_product([name, description, price, image_url])
            .then(() => {
                res.sendStatus(200)
            })
            .catch((err) => {
                res.status(500).send({errorMessage:'Oops something went wrong creating product'})
            })
    },
    getOne: (req, res, next) => {
        const { id } = req.params
        req.app.get('db').read_product([id])
            .then((product) => {
                res.status(200).send(product)
            })
            .catch((err) => {
                res.status(500).send({errorMessage:'Oops something went wrong getting product'})
            })
    },
    getAll: (req, res, next) => {
        req.app.get('db').read_products()
            .then((products) => {
                res.status(200).send(products)
            })
            .catch((err) => {
                res.status(500).send({errorMessage:'Oops something went wrong getting all products'})
            })
    },
    update: (req, res, next) => {
        const { id } = req.params
        const { desc } = req.query
        req.app.get('db').update_product([id, desc])
            .then(() => {
                res.sendStatus(200)
            })
            .catch((err) => {
                res.status(500).send({errorMessage:'Something went wrong updating product'})
            })
    },
    delete: (req, res, next) => {
        const { id } = req.params
        req.app.get('db').delete_product([id])
            .then(() => {
                res.sendStatus(200)
            })
            .catch((err) => {
                res.status(500).send({errorMessage:'Something went wrong deleting product'})
            })
    }
}