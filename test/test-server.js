chai = require('chai');
const chaiHttp = require('chai-http');


const {app, runServer, closeServer} = require('../server');
const { PORT, TEST_DATABASE_URL } = require('../config');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Users', function() {
	before(function() {
		return runServer(TEST_DATABASE_URL);
	});

	after(function() {
		return closeServer();
	});
	it('should list users on GET', function() {
		return chai.request(app)
			.get('/restaurants')
			.then(function(res) {
				expect(res).to.have.status(200);
				expect(res).to.be.json;

				const restaurants = res.body.restaurants;
				expect(restaurants).to.be.a('array');
//				expect(restaurants.length).to.be.above(0);
				restaurants.forEach(function(item) {
					expect(item).to.be.a('object');
					expect(item).to.have.all.keys(
							'name', 'borough', 'cuisine');
				});
			});
	});
});

