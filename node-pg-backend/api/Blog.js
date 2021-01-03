const 
  express = require('express'),
  router = express.Router(),
  queries = require('../db/Blog-db'),
  config = require('../utils/setting');

router.get('/', (req, res) => {
  queries.getAll().then(blogData => {
   //res.json(masterStock);   
   res.json(config.rest.createResponse(200, blogData, undefined, undefined));
  });
});

router.get('/:id', (req, res, next) => {
  const input = req.params.id.toUpperCase();
  queries.getOne(input).then(blogData => {
    if(blogData) {
      //res.json(masterStock);
      res.json(config.rest.createResponse(200, blogData, undefined, undefined));
    } else {
      //next();
      res.json(config.rest.createResponse(404, undefined, undefined, 'Url API is not found'));
    }
  });
});

// Add/Update/Delete
router.post("/", (request, response, next) => {
    queries.create(request.body).then(blogData => {
        // response.status(201).json({blogData: blogData[0]});
        response.json(config.rest.createResponse(200, blogData, undefined, undefined));
    }).catch(next);
});

router.delete("/:id", (request, response, next) => {
    queries.delete(request.params.id).then(() => {
        response.status(204).json({deleted: true});
    }).catch(next);
    // }).catch(err => {
    //   reject(err)
    // })
});

router.put("/:id", (request, response, next) => {
    queries.update(request.params.id, request.body).then(blogData => {
        response.json({blogData: blogData[0]});
    }).catch(next);
});


// router.post("/", (request, response, next) => {
//   queries
//     .create(request.body)
//     .then(coffee => {
//       response.status(201).json({ coffee: coffee[0] });
//     })
//     .catch(next);
// });

// router.delete("/:id", (request, response, next) => {
//   queries
//     .delete(request.params.id)
//     .then(() => {
//       response.status(204).json({ deleted: true });
//     })
//     .catch(next);
// });

// router.put("/:id", (request, response, next) => {
//   queries
//     .update(request.params.id, request.body)
//     .then(coffee => {
//       response.json({ coffee: coffee [0]});
//     })
//     .catch(next);
// });

module.exports = router;