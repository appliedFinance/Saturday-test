chai = require('chai');
const chaiHttp = require('chai-http');


const {app, runServer, closeServer} = require('../server');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Users', function() {
	before(function() {
		return runServer();
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
				expect(res.body).to.be.a('array');
				expect(res.body.length).to.be.above(0);
				res.body.forEach(function(item) {
					expect(item).to.be.a('object');
					expect(item).to.have.all.keys(
							'name', 'borough', 'cuisine');
				});
			});
	});
});
