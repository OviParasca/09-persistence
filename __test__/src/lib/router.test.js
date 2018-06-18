'use strict';

let router = require('../../../src/lib/router.js');

describe('Router', () => {

  it('registers routes of multiple types', () => {
    router.get('/', () => true);
    router.put('/', () => true);
    router.post('/', () => true);
    router.patch('/', () => true);
    router.delete('/', () => true);
    expect( router.routes.GET['/']).toBeDefined();
    expect( router.routes.PUT['/']).toBeDefined();
    expect( router.routes.POST['/']).toBeDefined();
    expect( router.routes.PATCH['/']).toBeDefined();
    expect( router.routes.DELETE['/']).toBeDefined();
  });

  it('can create multiple routes of the same type', () => {
    router.routes.GET = {};
    router.get('/a', () => true);
    router.get('/b', () => true);
    router.get('/c', () => true);
    expect( Object.keys(router.routes.GET).length ).toEqual(3);
  });

  it('can route get requests', () => {
    let expected = 'get/notes';
    router.get('/notes', () => expected);
    
    let req = { method: 'GET', url: 'http://localhost/notes?id=61684005-d101-4b78-9759-a996ed47c5ad'};
    let res = {};
    return router.route(req,res)
      .then( result => expect(result).toEqual(expected));
  });

  // it('can get a 400 response for GetOne()', (done) => {
  //   let expected = 'get/api/v1/notes';
  //   router.get('api/v1/notes', () => expected);
  //   let req = { method: 'GET', url: 'http://localhost/api/v1/notes?id='};
  //   let res = {};
  //   return router.route(req, res)
  //     .then(res => {
  //       expect(res.status).toEqual(400);
  //     });
  // });

});